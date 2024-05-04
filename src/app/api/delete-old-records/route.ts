import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const DELETE = async () => {
  // Check the count of records in recentfights table
  const result = await sql`SELECT COUNT(*) FROM recentfights`;
  const rowCount = parseInt(result.rows[0].count);

  // If the count exceeds 100, delete the oldest record
  if (rowCount >= 99) {
    await sql`
      DELETE FROM recentfights 
      WHERE id IN (
        SELECT id FROM recentfights 
        ORDER BY fight_date DESC
        LIMIT 100
      )
    `;
  }

  return NextResponse.json({ status: 200 });
};
