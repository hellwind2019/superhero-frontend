import { Button } from "./ui/button";
import { X } from "lucide-react";

interface Props {
  url: string;
  index: number;
  onDeleteImage: (id: number) => void;
}

const GalleryImage = ({ url, index, onDeleteImage }: Props) => {
  return (
    <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
      <img
        src={url}
        alt={`Hero ${index + 1}`}
        className="w-full h-full object-cover"
      />
      <Button
        type="button"
        variant="destructive"
        size="sm"
        className="absolute top-1 right-1 h-6 w-6 rounded-full p-0"
        onClick={() => {
          onDeleteImage(index);
        }}
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default GalleryImage;
