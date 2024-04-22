"use client";
import Image from "next/image";
import CombatCard from "./combat-card";
import { Button } from "./ui/button";
import { useState } from "react";
import { fetchRandomFighters, fightLogic } from "@/services/services";
import { Vortex } from "./ui/vortex";

export interface Fighter {
  name: string;
  description: string;
  attack: number;
  hitpoints: number;
  weakness: string;
  imgSrc: string;
  winStreak: number;
  totalWins: number;
  defence: number;
}
export type elemental = "fire" | "ice" | "nature" | "lightning";

const FightBoard = () => {
  const [elemental, setElemental] = useState<elemental>("" as elemental);
  const [player1, setPlayer1] = useState<Fighter | null>(null);
  const [player2, setPlayer2] = useState<Fighter | null>(null);

  async function handleClick() {
    try {
      // Randomly select an elemental state
      const elementalStateOptions = ["fire", "ice", "nature", "lightning"];
      const elementalState =
        elementalStateOptions[
          Math.floor(Math.random() * elementalStateOptions.length)
        ];

      setElemental(elementalState as elemental);
      // Fetch 2 random fighters and set them to state
      const { fighter1, fighter2 }: { fighter1: Fighter; fighter2: Fighter } =
        await fetchRandomFighters();

      setPlayer1(fighter1);
      setPlayer2(fighter2);

      // Make fighting logic here
      const result = await fightLogic(fighter1, fighter2, elemental);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="relative  flex items-center justify-center gap-[30rem] container mx-auto mt-60 mb-24  py-10  z-0 ">
        <div className=" overflow-hidden rounded-2xl  h-full absolute w-full ">
          <Vortex className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full z-0"></Vortex>
        </div>
        {player1 && player2 ? (
          <>
            <CombatCard fighterData={player1} />
            <CombatCard fighterData={player2} />
          </>
        ) : (
          // Fallback make a component later
          <div className="w-96 h-96 bg-white rounded-2xl"></div>
        )}

        <div className=" h-[40rem] w-[40rem] absolute z-10">
          {elemental && (
            <>
              <h3 className="w-full bg-orange-500 absolute z-50 text-center rounded-t-2xl py-4">
                The mighty {elemental} Elemental has chosen to interference with
                the fight
              </h3>

              <Image
                src={`/${elemental}.jpg`}
                alt=""
                fill
                className="object-cover rounded-2xl"
              />
            </>
          )}
        </div>
      </div>
      <div className=" container flex justify-center mx-auto">
        <Button className="z-[1000]" onClick={handleClick}>
          Generate Fight
        </Button>
      </div>
    </>
  );
};

export default FightBoard;
