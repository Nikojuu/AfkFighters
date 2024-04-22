import { NextRequest, NextResponse } from "next/server";

import { Fighter, elemental } from "@/components/fight-board";

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

      // Determine the winner
      if (fighter1.hitpoints <= 0) {
        return `${fighter2.name} wins!`;
      } else {
        return `${fighter1.name} wins!`;
      }
    };

    // return the result of the fight
    const result = initiateFight(fighter1, fighter2, elemental);

    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
  }
};
