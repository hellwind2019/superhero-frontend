import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Hero } from "../types";
import api from "../api";

export default function HeroDetail() {
  const { id } = useParams();
  const [hero, setHero] = useState<Hero | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<Hero>(`/api/superheroes/${id}`)
      .then((res) => setHero(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading hero...</p>;
  if (!hero) return <p>Hero not found</p>;

  return (
    <div>
      <Link to="/" className="text-blue-500">
        ← Back
      </Link>
      <h1 className="text-2xl font-bold my-4">{hero.nickname}</h1>
      <p>
        <strong>Alias:</strong> {hero.real_name}
      </p>
      <p>
        <strong>Power:</strong> {hero.superpowers}
      </p>
    </div>
  );
}
