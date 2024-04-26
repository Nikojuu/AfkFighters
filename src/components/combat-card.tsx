import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import type { Fighter } from "./fight-board";

interface CombatCardProps {
  fighterData: Fighter;
}

const CombatCard = ({ fighterData }: CombatCardProps) => {
  return (
    <div className="combat-card-wrapper box-shadow h-full  w-full z-30 ">
      <div className="combat-card-content overflow-hidden p-4 gap-2 flex md:flex-col flex-col sm:flex-row items-center justify-between text-xs">
        <div className="relative bg-white rounded-2xl sm:w-full  w-1/2 h-full flex-nowrap min-w-12  min-h-16">
          <Image
            src={fighterData.imgsrc}
            alt=""
            fill
            className="object-contain rounded-2xl"
          />
        </div>

        <div className="w-full bg-[#E18900] h-full  flex flex-col  rounded-b-lg rounded-t-sm p-1 border-t-4 border-pink-600 ">
          <div className="flex justify-between gap-3 md:flex-col items-start md:items-center  md:w-full md:h-10  ">
            <div className="flex justify-between items-left  md:items-center md:flex-row md:gap-4 flex-col  ">
              <p className="font-bold">Health: {fighterData.hitpoints} ❤️</p>
              <p className="font-bold">Defense: {fighterData.defence}🛡️</p>
              <p className="font-bold">Attack: {fighterData.attack} ⚔️</p>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-2">
              <Badge variant={"secondary"} className="py-1">
                Weakness
              </Badge>

              <Avatar>
                <AvatarImage src={`${fighterData.weakness}.jpg`} />
                <AvatarFallback>😱</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <p className="md:py-1 py-4 text-xs lg:text-sm md: max-h-[72%] -mt-8 md:mt-8 overflow-hidden">
            <span className="block font-bold ">Description</span>{" "}
            {fighterData.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CombatCard;
