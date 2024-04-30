const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
import { sql } from "@vercel/postgres";
import { Fighter, elemental } from "@/lib/types";
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
  fightHistory: Fighter[];
  totalAmountOfFights: number;
  biggestWinStreak: Fighter;
  mostWins: Fighter;
}> => {
  const trendingFighters = await sql`
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

  const fightHistory = await sql`
  SELECT * FROM recentfights
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
    fightHistory: data[1] as Fighter[], // Access the second element for allFights
    totalAmountOfFights: data[2], // Access the third element for totalFights
    biggestWinStreak: data[3] as Fighter, // Access the fourth element for biggestWinStreak
    mostWins: data[4] as Fighter, // Access the fifth element for mostWins
  };
};
