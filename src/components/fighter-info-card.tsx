import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Fighter } from "@/lib/types";

interface FighterCardProps {
  fighter: Fighter;
}

const FighterCard = ({ fighter }: FighterCardProps) => {
  return (
    <Card className="w-full ">
      <CardHeader className=" border border-pink-600 rounded-t-2xl">
        <CardTitle className="text-center">{fighter.name}</CardTitle>
      </CardHeader>
      <CardContent className="relative aspect-square overflow-hidden">
        <Image
          alt=""
          src={fighter.imgsrc}
          fill
          className="hover:scale-110 transition-all object-cover"
        />
      </CardContent>
    </Card>
  );
};

export default FighterCard;
