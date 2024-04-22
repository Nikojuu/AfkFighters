"use client";
import Image from "next/image";
import CombatCard from "./combat-card";
import { Button } from "./ui/button";
import { useState } from "react";
import { fetchRandomFighters, fightLogic } from "@/services/services";
import { Vortex } from "./ui/vortex";
import StartScreen from "./ui/start-screen";
import { ActiveFightState } from "./active-fight-state";

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
  const [winner, setWinner] = useState("");
  const [fightActive, setFightActive] = useState(false);

  async function handleClick() {
    setWinner("");
    setFightActive(true);
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

      // fighting logic PUT request to the server and set the winner to state
      const result = await fightLogic(fighter1, fighter2, elemental);
      // client side delay to simulate fight
      setTimeout(() => {
        setWinner(result);
        setFightActive(false);
      }, 4000);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className=" overflow-hidden top-12 -z-1  h-full absolute w-full ">
        <Vortex className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full z-0"></Vortex>
      </div>

      <div className="relative  flex items-center justify-center gap-[30rem]  mt-60 mb-24 ">
        {player1 && player2 ? (
          <>
            <CombatCard fighterData={player1} />
            <CombatCard fighterData={player2} />
          </>
        ) : (
          <StartScreen />
        )}

        <div className=" h-[40rem] w-[40rem] absolute z-10 ">
          {elemental && (
            <>
              <h3 className="w-full bg-black border border-pink-600 text-white absolute z-50 text-center rounded-t-2xl py-4">
                The mighty {elemental} Elemental has chosen to interference with
                the fight
              </h3>

              <Image
                src={`/${elemental}.jpg`}
                alt=""
                fill
                className="object-cover rounded-2xl box-shadow"
              />
              {winner && (
                <h2 className="rounded-b-2xl py-4 bg-black text-white absolute border border-pink-600 w-full text-center bottom-0">
                  Winner is {winner}
                </h2>
              )}
              <ActiveFightState
                player1Name={player1?.name}
                player2Name={player2?.name}
                activeFight={fightActive}
              />
            </>
          )}
          <div className="w-full flex justify-center relative"></div>
        </div>
      </div>

      <div className=" container flex justify-center mx-auto ">
        {!fightActive && (
          <Button className="z-[1000]" onClick={handleClick}>
            Generate Fight
          </Button>
        )}
      </div>
    </>
  );
};

export default FightBoard;
