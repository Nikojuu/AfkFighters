import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  try {
    const query = sql`
    SELECT * FROM fighters
  `;

    const res = await query;

    const fighters = res.rows;

    return NextResponse.json(fighters, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
