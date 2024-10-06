"use client";
import useCountries from "@/app/hooks/useCountries";
import useSearchModal from "@/app/hooks/useSearchModal";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { FaSearch } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";

const SearchSmallScreen = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();
  const router = useRouter();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }

    return null;
  }, [getByValue, locationValue]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      const guestCountNumber = parseInt(guestCount, 10);
      return `${guestCountNumber} ${guestCountNumber > 1 ? "guests" : "guest"}`;
    }

    return null;
  }, [guestCount]);

  const rangeLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      return `${format(start, "MMM d, yyyy")} - ${format(end, "MMM d, yyyy")}`; // Custom formatted dates
    }

    return null;
  }, [startDate, endDate]);

  // Conditional rendering for the search labels
  if (locationLabel || rangeLabel || guestLabel) {
    return (
      <div className="w-full h-auto flex flex-row items-center justify-start bg-neutral-100 rounded-full">
        <div onClick={() => router.push("/")} className="px-5 py-4 text-neutral-900">
          <IoArrowBack size={20} />
        </div>
        <div className="flex flex-col w-full">
          <div className="text-sm font-bold">{locationLabel}</div>
          <div className="flex flex-row text-neutral-600 items-center gap-2 w-full">
            {rangeLabel && <div className="text-xs font-normal">{rangeLabel}</div>}
            {rangeLabel && guestLabel && <span className="text-xs font-light">•</span>}
            {guestLabel && <div className="text-xs font-normal">{guestLabel}</div>}
          </div>
        </div>
      </div>
    );
  }

  // Default state when no params are available
  return (
    <div
      onClick={searchModal.onOpen}
      className="w-full h-auto flex flex-row items-center justify-start"
    >
      <div className="px-5 py-4 text-neutral-900">
        <FaSearch size={20} />
      </div>
      <div className="flex flex-col w-full">
        <div className="text-sm font-bold">Where to?</div>
        <div className="flex flex-row text-neutral-600 items-center gap-2 w-full">
          <div className="text-xs font-normal">Anywhere</div>
          <span className="text-xs font-light">•</span>
          <div className="text-xs font-normal">Any week</div>
          <span className="text-xs font-light">•</span>
          <div className="text-xs font-normal">Add guest</div>
        </div>
      </div>
    </div>
  );
};

export default SearchSmallScreen;
