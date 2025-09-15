import type { Hero } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "@radix-ui/react-label";

interface Props {
  hero: Hero;
}

const HeroCard = ({ hero }: Props) => {
  return (
    <Card className="p-0">
      <img
        src={hero.first_image || "no-image.png"}
        alt=""
        className="aspect-16/9 rounded-t-xl object-cover"
      />
      <CardContent>
        <Label className="text-xl font-bold">{hero.nickname}</Label>
      </CardContent>
      <CardFooter>{/* <p>Card Footer</p> */}</CardFooter>
    </Card>
  );
};

export default HeroCard;
