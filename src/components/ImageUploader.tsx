import React from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Upload, X } from "lucide-react";
import { Input } from "./ui/input";
import type { UploadedImage } from "@/pages/NewHeroPage";

interface Props {
  imageData: UploadedImage[];
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteImage: (src: string) => void;
}

const ImageUploader = ({ imageData, onDeleteImage, onFileChange }: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Superhero Images</Label>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {imageData.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200"
          >
            <img
              src={image.preview}
              alt={`Hero ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-1 right-1 h-6 w-6 rounded-full p-0"
              onClick={() => {
                onDeleteImage(image.preview);
              }}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
        <label className="aspect-square border-1 border-dashed border-gray-700 w-full h-full flex flex-col items-center justify-center gap-1">
          <Input
            multiple
            type="file"
            className="hidden"
            onChange={onFileChange}
          />
          <Upload className="w-6 h-6 text-gray-400" />
          <span className="text-xs text-gray-500">Add Photo</span>
        </label>
      </div>

      <p className="text-xs text-gray-500">
        Upload multiple images to showcase your hero.
      </p>
    </div>
  );
};

export default ImageUploader;
