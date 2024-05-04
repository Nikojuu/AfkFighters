"use server";
import { Fighter, elemental } from "@/lib/types";

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
    return result;
  } catch (error) {
    console.log(error);
  }
};
