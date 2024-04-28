import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

import type { Fighter, elemental } from "@/components/fight-board";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { fighter1, fighter2, elemental } = await req.json();

    // Function to calculate damage based on attacker's attack and defender's defense
    const calculateDamage = (attacker: Fighter, defender: Fighter) => {
      let damage = Math.max(attacker.attack - defender.defence, 0);

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
    const initiateFight = (
      fighter1: Fighter,
      fighter2: Fighter,
      environment: elemental
    ) => {
      let attacker = fighter1;
      let opponent = fighter2;

      while (fighter1.hitpoints > 0 && fighter2.hitpoints > 0) {
        // Check if the current fighter is weak against the environment
        if (isWeakAgainstEnvironment(attacker, environment)) {
          // Apply penalty to attack
          if (attacker.weakness === opponent.weakness) {
            attacker.attack = attacker.attack;
          } else attacker.attack -= 20;
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
        return `${fighter2.name} `;
      } else {
        return `${fighter1.name}`;
      }
    };

    // return the result of the fight
    const result = initiateFight(fighter1, fighter2, elemental);
    //update the statistics in database
    updateStats(fighter1, fighter2, result);

    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
  }
};

const updateStats = async (
  fighter1: Fighter,
  fighter2: Fighter,
  winner: string
) => {
  const fightDate = new Date().toISOString();

  try {
    await fetch(`${BASE_URL}/api/delete-old-records`, {
      method: "DELETE",
    });

    // Insert the fight data into the database
    await sql`INSERT INTO recentfights (fighter1, fighter2, winner, fight_date) VALUES (${fighter1.name}, ${fighter2.name}, ${winner}, ${fightDate})`;

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
