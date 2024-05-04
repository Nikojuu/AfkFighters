import { Fighter } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface TrendinFightersProps {
  fighter: Fighter;
}

const TrendinFighters = ({ fighter }: TrendinFightersProps) => {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="hidden h-9 w-9 sm:flex">
        <AvatarImage src={fighter.imgsrc} alt="Avatar" />
        <AvatarFallback>OM</AvatarFallback>
      </Avatar>
      <div className="grid gap-1">
        <p className="text-sm font-medium leading-none">{fighter.name}</p>
        <p className="text-sm font-medium leading-none text-muted-foreground">
          Fight Count
        </p>
      </div>
      <div className="ml-auto font-medium">{fighter.fight_count}</div>
    </div>
  );
};

export default TrendinFighters;
