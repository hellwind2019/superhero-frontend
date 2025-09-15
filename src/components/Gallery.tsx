import React from "react";
import { Label } from "./ui/label";

import type { UploadedImage } from "./HeroForm";
import UploadImageButton from "./UploadImageButton";
import type { HeroImage } from "@/types";
import GalleryImage from "./GalleryImage";

interface Props {
  existingImages?: HeroImage[];
  imageData: UploadedImage[];
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteNewImage: (id: number) => void;
  onDeleteExistingImage: (id: number) => void;
}

const Gallery = ({
  imageData,
  existingImages,
  onDeleteNewImage,
  onDeleteExistingImage,
  onFileChange,
}: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Superhero Images</Label>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {existingImages?.map((image) => (
          <GalleryImage
            key={image.image_url}
            index={image.id!}
            onDeleteImage={onDeleteExistingImage}
            url={image.image_url}
          />
        ))}
        {imageData.map((image, index) => (
          <GalleryImage
            key={image.preview}
            index={index}
            onDeleteImage={onDeleteNewImage}
            url={image.preview}
          />
        ))}
        {onFileChange && <UploadImageButton onFileChange={onFileChange} />}
      </div>

      <p className="text-xs text-gray-500">
        Upload multiple images to showcase your hero.
      </p>
    </div>
  );
};

export default Gallery;
