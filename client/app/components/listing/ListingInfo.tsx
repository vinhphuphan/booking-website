"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import { useCallback, useEffect, useRef, useState } from "react";

interface ListingInfoProps {
  user: SafeUser;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category: {
    icon: IconType;
    label: string;
    description: string;
  };
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  locationValue,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue as string);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  // Toggle function for expanding or collapsing description
  const toggleDescription = useCallback(() => {
    setShowFullDescription((prev) => !prev);
  }, []);

  // Check if description exceeds the container's height
  useEffect(() => {
    const descriptionEl = descriptionRef.current;

    if (descriptionEl) {
      const isOverFlow =
        descriptionEl.scrollHeight > descriptionEl.clientHeight;
      setIsOverflowing(isOverFlow);
    }
  }, [description]);

  return (
    <div className="col-span-4 flex flex-col gap-8 overflow-hidden">
      <div className="flex flex-col gap-2">
        {/* Location, Flag, and Region */}
        <h3 className="text-xl font-medium">
          {location?.flag} {` ${location?.label} / ${location?.region}`}
        </h3>
        <div className="flex gap-2">
          <p>
            {guestCount} guest{guestCount > 1 ? "s" : ""} -
          </p>
          <p>
            {roomCount} bedroom{roomCount > 1 ? "s" : ""} -
          </p>
          <p>
            {bathroomCount} bath{bathroomCount > 1 ? "s" : ""}
          </p>
        </div>

        {/* User Avatar and Info */}
        <div className="flex items-center gap-4 mt-6 mb-6">
          <Avatar src={user?.image} />
          <div>
            <h2 className="text-lg font-semibold">Hosted by {user?.name}</h2>
            <p className="text-sm text-gray-500">
              Joined in {new Date(user?.createdAt).getFullYear()}
            </p>
          </div>
        </div>
        <hr />
        {/* Category */}
        {category && (
          <ListingCategory
            icon={category.icon}
            label={category.label}
            description={category.description}
          />
        )}

        {/* Description */}
        <div
          className={`mt-6 mb-2 transition-all ${
            showFullDescription
              ? "max-h-[40vh] overflow-auto"
              : "max-h-[20vh] overflow-hidden"
          }`}
        >
          <p className="text-gray-700 text-pretty whitespace-pre-wrap">{description}</p>
        </div>

        {/* View More / View Less Button */}
        <button
            className="text-black font-semibold underline text-start"
            onClick={toggleDescription}
          >
            {showFullDescription ? "View Less" : "View More"}
          </button>
      </div>
    </div>
  );
};

export default ListingInfo;
