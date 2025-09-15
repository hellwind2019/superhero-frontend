import HeroForm, { type UploadedImage } from "@/components/HeroForm";
import type { Hero } from "@/types";
import { useState } from "react";
import { useHeroes } from "@/hooks/useHeroes";
import { useNavigate } from "react-router-dom";

const NewHeroPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { createHero } = useHeroes();
  const navigate = useNavigate();

  const handleCreate = async (data: Hero, images: UploadedImage[]) => {
    setIsLoading(true);

    try {
      const hero = await createHero(data, images);
      console.log("Hero created!");
      navigate(`/superheroes/${hero.id}`);
    } finally {
      setIsLoading(false);
    }
  };

  return <HeroForm onSubmit={handleCreate} isLoading={isLoading} />;
};
export default NewHeroPage;
