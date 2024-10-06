'use client';

import { SafeUser } from "@/app/types";

interface ListingHeadProps {
  title: string;
  imageSrc: string[];
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  imageSrc,
  id,
  currentUser
}) => {
  const remainingImages = imageSrc.slice(1); // Images except the first one

  return (
    <div>
      <div className="text-2xl font-bold">{title}</div>
      <div className="w-full h-[60vh] overflow-hidden relative mt-4">
        <div className="flex gap-1 h-full">
          {/* Main image */}
          <div className="flex-1 rounded-lg overflow-hidden">
            <img className="object-cover w-full h-full" src={imageSrc[0]} alt="Main Image" />
          </div>

          {/* Right-hand side for remaining images */}
          <div className={`flex flex-col gap-1 ${remainingImages.length > 0 ? 'flex-1' : ''}`}>
            {remainingImages.length === 1 && (
              <div className="h-full rounded-lg overflow-hidden">
                <img className="object-cover w-full h-full" src={remainingImages[0]} alt="Image" />
              </div>
            )}

            {remainingImages.length === 2 && (
              <div className="flex flex-col gap-1 h-full">
                {remainingImages.map((image, i) => (
                  <img key={i} className="object-cover w-full h-1/2 rounded-lg overflow-hidden" src={image} alt={`Image ${i + 1}`} />
                ))}
              </div>
            )}

            {remainingImages.length === 3 && (
              <div className="flex flex-col gap-1 h-full">
                <div className="h-1/2">
                  <img className="object-cover w-full h-full rounded-lg overflow-hidden" src={remainingImages[0]} alt="Image" />
                </div>
                <div className="flex gap-1 h-1/2">
                  {remainingImages.slice(1).map((image, i) => (
                    <img key={i} className="object-cover w-1/2 h-full rounded-lg overflow-hidden" src={image} alt={`Image ${i + 2}`} />
                  ))}
                </div>
              </div>
            )}

            {remainingImages.length >= 4 && (
              <div className="grid grid-cols-2 grid-rows-2 gap-1 h-full">
                {remainingImages.slice(0, 4).map((image, i) => (
                  <img key={i} className="object-cover w-full h-full rounded-lg overflow-hidden" src={image} alt={`Image ${i + 1}`} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingHead;
