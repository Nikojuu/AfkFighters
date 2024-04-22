import fighters from "@/database/fighters.json";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  console.log(searchParams);
  try {
    const randomFighter1 =
      fighters.fighters[Math.floor(Math.random() * fighters.fighters.length)];
    let randomFighter2;
    do {
      randomFighter2 =
        fighters.fighters[Math.floor(Math.random() * fighters.fighters.length)];
    } while (randomFighter2 === randomFighter1);

    return NextResponse.json({
      fighter1: randomFighter1,
      fighter2: randomFighter2,
    });
  } catch (error) {
    console.log(error);
  }
}
