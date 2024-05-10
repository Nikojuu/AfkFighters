import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import type { Fighter } from "@/lib/types";

interface CombatCardProps {
  fighterData: Fighter;
}

const CombatCard = ({ fighterData }: CombatCardProps) => {
  return (
    <div className="combat-card-wrapper box-shadow h-full  w-full z-30 font-unkempt  ">
      <div className="combat-card-content overflow-hidden p-4 gap-2 flex md:flex-col flex-col sm:flex-row items-center justify-between text-xs">
        <div
          className="relative bg-white rounded-2xl sm:w-full  w-1/2 h-full flex-nowrap min-w-12  
        md:min-h-40"
        >
          <div className="absolute -top-3 bg-[#E18900] text-black rounded-lg z-50 translate-x-1/2 right-1/2 px-2 pb-1 font-bold text-xl">
            <span>{fighterData.name}</span>
          </div>
          <div className="flex bottom-0 bg-slate-300  absolute -left-20 sm:left-0 top-0 sm:top-auto z-50 flex-col md:flex-row items-center rounded-lg sm:rounded-tr-lg sm:rounded-bl-lg p-1  gap-2">
            <Badge variant={"secondary"} className="py-1">
              Weakness
            </Badge>

            <Avatar>
              <AvatarImage src={`${fighterData.weakness}.jpg`} />
              <AvatarFallback>😱</AvatarFallback>
            </Avatar>
          </div>
          <Image
            src={fighterData.imgsrc}
            alt=""
            fill
            className="object-contain rounded-2xl"
          />
        </div>

        <div className="w-full bg-[#E18900] h-full max-h-[50%]  flex flex-col  rounded-b-lg rounded-t-sm p-1 lg:p-2 border-t-4 border-pink-600 ">
          <div className="flex justify-between gap-3 md:flex-col items-start md:items-center  md:w-full md:h-10  ">
            <div className="flex justify-between items-left   text-black text-sm  md:items-center md:flex-row md:gap-4 flex-row [text-shadow:_1px_1px_6px_rgb(255_255_255)] ">
              <p className="font-bold">Health: {fighterData.hitpoints} ❤️</p>
              <p className="font-bold">Defense: {fighterData.defence}🛡️</p>
              <p className="font-bold">Attack: {fighterData.attack} ⚔️</p>
            </div>
          </div>
          <p className=" pb-2 text-sm md:leading-5  [text-shadow:_1px_1px_6px_rgb(0_0_0)]  overflow-hidden">
            <span className="block font-bold ">Description</span>{" "}
            {fighterData.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CombatCard;
