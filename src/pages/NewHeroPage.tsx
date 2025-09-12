import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFieldArray, useForm } from "react-hook-form";

import type { Hero } from "@/types";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import apiClient from "@/api-client/api-client";
import SuperpowerInputList from "@/components/SuperpowerInputList";
import ImageUploader from "@/components/ImageUploader";

export interface UploadedImage {
  file: File;
  preview: string;
}
export default function HeroForm() {
  const [imageData, setImageData] = useState<UploadedImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, control } = useForm<Hero>({
    defaultValues: {
      nickname: "",
      real_name: "",
      origin_description: "",
      superpowers: [""],
      catch_phrase: "",
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "superpowers" as never,
  });
  const onSubmit = async (data: Hero) => {
    try {
      setIsLoading(true);

      // 1️⃣ Upload all images
      const formData = new FormData();
      imageData.forEach((image) => formData.append("images", image.file));

      const uploadRes = await apiClient.post<{ urls: string[] }>(
        "api/images/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const uploadedUrls = uploadRes.data.urls; // array of URLs

      // 2️⃣ Create the hero
      const heroRes = await apiClient.post<Hero>("api/superheroes", data);
      const heroId = heroRes.data.id;

      // 3️⃣ Post each image info to /api/images
      const imagePosts = uploadedUrls.map((url) => ({
        hero_id: heroId,
        image_url: url,
      }));

      await Promise.all(
        imagePosts.map((img) => apiClient.post("/api/images", img))
      );

      console.log("Hero and images created successfully!");
    } catch (err) {
      console.error("Error creating hero with images:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const imagesArray: UploadedImage[] = Array.from(e.target.files).map(
        (f) => ({
          file: f,
          preview: URL.createObjectURL(f),
        })
      );
      setImageData((prev) => [...prev, ...imagesArray]);
    }
  };
  const handleDeleteImage = (src: string) => {
    setImageData((prev) => prev.filter((item) => item.preview !== src));
  };
  return (
    <div className="max-w-2xl mx-auto p-6 rounded-lg shadow-sm border">
      <h2 className="text-2xl font-semibold mb-6">Create New Hero</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <Label className="text-sm font-medium">Nickname</Label>
          <Input
            {...register("nickname", { required: true })}
            placeholder="Enter hero nickname"
            className="w-full"
          />

          <Label className="text-sm font-medium">Real Name</Label>
          <Input
            {...register("real_name")}
            placeholder="Enter real name"
            className="w-full"
          />
          <SuperpowerInputList
            fields={fields}
            append={append}
            remove={remove}
            register={register}
          />
          <Label className="text-sm font-medium">Catch Phrase</Label>
          <Input
            {...register("catch_phrase")}
            placeholder="Enter memorable catch phrase"
            className="w-full"
          />

          <Label className="text-sm font-medium">Origin Story</Label>
          <Textarea
            {...register("origin_description")}
            placeholder="Describe the hero's origin story..."
            className="w-full min-h-24 resize-none"
            rows={4}
          />
        </div>
        <ImageUploader
          imageData={imageData}
          onDeleteImage={handleDeleteImage}
          onFileChange={handleFileChange}
        />
        <div className="pt-4 border-t border-gray-100">
          <Button type="submit" className="w-full font-medium py-3">
            {isLoading ? "Creating your Hero...." : "Create Hero"}
          </Button>
        </div>
      </form>
    </div>
  );
}
