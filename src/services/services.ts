"use server";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
import { sql } from "@vercel/postgres";
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
      method: "POST",
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

export const getAllFighters = async (): Promise<Fighter[]> => {
  "use server";
  try {
    const response = await fetch(`${BASE_URL}/api/all-fighters`);

    if (!response.ok) {
      throw new Error("Failed to fetch all fighters");
    }

    const data: Fighter[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getAllFighters:", error);
    throw error;
  }
};

export const getFighter = async ({
  slug,
}: {
  slug: string;
}): Promise<Fighter> => {
  "use server";
  try {
    const response = await fetch(`${BASE_URL}/api/single-fighter/${slug}`);

    if (!response.ok) {
      throw new Error("Failed to fetch fighter");
    }

    const data: Fighter = await response.json();

    return data;
  } catch (error) {
    console.error("Error in getFighter:", error);
    throw error;
  }
};

export const getDashboardData = async () => {
  const recentFights = await sql`
  SELECT fighter, COUNT(*) as fight_count
  FROM (
      SELECT fighter1 as fighter FROM recentfights
      UNION ALL
      SELECT fighter2 as fighter FROM recentfights
  ) AS all_fighters
  GROUP BY fighter
  ORDER BY fight_count DESC
  LIMIT 5;
  `;

  const allFights = await sql`
  SELECT * FROM recentfights

  `;
  // add another querys to this promise
  const data = await Promise.all([recentFights.rows, allFights.rows]);
  return {
    recentFights: data[0], // Access the first element for recentFights
    allFights: data[1], // Access the second element for allFights
  };
};
