import { sql } from "@vercel/postgres";
import * as fs from "node:fs/promises";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await insertData();

  return NextResponse.json("worked", { status: 200 });
}
// JSON data

// Function to insert data into PostgreSQL database
async function insertData() {
  const jsonData = await fs.readFile("src/database/fighters.json", "utf8");

  const allFighters = await JSON.parse(jsonData);

  try {
    for (const fighter of allFighters.fighters) {
      // Construct SQL query to insert each fighter into the database
      await sql`
        INSERT INTO Fighters (Name, Slug, Description, Attack, Hitpoints, Weakness, ImgSrc, WinStreak, TotalWins, Defence)
        VALUES (${fighter.name}, ${fighter.slug}, ${fighter.description}, ${fighter.attack}, ${fighter.hitpoints}, ${fighter.weakness}, ${fighter.imgSrc}, ${fighter.winStreak}, ${fighter.totalWins}, ${fighter.defence});
      `;
    }
    console.log("Data inserted successfully.");
  } catch (error: any) {
    console.error("Error inserting data:", error.message);
  }
}
