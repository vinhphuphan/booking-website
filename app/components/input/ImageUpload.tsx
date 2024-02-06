"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhoto } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  const handleUpload = useCallback((result: any) => {
    onChange(result.info.secure_url);
  }, []);

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="yxq2lufb"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
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
            <p className="text-medium font-semibold">Upload a photo</p>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  alt="Upload"
                  src={value}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
