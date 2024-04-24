import { Fighter } from "@/components/fight-board";
import FighterCard from "@/components/fighter-info-card";
import * as fs from "node:fs/promises";
export interface FightersArray {
  fighters: Fighter[];
}

const FighersPage = async () => {
  // this wasnt possible to fetch data using CRUD methods from local database from page component

  const getAllFighters = async () => {
    try {
      const fightersFilePath = process.cwd() + "/src/database/fighters.json";
      const fightersFile = await fs.readFile(fightersFilePath, "utf8");
      const data = JSON.parse(fightersFile);
      return data.fighters;
    } catch (error) {
      console.error("Error reading fighters file:", error);
      return [];
    }
  };
  const allFighters = await getAllFighters();

  return (
    <>
      <h1 className="my-8"> All Fighters </h1>

      <div className="container mx-auto">
        <ul className="flex flex-wrap gap-6 w-full justify-evenly">
          {allFighters.map((fighter: Fighter) => (
            <li key={fighter.name} className="w-80 ">
              <FighterCard fighter={fighter} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FighersPage;
