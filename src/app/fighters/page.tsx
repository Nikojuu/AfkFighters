import { Fighter } from "@/components/fight-board";
import FighterCard from "@/components/fighter-info-card";
import { getAllFighters } from "@/services/services";
import Link from "next/link";

export interface FightersArray {
  fighters: Fighter[];
}
export const dynamic = "force-dynamic";
const FighersPage = async () => {
  // this wasnt possible to fetch data using CRUD methods from local database from page component

  const allFighters = await getAllFighters();

  return (
    <>
      <h1 className="my-8"> All Fighters </h1>

      <div className="container mx-auto">
        <ul className="flex flex-wrap gap-6 w-full justify-evenly">
          {allFighters.map((fighter: Fighter) => (
            <li key={fighter.name} className="w-80 ">
              <Link href={`/animal/${fighter.slug}`}>
                <FighterCard fighter={fighter} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FighersPage;
