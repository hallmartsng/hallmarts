import { TrashIcon } from "@heroicons/react/24/outline";
import React, { useRef } from "react";

type ImagePreview = {
  file: File;
  url: string;
  coverImage: boolean;
};

interface ProductImageUploadProps {
  uploadedImages: ImagePreview[];
  handleSelect: (files: FileList | null) => void;
  setUploadedImages: React.Dispatch<React.SetStateAction<ImagePreview[]>>;
}

const ProductImageUpload = ({
  uploadedImages,
  handleSelect,
  setUploadedImages,
}: ProductImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  console.log("uploadedImages ProductImageUpload: ", uploadedImages);

  const removeImage = (index: number) => {
    // if (uploadedImages.length === 1) return; // prevent empty state
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSetCoverImage = (index: number) => {
    setUploadedImages((prev) => {
      const updated = prev.map((img, i) => ({
        ...img,
        coverImage: i === index,
      }));

      const cover = updated[index];
      const rest = updated.filter((_, i) => i !== index);

      return cover ? [cover, ...rest] : updated;
    });
  };

  return (
    <div className="space-y-3">
      {/* Preview Grid */}
      {uploadedImages.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {uploadedImages.map((img, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg border border-gray-300"
              onClick={() => handleSetCoverImage(index)}
            >
              {index === 0 && (
                <span className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-0.5 text-xs text-white">
                  Cover
                </span>
              )}
              <img
                src={img.url}
                alt="preview"
                className="h-full w-full object-cover"
              />

              {/* Delete Icon */}
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white hover:bg-black"
              >
                <TrashIcon className="size-4" />
              </button>
            </div>
          ))}
        </div>
      )}
      {/* Upload Button */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer w-full rounded-lg border border-dashed p-2 sm:p-4 text-center text-sm text-gray-500 hover:border-gray-400"
      >
        Click to add images
      </button>

      <input
        ref={inputRef}
        type="file"
        name="images"
        multiple
        accept="image/*"
        hidden
        onChange={(e) => {
          handleSelect(e.target.files);
        }}
      />
    </div>
  );
};

export default ProductImageUpload;
