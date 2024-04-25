import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET({ params }: { params: { slug: string } }) {
  try {
    const slug = params.slug;

    const query = sql`
      SELECT * FROM fighters
      WHERE slug = ${slug}
    `;

    const res = await query;

    // Check if the fighter  exists
    if (res.rows.length === 0) {
      return NextResponse.error();
    }

    // Extract the fighter from the query result
    const fighter = res.rows[0];

    return NextResponse.json(fighter, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.error();
  }
}
