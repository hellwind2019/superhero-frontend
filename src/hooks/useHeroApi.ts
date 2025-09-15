import apiClient from "@/api-client/api-client";
import type { Hero } from "@/types";
import type { UploadedImage } from "@/components/HeroForm";
import { useNavigate } from "react-router-dom";

export function useHeroApi() {
  const navigate = useNavigate();
  const createHero = async (data: Hero, images: UploadedImage[]) => {
    const formData = new FormData();
    images.forEach((img) => formData.append("images", img.file));

    const uploadRes = await apiClient.post<{ urls: string[] }>(
      "api/images/upload",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    const uploadedUrls = uploadRes.data.urls;

    const heroRes = await apiClient.post<Hero>("api/superheroes", data);
    const heroId = heroRes.data.id;

    await Promise.all(
      uploadedUrls.map((url) =>
        apiClient.post("/api/images", { hero_id: heroId, image_url: url })
      )
    );

    return heroRes.data;
  };

  const updateHero = async (
    id: string,
    data: Hero,
    images: UploadedImage[],
    deletedImageIDs: number[]
  ) => {
    await apiClient.put<Hero>(`/api/superheroes/${id}`, data);

    await Promise.all(
      deletedImageIDs.map((id) => {
        apiClient.delete(`/api/images/${id}`);
      })
    );
    if (images.length > 0) {
      const formData = new FormData();
      images.forEach((img) => formData.append("images", img.file));

      const uploadRes = await apiClient.post<{ urls: string[] }>(
        "api/images/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      const uploadedUrls = uploadRes.data.urls;
      await Promise.all(
        uploadedUrls.map((url) =>
          apiClient.post("/api/images", { hero_id: id, image_url: url })
        )
      );
    }
  };
  const deleteHero = async (id: string) => {
    await apiClient.delete(`/api/superheroes/${id}`);
    navigate(`/`);
  };
  return { createHero, updateHero, deleteHero };
}
