import React from "react";
import { Input } from "./ui/input";
import { Upload } from "lucide-react";
interface Props {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const UploadImageButton = ({ onFileChange }: Props) => {
  return (
    <label className="aspect-square border-1 border-dashed border-gray-700 w-full h-full flex flex-col items-center justify-center gap-1">
      <Input multiple type="file" className="hidden" onChange={onFileChange} />
      <Upload className="w-6 h-6 text-gray-400" />
      <span className="text-xs text-gray-500">Add Photo</span>
    </label>
  );
};

export default UploadImageButton;
