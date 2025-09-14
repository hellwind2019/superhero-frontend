import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFieldArray, useForm } from "react-hook-form";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import SuperpowerInputList from "@/components/SuperpowerInputList";
import ImageUploader from "@/components/ImageUploader";

import type { Hero } from "@/types";

export interface UploadedImage {
  file: File;
  preview: string;
}

interface HeroFormProps {
  initialData?: Hero; // для Edit
  onSubmit: (data: Hero, images: UploadedImage[]) => Promise<void>;
  isLoading?: boolean;
}

export default function HeroForm({
  initialData,
  onSubmit,
  isLoading,
}: HeroFormProps) {
  const [imageData, setImageData] = useState<UploadedImage[]>([]);

  const { register, handleSubmit, control } = useForm<Hero>({
    defaultValues: initialData ?? {
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const imagesArray: UploadedImage[] = Array.from(e.target.files).map(
        (f) => ({ file: f, preview: URL.createObjectURL(f) })
      );
      setImageData((prev) => [...prev, ...imagesArray]);
    }
  };

  const handleDeleteImage = (src: string) => {
    setImageData((prev) => prev.filter((item) => item.preview !== src));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-lg shadow-sm border">
      <h2 className="text-2xl font-semibold mb-6">
        {initialData ? "Edit Hero" : "Create New Hero"}
      </h2>

      <form
        onSubmit={handleSubmit((data) => onSubmit(data, imageData))}
        className="space-y-6"
      >
        <div className="space-y-4">
          <Label className="text-sm font-medium">Nickname</Label>
          <Input
            {...register("nickname", { required: true })}
            placeholder="Enter hero nickname"
          />

          <Label className="text-sm font-medium">Real Name</Label>
          <Input {...register("real_name")} placeholder="Enter real name" />

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
          />

          <Label className="text-sm font-medium">Origin Story</Label>
          <Textarea
            {...register("origin_description")}
            placeholder="Describe the hero's origin story..."
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
            {isLoading
              ? "Saving..."
              : initialData
              ? "Save Changes"
              : "Create Hero"}
          </Button>
        </div>
      </form>
    </div>
  );
}
