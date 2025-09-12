import useHeroes from "@/hooks/useHeroes";

import { Link } from "react-router-dom";
import HeroCard from "./HeroCard";
import NewHeroCard from "./NewHeroCard";

const HeroGrid = () => {
  const { heroes, isLoading, error } = useHeroes();
  if (isLoading) return <p>Loading heroes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Heroes</h1>
      <div className="grid gap-4 grid-cols-3">
        <NewHeroCard />

        {heroes.map((hero) => (
          <Link
            key={hero.id}
            to={`/superheroes/${hero.id}`}
            className="text-blue-600"
          >
            <HeroCard hero={hero}></HeroCard>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HeroGrid;
