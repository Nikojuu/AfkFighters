import { Fighter } from "@/lib/types";
import FighterCard from "@/components/fighter-info-card";
import { Vortex } from "@/components/ui/vortex";
import { getAllFighters } from "@/services/services";
import Link from "next/link";

export interface FightersArray {
  fighters: Fighter[];
}
export const dynamic = "force-dynamic";

const FighersPage = async () => {
  const allFighters = await getAllFighters();

  return (
    <>
      <div className=" overflow-hidden absolute   h-full  w-full ">
        <Vortex className="flex items-center flex-col justify-center  py-4 w-full h-full z-0"></Vortex>
      </div>
      <div className="flex justify-center items-center w-full py-20 ">
        <h1 className=" relative"> All Fighters </h1>
      </div>

      <div className="container mx-auto z-50 relative">
        <ul className="flex flex-wrap gap-6 w-full justify-evenly">
          {allFighters.map((fighter: Fighter) => (
            <li key={fighter.name} className="w-80 ">
              <Link href={`/single-fighter-page/${fighter.slug}`}>
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
