"use server";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
import { sql } from "@vercel/postgres";
import { Fighter, RecentFight, elemental } from "@/lib/types";
import { revalidatePath } from "next/cache";

export const fetchRandomFighters = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/fighters`, {
      method: "POST",
      cache: "no-store",
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
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

export const getDashboardData = async (): Promise<{
  trendingFighters: Fighter[];
  fightHistory: RecentFight[];
  totalAmountOfFights: number;
  biggestWinStreak: Fighter;
  mostWins: Fighter;
}> => {
  const trendingFighters = await sql`
  SELECT fighters.*, COALESCE(fight_count, 0) AS fight_count
  FROM fighters
  LEFT JOIN (
      SELECT fighter, COUNT(*) as fight_count
      FROM (
          SELECT fighter1 as fighter FROM recentfights
          UNION ALL
          SELECT fighter2 as fighter FROM recentfights
      ) AS all_fighters
      GROUP BY fighter
  ) AS trendingFighters ON fighters.name = trendingFighters.fighter
  ORDER BY COALESCE(fight_count, 0) DESC
  LIMIT 10;
  


  
  `;

  const fightHistory = await sql`
  SELECT * FROM recentfights
  ORDER BY id DESC
  LIMIT 10;
  `;

  const totalAmountOfFights = await sql`
  SELECT total_fights FROM statistics;
  `;

  const biggestWinStreak = await sql`
  SELECT *
FROM fighters
ORDER BY winStreak DESC
LIMIT 1;
  `;
  const mostWins = await sql`
  SELECT *
FROM fighters
ORDER BY totalwins DESC
LIMIT 1;
  `;
  revalidatePath("/dashboard");
  // add another querys to this promise
  const data = await Promise.all([
    trendingFighters.rows,
    fightHistory.rows,
    totalAmountOfFights.rows[0].total_fights,
    biggestWinStreak.rows[0],
    mostWins.rows[0],
  ]);
  return {
    trendingFighters: data[0] as Fighter[], // Access the first element for recentFights
    fightHistory: data[1] as RecentFight[], // Access the second element for allFights
    totalAmountOfFights: data[2], // Access the third element for totalFights
    biggestWinStreak: data[3] as Fighter, // Access the fourth element for biggestWinStreak
    mostWins: data[4] as Fighter, // Access the fifth element for mostWins
  };
};

export const uploadImage = async (formData: FormData) => {
  try {
    const res = await fetch(`${BASE_URL}/api/image-reshape`, {
      method: "POST",

      body: formData,
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllFighters = async () => {
  try {
    const query = sql`
    SELECT * FROM fighters
  `;

    const res = await query;

    const fighters = res.rows;

    return fighters;
  } catch (error) {
    console.log(error);
  }
};
