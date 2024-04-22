import fighters from "@/database/fighters.json";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // using request is only to make route dynamic instead of cashing the fighters mayby there is a better way to do this
  const { searchParams } = new URL(request.url);

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
