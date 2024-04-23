const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
import { Fighter, elemental } from "../components/fight-board";

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
  try {
    const response = await fetch(`${BASE_URL}/api/all-fighters`, {
      cache: "no-store",
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
