import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

interface FilterProps {
  staysIsSelected: boolean;
  scrolled: boolean;
}

const Filter: React.FC<FilterProps> = ({ staysIsSelected, scrolled }) => {
  const [isCheckinHovered, setIsCheckinHovered] = useState(false);
  const [isWhoGuestHovered, setIsWhoGuestHovered] = useState(false);
  const [isDateHovered, setIsDateHovered] = useState(false);

  return (
    <div
      className={`flex items-center justify-center mt-4 mb-2 transition-all duration-500
       animate-slideDown`}
    >
      <div className="hidden md:flex flex-row items-center border-[1px] rounded-full md:w-full lg:w-[80%] xl:w-[60%] shadow-customShadow">
        
        {/* First column */}
        <div className="flex flex-col flex-1 py-4 px-8 rounded-full hover:bg-neutral-100 transition relative group">
          <div className="text-sm font-normal text-start">Where</div>
          <div className="text-sm font-light text-neutral-500">
            Search destinations
          </div>
         
          {/* Right border */}
          <div
            className={`absolute top-1/2 right-0 h-[40%] border-r-[1px] border-neutral-300 group-hover:border-none transition-transform transform -translate-y-1/2 ${
              isCheckinHovered ? "border-none" : ""
            } ${isDateHovered ? "border-none" : ""}`}
          ></div>
        </div>

        {/* Second column */}
        <div className="flex flex-1 flex-row justify-start items-center relative group">
          {staysIsSelected ? (
            <>
              <div
                className="flex flex-col flex-1 py-4 px-6 hover:bg-neutral-100 transition relative rounded-full group"
                onMouseEnter={() => setIsCheckinHovered(true)}
                onMouseLeave={() => setIsCheckinHovered(false)}
              >
                <div className="text-sm font-normal">Check in</div>
                <div className="text-sm font-light text-neutral-500">
                  Add dates
                </div>
                {/* Right border */}
                <div className="absolute top-1/2 right-0 h-[40%] border-r-[1px] border-neutral-300 group-hover:border-none transition-transform transform -translate-y-1/2"></div>
              </div>
              <div className="flex flex-col flex-1 py-4 px-6 hover:bg-neutral-100 transition relative rounded-full group">
                <div className="text-sm font-normal">Check out</div>
                <div className="text-sm font-light text-neutral-500">
                  Add dates
                </div>
                {/* Right border */}
                <div
                  className={`absolute top-1/2 right-0 h-[40%] border-r-[1px] border-neutral-300 group-hover:border-none transition-transform transform -translate-y-1/2 ${
                    isWhoGuestHovered ? "border-none" : ""
                  }`}
                ></div>
              </div>
            </>
          ) : (
            <div
              className="flex flex-col flex-1 py-4 px-8 rounded-full hover:bg-neutral-100 transition relative group"
              onMouseEnter={() => setIsDateHovered(true)}
              onMouseLeave={() => setIsDateHovered(false)}
            >
              <div className="text-sm font-normal text-start">Date</div>
              <div className="text-sm font-light text-neutral-500 ">
                Add dates
              </div>
              {/* Right border */}
              <div
                className={`absolute top-1/2 right-0 h-[40%] border-r-[1px] border-neutral-300 group-hover:border-none transition-transform transform -translate-y-1/2 ${
                  isWhoGuestHovered ? "border-none" : ""
                }`}
              ></div>
            </div>
          )}
        </div>

        {/* Last column */}
        <div
          className="relative flex flex-1 items-center py-4 px-8 rounded-full hover:bg-neutral-100 transition group"
          onMouseEnter={() => setIsWhoGuestHovered(true)}
          onMouseLeave={() => setIsWhoGuestHovered(false)}
        >
          <div className="flex flex-col">
            <div className="text-sm font-normal text-start">Who</div>
            <div className="text-sm font-light text-neutral-500">
              Add guests
            </div>
          </div>

          {/* Search button */}
          <div className="absolute right-3 bg-rose-500 text-white rounded-full p-4">
            <FaSearch size={14} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
