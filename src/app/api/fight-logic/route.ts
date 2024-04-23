import { NextRequest, NextResponse } from "next/server";
import statistics from "@/database/statistics.json";
import fighers from "@/database/fighters.json";

import type { Fighter, elemental } from "@/components/fight-board";
import { writeFileSync } from "fs";

export const PUT = async (req: NextRequest, res: NextResponse) => {
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

const updateStats = (fighter1: Fighter, fighter2: Fighter, winner: string) => {
  const statsFilePath = "./src/database/statistics.json";
  try {
    // Update the statistics
    statistics["total-fights"] += 1;
    statistics["recent-fights"].unshift({
      fighter1: fighter1.name,
      fighter2: fighter2.name,
      winner,
    });

    writeFileSync(statsFilePath, JSON.stringify(statistics, null, 2));

    return statistics;
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred while updating statistics.");
  }
};
