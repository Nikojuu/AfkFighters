import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result = await sql`
      CREATE TABLE IF NOT EXISTS Fighters (
        Name VARCHAR(255),
        Slug VARCHAR(255), 
        Description TEXT,
        Attack INT,
        Hitpoints INT,
        Weakness VARCHAR(255),
        ImgSrc VARCHAR(255),
        WinStreak INT,
        TotalWins INT,
        Defence INT
      );
    `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
