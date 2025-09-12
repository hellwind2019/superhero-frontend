import useHeroes from "@/hooks/useHeroes";

import { Link } from "react-router-dom";
import HeroCard from "./HeroCard";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";

const HeroGrid = () => {
  const { heroes, isLoading, error } = useHeroes();
  if (isLoading) return <p>Loading heroes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-balance text-white">
          Superhero Gallery
        </h1>
        <Link to={`/superheroes/new`}>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4" />
            Add New Hero
          </Button>
        </Link>
      </div>
      <div className="grid gap-4 grid-cols-3">
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
