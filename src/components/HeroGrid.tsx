import { Link } from "react-router-dom";
import HeroCard from "./HeroCard";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import Pagination from "./Pagination";
import { useState } from "react";
import { Separator } from "./ui/separator";
import { useHeroes } from "@/hooks/useHeroes";

const HeroGrid = () => {
  const { heroes, isLoading, error } = useHeroes();
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 5;
  const totalPages = Math.ceil(heroes.length / itemPerPage);
  const displayedHeroes = heroes.slice(
    (currentPage - 1) * itemPerPage,
    currentPage * itemPerPage
  );
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
      <div className="m-auto grid gap-4 grid-cols-3 max-w-7xl">
        {displayedHeroes.map((hero) => (
          <Link
            key={hero.id}
            to={`/superheroes/${hero.id}`}
            className="text-blue-600"
          >
            <HeroCard hero={hero}></HeroCard>
          </Link>
        ))}
      </div>
      <Separator className="my-6" />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default HeroGrid;
