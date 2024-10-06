"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { FiPlus } from "react-icons/fi";
import { TbPhoto } from "react-icons/tb";
import { IoCloseSharp } from "react-icons/io5";


declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  const handleUpload = useCallback(
    (result: any) => {
      // Add the new image URL to the array of existing images
      onChange([...value, result.info.secure_url]);
    },
    [value, onChange]
  );

  const handleRemoveImage = useCallback(
    (index: number) => {
      // Create a new array without the image at the specified index
      const updatedImages = value.filter((_, i) => i !== index);
      // Call onChange with the updated array
      onChange(updatedImages);
    },
    [value, onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="yxq2lufb"
      options={{
        multiple: true,
        maxFiles: 5,
      }}
    >
      {({ open }) => {
        return (
          <div>
            {/* Upload Button */}
            {value.length === 0 && (
              <div
                onClick={() => open()}
                className="
                relative
                flex flex-col items-center justify-center gap-4
                hover:opacity-70 transition cursor-pointer
                border-dashed border-2 border-neutral-300
                p-20 text-neutral-600
                "
              >
                <TbPhoto size={50} />
                <p className="text-medium font-semibold">Upload photos</p>
              </div>
            )}

            {/* Display uploaded images in a grid */}
            {value.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mt-4 max-h-[50vh] overflow-y-scroll">
                {value.map((imageUrl, index) => (
                  <div key={index} className="relative w-full min-h-[30vh]">
                    <Image
                      alt={`Uploaded image ${index + 1}`}
                      src={imageUrl}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-lg"
                    />
                    <div 
                    className="absolute right-2 top-2 text-black z-5 w-6 h-6"
                    onClick={() => handleRemoveImage(index)}
                    >
                      <div className="flex items-center justify-center rounded-full w-full h-full shadow-customShadow bg-neutral-100 hover:bg-white transtion duration-300 hover:scale-105">
                      <IoCloseSharp  size={16} />
                      </div>
                  </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
