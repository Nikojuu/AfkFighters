import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

const FighterCard = ({ name }: { name: string }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className="relative aspect-square overflow-hidden">
        <Image
          alt=""
          src="/pic1.jpg"
          fill
          className="hover:scale-110 transition-all object-cover"
        />
      </CardContent>
    </Card>
  );
};

export default FighterCard;
