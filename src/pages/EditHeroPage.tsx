import HeroForm, { type UploadedImage } from "@/components/HeroForm";
import type { Hero } from "@/types";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHeroes } from "@/hooks/useHeroes";
import apiClient from "@/api-client/api-client";

const EditHeroPage = () => {
  const { id } = useParams<{ id: string }>();
  const [hero, setHero] = useState<Hero | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { updateHero } = useHeroes();

  useEffect(() => {
    apiClient
      .get<Hero>(`/api/superheroes/${id}`)
      .then((res) => setHero(res.data));
  }, [id]);

  const handleEdit = async (
    data: Hero,
    images: UploadedImage[],
    deletedImageIDs: number[]
  ) => {
    setIsLoading(true);
    try {
      await updateHero(id!, data, images, deletedImageIDs);
      console.log("Hero updated!");
    } finally {
      setIsLoading(false);
    }
  };

  if (!hero) return <p>Loading...</p>;

  return (
    <HeroForm initialData={hero} onSubmit={handleEdit} isLoading={isLoading} />
  );
};
export default EditHeroPage;
