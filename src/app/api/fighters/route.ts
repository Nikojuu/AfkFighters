import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  console.log("searchParams", searchParams);
  try {
    // Execute SQL query to select two random fighters from the database
    const query = sql`
      SELECT * FROM fighters
      OFFSET floor(random() * (SELECT COUNT(*) FROM fighters))
      LIMIT 2;
    `;

    const res = await query;
    await sql`UPDATE statistics SET total_fights = total_fights + 1`;

    const randomFighter1 = res.rows[0];
    const randomFighter2 = res.rows[1];
    console.log("randomFighter1", randomFighter1);
    console.log("randomFighter2", randomFighter2);
    return NextResponse.json({
      fighter1: randomFighter1,
      fighter2: randomFighter2,
    });
  } catch (error) {
    console.error("Error fetching random fighters:", error);
    return NextResponse.error();
  }
}
