import type { Hero } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface Props {
  hero: Hero;
}

const HeroCard = ({ hero }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{hero.nickname}</CardTitle>
        <CardDescription>{hero.real_name}</CardDescription>
      </CardHeader>
      <CardContent>
        <img src={hero.first_image} alt="" />
        {hero.superpowers.map((power) => (
          <p key={power}>{power}</p>
        ))}
      </CardContent>
      <CardFooter>{/* <p>Card Footer</p> */}</CardFooter>
    </Card>
  );
};

export default HeroCard;
