"use server";
import { Fighter, FighterSchema, elemental } from "@/lib/types";
import { sql } from "@vercel/postgres";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fightLogic = async ({ fighter1, fighter2, elemental }: any) => {
  try {
    // Function to calculate damage based on attacker's attack and defender's defense
    const calculateDamage = (attacker: Fighter, defender: Fighter) => {
      const minimumDamage = 10; // Minimum damage threshold
      const defenseMultiplier = 0.5; // Adjust this multiplier as needed

      let damage = Math.max(
        attacker.attack - defender.defence * defenseMultiplier,
        0
      );
      // Ensure that damage is at least the minimum damage threshold
      damage = Math.max(damage, minimumDamage);

      return damage;
    };

    // Function to check if a fighter is weak against the current environmental variable
    const isWeakAgainstEnvironment = (
      fighter: Fighter,
      environment: elemental
    ) => {
      return fighter.weakness === environment;
    };

    // Function to simulate a fight between two fighters
    const initiateFight = async (
      fighter1: Fighter,
      fighter2: Fighter,
      environment: elemental
    ) => {
      let attacker = fighter1;
      let opponent = fighter2;

      while (attacker.hitpoints > 0 && opponent.hitpoints > 0) {
        // Check if the current fighter is weak against the environment
        if (isWeakAgainstEnvironment(attacker, environment)) {
          // Apply penalty to attack
          if (attacker.weakness === opponent.weakness) {
            attacker.attack = attacker.attack;
          } else {
            attacker.attack -= 80;
            attacker.defence -= 40;
            attacker.hitpoints -= 60;
          }
        }

        // Calculate damage
        const damage = calculateDamage(attacker, opponent);

        // Apply damage to opponent
        opponent.hitpoints -= damage;

        // Switch fighters for the next round
        const temp = attacker;
        attacker = opponent;
        opponent = temp;
      }

      // Determine name of the winner
      if (fighter1.hitpoints <= 0) {
        return `${fighter2.name}`;
      } else {
        return `${fighter1.name}`;
      }
    };

    // return the result of the fight
    const result = await initiateFight(fighter1, fighter2, elemental);
    //update the statistics in database

    updateStats(fighter1, fighter2, result);

    return result;
  } catch (error) {
    console.log(error);
  }
};

const updateStats = async (
  fighter1: Fighter,
  fighter2: Fighter,
  winner: string
) => {
  try {
    await fetch(`${BASE_URL}/api/delete-old-records`, {
      method: "DELETE",
    });

    // Insert the fight data into the database
    await sql`INSERT INTO recentfights (fighter1, fighter2, winner, fight_date)
              VALUES (${fighter1.name}, ${fighter2.name}, ${winner}, CURRENT_TIMESTAMP)`;

    // Increment the total fights count in the database
    await sql`UPDATE statistics SET total_fights = total_fights + 1`;

    if (winner === fighter1.name) {
      await sql`UPDATE fighters SET winStreak = winStreak + 1, totalWins = totalWins + 1 WHERE name = ${fighter1.name}`;
      // Reset loser's win streak
      await sql`UPDATE fighters SET winStreak = 0 WHERE name = ${fighter2.name}`;
    } else {
      await sql`UPDATE fighters SET winStreak = winStreak + 1, totalWins = totalWins + 1 WHERE name = ${fighter2.name}`;
      // Reset loser's win streak
      await sql`UPDATE fighters SET winStreak = 0 WHERE name = ${fighter1.name}`;
    }

    return { success: true };
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred while updating statistics.");
  }
};

export const createFighter = async (newFighter: unknown) => {
  // Validate the new fighter data again on server side to prevent any client side manipulation
  const result = FighterSchema.safeParse(newFighter);
  if (!result.success) {
    let errorMessage = "";

    result.error.errors.forEach((issue) => {
      errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ". ";
    });

    return {
      error: errorMessage,
    };
  }
  const {
    name,
    picture,
    weakness,
    attack,
    defence,
    hitpoints,
    description,
    lore,
  } = result.data;

  if (attack + defence + hitpoints > 500) {
    return {
      error: "Total stat points cannot exceed 500",
    };
  }

  const slug = name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove non-word characters except spaces and hyphens
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with single hyphe

  await sql`
  INSERT INTO Fighters (Name, Slug, Description, Attack, Hitpoints, Weakness, ImgSrc, WinStreak, TotalWins, Defence, lore)
  VALUES (
    ${name},
    ${slug},
    ${description},
    ${attack},
    ${hitpoints},
    ${weakness},
    ${picture},
    0, -- Default value for WinStreak
    0, -- Default value for TotalWins
    ${defence},
    ${lore}
  )
`;
};

export const getAllFighters = async () => {
  try {
    const query = sql`
    SELECT * FROM fighters
  `;

    const res = await query;

    const fighters = res.rows;

    return fighters;
  } catch (error) {
    console.log(error);
  }
};
