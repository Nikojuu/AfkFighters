"use client";
import Image from "next/image";
import CombatCard from "./combat-card";
import { Button } from "./ui/button";
import { useState } from "react";
import { fetchRandomFighters } from "@/services/service";

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

interface FightersData {
  fighter1: Fighter;
  fighter2: Fighter;
}

const FightBoard = () => {
  const [elemental, setElemental] = useState("");
  const [fightersData, setFightersData] = useState<FightersData | null>(null);
  async function handleClick() {
    try {
      const elementalStateOptions = ["fire", "ice", "nature", "lightning"];
      const elementalState =
        elementalStateOptions[
          Math.floor(Math.random() * elementalStateOptions.length)
        ];
      setElemental(elementalState);
      const randomFighters = await fetchRandomFighters();
      setFightersData(randomFighters);
      // Make fighting logic here
    } catch (error) {
      console.log(error);
    }
  }

  const { fighter1, fighter2 } = fightersData || {};

  return (
    <>
      <div className="relative  flex items-center justify-around container mx-auto mt-60 mb-24 bg-indigo-950 py-10 rounded-2xl combat-container z-0">
        {fighter1 && fighter2 ? (
          <>
            <CombatCard fighterData={fighter1} />
            <CombatCard fighterData={fighter2} />
          </>
        ) : (
          // Fallback make a component later
          <div className="w-96 h-96 bg-white rounded-2xl"></div>
        )}

        <div className=" h-[40rem] w-[40rem] absolute -z-10">
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
        <Button onClick={handleClick}>Generate Fight</Button>
      </div>
    </>
  );
};

export default FightBoard;
