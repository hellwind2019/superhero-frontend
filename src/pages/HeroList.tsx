import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Hero } from "../types";
import api from "../api";

export default function HeroList() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<Hero[]>("/api/superheroes")
      .then((res) => {
        setHeroes(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading heroes...</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Heroes</h1>
      <ul className="space-y-2">
        {heroes.map((hero) => (
          <li key={hero.id} className="border p-2 rounded">
            <Link to={`/superheroes/${hero.id}`} className="text-blue-600">
              {hero.nickname} ({hero.real_name})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
