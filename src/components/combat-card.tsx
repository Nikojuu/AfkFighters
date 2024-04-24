import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import type { Fighter } from "./fight-board";

interface CombatCardProps {
  fighterData: Fighter;
}

const CombatCard = ({ fighterData }: CombatCardProps) => {
  return (
    <div className="combat-card-wrapper box-shadow h-[25rem]  md:w-60 lg:w-96 z-30">
      <div className="combat-card-content overflow-hidden p-4 gap-2 flex flex-col items-center justify-center text-xs">
        <div className="relative bg-white rounded-2xl w-full h-full flex-nowrap ">
          <Image
            src={fighterData.imgsrc}
            alt=""
            fill
            className="object-contain rounded-2xl"
          />
        </div>
        <div className="flex justify-center gap-4 items-center w-full">
          <Badge variant={"secondary"} className="h-8">
            Weakness
          </Badge>

          <Avatar>
            <AvatarImage src={`${fighterData.weakness}.jpg`} />
            <AvatarFallback>😱</AvatarFallback>
          </Avatar>
        </div>

        <div className="w-full bg-[#E18900] h-40 rounded-b-lg rounded-t-sm p-2 border-t-4 border-pink-600">
          <div className="flex justify-between items-center ">
            <p className="font-bold">Health: {fighterData.hitpoints} ❤️</p>
            <p className="font-bold">Defense: {fighterData.defence}🛡️</p>
            <p className="font-bold">Attack: {fighterData.attack} ⚔️</p>
          </div>
          <p className="py-1">
            <span className="block font-bold">Lore</span>{" "}
            {fighterData.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CombatCard;
