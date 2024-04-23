import FighterCard from "@/components/fighter-info-card";
import { getAllFighters } from "@/services/services";
import { Fighter } from "@/components/fight-board";
import ClientTest from "@/components/client-test";

export interface FightersArray {
  fighters: Fighter[];
}

const AllFighers = async () => {
  const res = await getAllFighters();

  const allFighters = res.fighters;

  const array = [
    { id: 1, name: "Fighter 1" },
    { id: 2, name: "Fighter 2" },
    { id: 3, name: "Fighter 3" },
    { id: 4, name: "Fighter 4" },
    { id: 5, name: "Fighter 5" },
  ];

  return (
    <>
      <h1 className="my-8"> All Fighters </h1>
      <ClientTest data={res} />
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

export default AllFighers;
