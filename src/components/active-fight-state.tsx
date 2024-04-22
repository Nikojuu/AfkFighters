"use client";
import { MultiStepLoader } from "./ui/multistep-loader";

export function ActiveFightState({
  player1Name,
  player2Name,
  activeFight,
}: {
  player1Name: string | undefined;
  player2Name: string | undefined;
  activeFight: boolean;
}) {
  const name1 =
    player1Name && typeof player1Name === "string"
      ? player1Name[0].toUpperCase() + player1Name.slice(1).toLowerCase()
      : "";
  const name2 =
    player2Name && typeof player2Name === "string"
      ? player2Name[0].toUpperCase() + player2Name.slice(1).toLowerCase()
      : "";

  const loadingStates = [
    {
      text: `Duel to death between ${name1} and ${name2} started!`,
    },
    {
      text: `The mighty ${name1} throws insult at ${name2}!`,
    },
    {
      text: `${name2} is not impressed!`,
    },
    {
      text: `${name1} lands a fierce blow on ${name2}!`,
    },
    {
      text: `${name2} retaliates with a swift strike against ${name1}!`,
    },
    {
      text: "There are no rules in this fight",
    },
    {
      text: "The fight goes on until one fighter can't continue!",
    },
    {
      text: "And the winner is...",
    },
  ];
  return (
    <MultiStepLoader
      loadingStates={loadingStates}
      loading={activeFight}
      duration={500}
    />
  );
}
