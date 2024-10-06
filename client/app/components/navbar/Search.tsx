"use client";

import { useScroll } from "@/app/context/ScrollContext";
import useCountries from "@/app/hooks/useCountries";
import useSearchModal from "@/app/hooks/useSearchModal";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { format } from "date-fns";

interface SearchProps {
  isListingPage?: boolean;
}

const Search: React.FC<SearchProps> = ({ isListingPage }) => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();
  const { scrolled, setScrolled } = useScroll();

  const [isCheckinHovered, setIsCheckinHovered] = useState(false);
  const [isWhoGuestHovered, setIsWhoGuestHovered] = useState(false);
  const [isDateHovered, setIsDateHovered] = useState(false);
  const [staysIsSeleted, setStaysIsSeleted] = useState(true);

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }
    if (isListingPage) {
      return "Anywhere";
    }
    return `${scrolled ? "Anywhere" : "Search destination"}`;
  }, [getByValue, locationValue]);

  const durationLable = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }

    return "Any week";
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      const guestCountNumber = parseInt(guestCount, 10);
      return `${guestCountNumber} ${guestCountNumber > 1 ? "guests" : "guest"}`;
    }

    return "Add guests"; // Fallback text if guestCount is not provided
  }, [guestCount]);

  const checkinLabel = useMemo(() => {
    if (startDate) {
      const start = new Date(startDate as string);
      // Format the date (you can customize the format here)
      return start.toLocaleDateString(); // or use a library for custom formatting
    }

    return "Add dates"; // Fallback text if startDate is not provided
  }, [startDate]);

  const checkoutLabel = useMemo(() => {
    if (endDate) {
      const end = new Date(endDate as string);
      // Format the date
      return end.toLocaleDateString(); // or use a library for custom formatting
    }

    return "Add dates"; // Fallback text if endDate is not provided
  }, [endDate]);

  const rangeLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      return `${format(start, "MMM d, yyyy")} - ${format(end, "MMM d, yyyy")}`; // Custom formatted dates
    }

    return "Add dates";
  }, [startDate, endDate]);

  if (isListingPage) {
    return (
      <div
        onClick={searchModal.onOpen}
        className={`
        search-bar w-auto px-3 py-1 mx-auto
        absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2
        rounded-full bg-white border-[1px] shadow-md hover:shadow-lg 
        cursor-pointer transition
        `}
      >
        <div className="flex flex-row items-center flex-auto justify-between text-sm font-semibold">
          <div className="px-4">{locationLabel}</div>

          <div className="hidden md:block px-4 border-x-[1px]">
            {durationLable}
          </div>

          <div className="flex flex-row items-center gap-4 pl-4">
            <div className="text-sm font-normal text-gray-500 hidden md:block">
              {guestLabel}
            </div>
            <div
              onClick={() => setScrolled(true)}
              className="bg-rose-500 text-white rounded-full p-2.5"
            >
              <FaSearch size={13} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      {!scrolled && (
        <div className="flex-1 flex justify-center">
          <div className="flex flex-row items-center">
            <div
              className={`text-base font-semibold cursor-pointer px-3 py-3 rounded-full transition${
                !staysIsSeleted
                  ? "text-neutral-500 hover:bg-neutral-200 hover:text-neutral-800 "
                  : ""
              }`}
              onClick={() => setStaysIsSeleted(true)}
            >
              Stays
            </div>
            <div
              className={`text-base font-semibold cursor-pointer px-3 py-3 rounded-full ${
                staysIsSeleted
                  ? "text-neutral-500 hover:bg-neutral-200 hover:text-neutral-800 transition"
                  : ""
              }`}
              onClick={() => setStaysIsSeleted(false)}
            >
              Experiences
            </div>
          </div>
        </div>
      )}
      <div
        onClick={searchModal.onOpen}
        className={`
        search-bar
        ${
          scrolled
            ? "w-auto px-3 py-2"
            : "md:top-[5.8rem] xl:top-[5rem] z-20 md:w-[90vw] lg:w-[80vw] xl:w-[55vw]"
        }
        mx-auto
        absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2
        rounded-full bg-white border-[1px] shadow-md hover:shadow-lg 
        cursor-pointer transition
        `}
      >
        <div className="flex flex-row items-center flex-auto justify-between text-sm font-semibold">
          {scrolled ? (
            <div className="px-4">{locationLabel}</div>
          ) : (
            <div className="flex flex-col flex-1 py-2 pl-8 rounded-full hover:bg-neutral-100 transition relative group">
              <div className="text-sm font-medium text-start">Where</div>
              <div className="text-sm font-light text-neutral-500">
                {locationLabel}
              </div>
              <div
                className={`absolute top-1/2 right-0 h-[40%] border-r-[1px] border-neutral-300 group-hover:border-none transition-transform transform -translate-y-1/2 ${
                  isCheckinHovered ? "border-none" : ""
                } ${isDateHovered ? "border-none" : ""}`}
              ></div>
            </div>
          )}
          {scrolled ? (
            <div className="hidden md:block px-4 border-x-[1px]">
              {durationLable}
            </div>
          ) : (
            <div className="flex flex-1 flex-row justify-start items-center relative group">
              {staysIsSeleted ? (
                <>
                  <div
                    className="flex flex-col flex-1 py-2 px-6 hover:bg-neutral-100 transition relative rounded-full group"
                    onMouseEnter={() => setIsCheckinHovered(true)}
                    onMouseLeave={() => setIsCheckinHovered(false)}
                  >
                    <div className="text-sm font-normal">Check in</div>
                    <div className="text-sm font-light text-neutral-500">
                      {checkinLabel}
                    </div>
                    <div className="absolute top-1/2 right-0 h-[40%] border-r-[1px] border-neutral-300 group-hover:border-none transition-transform transform -translate-y-1/2"></div>
                  </div>
                  <div className="flex flex-col flex-1 py-2 px-6 hover:bg-neutral-100 transition relative rounded-full group">
                    <div className="text-sm font-normal">Check out</div>
                    <div className="text-sm font-light text-neutral-500">
                      {checkoutLabel}
                    </div>
                    <div
                      className={`absolute top-1/2 right-0 h-[40%] border-r-[1px] border-neutral-300 group-hover:border-none transition-transform transform -translate-y-1/2 ${
                        isWhoGuestHovered ? "border-none" : ""
                      }`}
                    ></div>
                  </div>
                </>
              ) : (
                <div
                  className="flex flex-col flex-1 py-2 px-6 rounded-full hover:bg-neutral-100 transition relative group"
                  onMouseEnter={() => setIsDateHovered(true)}
                  onMouseLeave={() => setIsDateHovered(false)}
                >
                  <div className="text-sm font-normal text-start">Date</div>
                  <div className="text-sm font-light text-neutral-500 ">
                    {rangeLabel}
                  </div>
                  <div
                    className={`absolute top-1/2 right-0 h-[40%] border-r-[1px] border-neutral-300 group-hover:border-none transition-transform transform -translate-y-1/2 ${
                      isWhoGuestHovered ? "border-none" : ""
                    }`}
                  ></div>
                </div>
              )}
            </div>
          )}
          {scrolled ? (
            <div className="flex flex-row items-center gap-4 pl-4">
              <div className="text-sm font-normal text-gray-500 hidden md:block">
                {guestLabel}
              </div>
              <div
                onClick={() => setScrolled(true)}
                className="bg-rose-500 text-white rounded-full p-2.5"
              >
                <FaSearch size={13} />
              </div>
            </div>
          ) : (
            <div
              className="relative flex flex-1 items-center py-2 px-6 rounded-full hover:bg-neutral-100 transition group"
              onMouseEnter={() => setIsWhoGuestHovered(true)}
              onMouseLeave={() => setIsWhoGuestHovered(false)}
            >
              <div className="flex flex-col">
                <div className="text-sm font-normal text-start">Who</div>
                <div className="text-sm font-light text-neutral-500">
                  {guestLabel}
                </div>
              </div>

              <div className="absolute right-3 bg-rose-500 text-white rounded-full p-3">
                <FaSearch size={14} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
