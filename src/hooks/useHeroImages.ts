import { useState, useEffect } from "react";
import apiClient from "@/api-client/api-client";
import type { HeroImage } from "@/types";

export function useHeroImages(heroId?: number) {
  const [images, setImages] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!heroId) return;
    setLoading(true);
    apiClient
      .get<HeroImage[]>(`/api/images/${heroId}`)
      .then((res) => setImages(res.data))
      .finally(() => setLoading(false));
  }, [heroId]);

  const deleteImage = async (imageId: number) => {
    await apiClient.delete(`/api/images/${imageId}`);
    setImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  return { images, loading, deleteImage, setImages };
}
