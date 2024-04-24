"use server";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
import { Fighter, elemental } from "../components/fight-board";
import * as fs from "node:fs/promises";

export const fetchRandomFighters = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/fighters`, {
      cache: "no-store",
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fightLogic = async (
  fighter1: Fighter,
  fighter2: Fighter,
  elemental: elemental
) => {
  try {
    const response = await fetch(`${BASE_URL}/api/fight-logic`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fighter1, fighter2, elemental }),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllFighters = async () => {
  "use server";
  try {
    const response = await fetch(`${BASE_URL}/api/all-fighters`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

// move to database service if time
// export const getAllFighters = async () => {
//   const fightersFilePath = process.cwd() + "/src/database/fighters.json";
//   const fightersFile = await fs.readFile(fightersFilePath, "utf8");
//   const data = JSON.parse(fightersFile);
//   return data.fighters;
// };

export const getFighter = async (slug: string) => {
  const fightersFilePath = process.cwd() + "/src/database/fighters.json";
  const fightersFile = await fs.readFile(fightersFilePath, "utf8");

  const data = JSON.parse(fightersFile);
  const fighter = data.fighters.find(
    (fighter: Fighter) => fighter.slug === slug
  );

  return fighter;
};
