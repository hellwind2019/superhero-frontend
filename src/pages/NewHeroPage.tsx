import HeroForm, { type UploadedImage } from "@/components/HeroForm";
import type { Hero } from "@/types";
import { useState } from "react";
import { useHeroApi } from "@/hooks/useHeroApi";

const NewHeroPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { createHero } = useHeroApi();

  const handleCreate = async (data: Hero, images: UploadedImage[]) => {
    setIsLoading(true);
    try {
      await createHero(data, images);
      console.log("Hero created!");
    } finally {
      setIsLoading(false);
    }
  };

  return <HeroForm onSubmit={handleCreate} isLoading={isLoading} />;
};
export default NewHeroPage;
