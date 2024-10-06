"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import Button from "../Button";
import HeartButton from "../HeartButton";
import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";
import Image from "next/image";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);
  const [curr, setCurr] = useState(0);
  const [preButtonVisible, setPreButtonVisible] = useState(false);
  const [nextButtonVisible, setNextButtonVisible] = useState(false);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? data.imageSrc.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === data.imageSrc.length - 1 ? 0 : curr + 1));

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) {
        return;
      }
      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  useEffect(() => {
    if (curr === 0) {
      setPreButtonVisible(false);
    } else {
      setPreButtonVisible(true);
    }

    if (curr === data.imageSrc.length -1|| data.imageSrc.length <= 1) {
      setNextButtonVisible(false);
    } else {
      setNextButtonVisible(true);
    }
  }, [curr, data.imageSrc.length]);

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    return `${format(start, `PP`)} - ${format(end, `PP`)}`;
  }, [reservation]);

  return (
    <div
      className="col-span-1 cursor-pointer"
      onClick={() => router.push(`/listings/${data.id}`)}
    >
      {/* Carousel Container */}
      <div className="w-full aspect-square relative overflow-hidden rounded-xl mb-4">
        {/* Image Carousel */}
        <div
          className="w-full h-full flex transition-transform ease-out duration-500"
          style={{
            transform: `translateX(-${curr * 100}%)`,
          }}
        >
          {data.imageSrc.map((image, i) => (
            <img key={i} className="object-cover flex-1 w-full rounded-xl" src={image} />
          ))}
        </div>

        {/* Heart Button */}
        <div className="absolute top-3 right-3 z-10 hover:scale-105 transition">
          <HeartButton listingId={data.id} currentUser={currentUser} />
        </div>

        {/* Carousel Navigation Buttons */}
        <div className={`absolute inset-2 flex items-center justify-between`}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className={`p-1 rounded-full shadow bg-white/60 text-gray-800 hover:bg-white transition-opacity duration-300 ${
              preButtonVisible ? "opacity-100" : "opacity-0 invisible"
            }`}
          >
            <IoChevronBackSharp size={20} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className={`p-1 rounded-full shadow bg-white/60 text-gray-800 hover:bg-white transition-opacity duration-300 ${
              nextButtonVisible ? "opacity-100" : "opacity-0 invisible"
            }`}
          >
            <IoChevronForwardSharp size={20} />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 right-0 left-0 z-10">
          <div className="flex items-center justify-center gap-2">
            {data.imageSrc.map((_, i) => (
              <div
                key={i}
                className={`transition-all w-2 h-2 rounded-full ${
                  curr === i ? "bg-white p-1" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Listing Details */}
      <div className="font-semibold text-base md:text-lg mt-2">
        {location?.region}, {location?.label}
      </div>
      <div className="font-light text-sm md:text-base text-neutral-500">
        {reservationDate || data.category}
      </div>
      <div className="flex flex-row items-center gap-1 mb-4">
        <div className="font-semibold text-sm md:text-base underline">${price}</div>
        {!reservation && <div className="font-light text-sm md:text-base">night</div>}
      </div>
      {onAction && actionLabel && (
        <Button
          disabled={disabled}
          small
          label={actionLabel}
          onClick={handleCancel}
        />
      )}
    </div>
  );
};

export default ListingCard;
