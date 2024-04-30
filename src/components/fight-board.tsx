"use client";
import Image from "next/image";
import CombatCard from "./combat-card";
import { useState } from "react";
import { fetchRandomFighters, fightLogic } from "@/services/services";
import { Vortex } from "./ui/vortex";
import StartScreen from "./ui/start-screen";
import Lottie from "lottie-react";
import fightAnimation from "../../public/animation/fight-animation.json";
import { Fighter, elemental } from "@/lib/types";
import ShinyButton from "./ui/shiny-button";
export const dynamic = "force-dynamic";

const FightBoard = () => {
  const [elemental, setElemental] = useState<elemental>("" as elemental);
  const [player1, setPlayer1] = useState<Fighter | null>(null);
  const [player2, setPlayer2] = useState<Fighter | null>(null);
  const [winner, setWinner] = useState("");
  const [fightActive, setFightActive] = useState(false);

  async function handleClick() {
    setWinner("");
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
      setFightActive(true);

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
        <Vortex className="flex items-center flex-col justify-center  py-4 w-full h-full z-0"></Vortex>
      </div>

      <main className="relative flex-col md:flex-row flex items-center justify-center  h-[80vh] md:h-[70vh]  md:mt-20 mt-10 container mx-auto ">
        {/* // cannot conditionally render CombatCard and StartScreen with ? operator it will cause bug for some reason thats why
        rendered seperately */}
        {player1 && player2 && (
          <>
            <CombatCard fighterData={player1} />
            <div
              className="z-50 flex flex-col justify-between place-items-center h-1/2 
              sm:h-full mx-5 lg:mx-12 lg:min-w-[25rem]"
            >
              {elemental && (
                <>
                  <h3 className="  border-y rounded-t-md mx-1 -mt-8 bg-black border-pink-600 text-white  text-center  w-full  text-xs sm:text-base">
                    The mighty {elemental} Elemental has chosen to interference
                    with the fight
                  </h3>
                  <div className="relative z-50 h-full w-full">
                    <Image
                      src={`/${elemental}.jpg`}
                      alt=""
                      fill
                      className="object-cover "
                    />
                  </div>
                </>
              )}

              {winner && (
                <h2 className="text-base sm:text-lg -mb-8 min-h-8 bg-black text-white border-y border-pink-600 rounded-b-md w-full  z-50 text-center">
                  Winner is {winner}
                </h2>
              )}
            </div>
            <CombatCard fighterData={player2} />
          </>
        )}
        {!player1 && !player2 && <StartScreen />}

        {fightActive && (
          <div className="w-[40%] absolute z-50 md:top-0">
            <Lottie animationData={fightAnimation} />
          </div>
        )}
      </main>

      <div className=" container flex justify-center mx-auto mt-12 ">
        {!fightActive && <ShinyButton onClick={handleClick}></ShinyButton>}
      </div>
    </>
  );
};

export default FightBoard;
