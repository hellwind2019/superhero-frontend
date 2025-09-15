import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import apiClient from "@/api-client/api-client";

interface UploadedFile {
  file: File;
  preview: string;
  uploading: boolean;
  url?: string;
}

export default function SimpleFileUploadDialog() {
  const [fileData, setFileData] = useState<UploadedFile | null>(null);
  const [open, setOpen] = useState(false);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setFileData({
      file,
      preview: URL.createObjectURL(file),
      uploading: false,
    });
  };

  const handleUpload = async () => {
    if (!fileData) return;

    setFileData({ ...fileData, uploading: true });

    const formData = new FormData();
    formData.append("image", fileData.file);

    try {
      const res = await apiClient.post<{ url: string }>(
        "/api/images/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setFileData({ ...fileData, uploading: false, url: res.data.url });
    } catch (err) {
      console.error(err);
      setFileData({ ...fileData, uploading: false });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Upload File</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
          <DialogDescription>
            Select the file you would like to upload.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div>
            <Label htmlFor="file">File</Label>
            <Input id="file" type="file" onChange={handleFileChange} />
          </div>

          {fileData && (
            <div className="border p-2">
              <img
                src={fileData.preview}
                alt="preview"
                className="m-auto w-auto h-50 object-cover mb-2"
              />
              {fileData.uploading && <p>Uploading...</p>}
              {fileData.url && <p className="text-green-600">Uploaded!</p>}
              {!fileData.url && !fileData.uploading && (
                <div className="flex justify-end">
                  <Button
                    className="bg-emerald-400"
                    variant={"outline"}
                    type="button"
                    onClick={handleUpload}
                  >
                    Upload
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            type="button"
            onClick={() => {
              setFileData(null);
              setOpen(false);
            }}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
