import apiClient from "@/api-client/api-client";
import type { Hero } from "@/types";
import { CanceledError } from "axios";
import { useEffect, useState } from "react";

const useHeroes = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    apiClient
      .get<Hero[]>("/api/superheroes", { signal: controller.signal })
      .then((res) => {
        setHeroes(res.data);
        // setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        // setLoading(false)
      })
      .finally(() => setIsLoading(false));
  }, []);
  return { heroes, isLoading, error };
};
export default useHeroes;
