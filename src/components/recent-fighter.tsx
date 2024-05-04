import { RecentFight } from "@/lib/types";
import { TableCell, TableRow } from "./ui/table";

interface RecentFighterProps {
  fightInfo: RecentFight;
}

const RecentFighter = ({ fightInfo }: RecentFighterProps) => {
  const formattedDate = fightInfo.fight_date.toLocaleString();
  const [date, time] = formattedDate.split(", ");

  return (
    <TableRow>
      <TableCell>
        <div className="flex">
          <div
            className={`font-medium ${
              fightInfo.winner === fightInfo.fighter1
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {fightInfo.fighter1}
          </div>
          <span className="px-6 font-bold"> VS </span>
          <div
            className={`font-medium ${
              fightInfo.winner === fightInfo.fighter2
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {fightInfo.fighter2}
          </div>
        </div>
        <div className="hidden text-sm text-muted-foreground md:inline">
          Winner is {fightInfo.winner}!
        </div>
      </TableCell>
      <TableCell className="hidden xl:table-column">Sale</TableCell>

      <TableCell className="text-right">
        {date} <span className="text-muted-foreground">{time}</span>
      </TableCell>
    </TableRow>
  );
};

export default RecentFighter;
