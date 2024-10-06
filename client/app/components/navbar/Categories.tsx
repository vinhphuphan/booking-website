"use client";

import { TbBeach, TbMountain, TbUfo } from "react-icons/tb";
import Container from "../Container";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiLightBulb,
  GiModernCity,
  GiSurfBoard,
  GiWindmill,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { FaSkiing } from "react-icons/fa";
import { BsFire, BsSnow, BsStars } from "react-icons/bs";
import {
  IoChevronBackSharp,
  IoChevronForwardSharp,
  IoDiamond,
} from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { LiaSwimmingPoolSolid } from "react-icons/lia";
import { LuKeyRound } from "react-icons/lu";

export const categories = [
  {
    label: "Icons",
    icon: BsStars,
    description: "This property is iconic!",
  },
  {
    label: "Amazing pools",
    icon: LiaSwimmingPoolSolid,
    description: "This property has pool!",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is in the countryside!",
  },
  {
    label: "Beachfront",
    icon: TbBeach,
    description: "This property is close to the beach!",
  },
  {
    label: "WindMills",
    icon: GiWindmill,
    description: "This property has windmills!",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern!",
  },
  {
    label: "OMG!",
    icon: TbUfo,
    description: "This property is OMG!",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an island!",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is close to a lake!",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has skiing activities!",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This property is in a castle!",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property has camping activities!",
  },
  {
    label: "Artic",
    icon: BsSnow,
    description: "This property has artic activities!",
  },
  {
    label: "Cav",
    icon: GiCaveEntrance,
    description: "This property is in a cave!",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in the desert!",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is in the barn!",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is luxurious!",
  },

  {
    label: "Trending",
    icon: BsFire,
    description: "This property is trending!",
  },
  {
    label: "Surfing",
    icon: GiSurfBoard,
    description: "This property has surfing beach infront!",
  },
  {
    label: "Top cities",
    icon: GiModernCity,
    description: "This property has surfing beach infront!",
  },
  {
    label: "New",
    icon: LuKeyRound,
    description: "This property is brand new!",
  },
  {
    label: "Creative spaces",
    icon: GiLightBulb,
    description: "This property has creative spaces!",
  },
];
const SCROLL_AMOUNT = 500;

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathName = usePathname();
  const isMainPage = pathName === "/";

  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0); // Track scroll position
  const [maxScrollWidth, setMaxScrollWidth] = useState(0); // Max scrollable width

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      setMaxScrollWidth(container.scrollWidth - container.clientWidth);
    }
  }, []);

  const scrollLeft = () => {
    setScrollPosition((prev) => Math.max(prev - SCROLL_AMOUNT, 0));
  };

  const scrollRight = () => {
    setScrollPosition((prev) => Math.min(prev + SCROLL_AMOUNT, maxScrollWidth));
  };

  if (!isMainPage) {
    return null;
  }

  return (
    <div className="relative">
      <Container>
        <div className="relative pt-0 pb-2 md:pb-0 md:pt-2 box-border overflow-auto md:overflow-x-hidden">
          <div
            ref={containerRef}
            className="flex flex-row gap-7 py-0 md:py-1 transition-transform ease-out duration-500"
            style={{
              transform: `translateX(-${scrollPosition}px)`,
            }}
          >
            {categories.map((item) => (
              <CategoryBox
                key={item.label}
                label={item.label}
                selected={category === item.label}
                icon={item.icon}
              />
            ))}
          </div>
        </div>
      </Container>

      {/* Scroll Buttons */}
      <div className={`absolute inset-6 hidden md:flex items-center justify-between`}>
        <button
          onClick={scrollLeft}
          disabled={scrollPosition === 0} // Disable if at the start
          className={`p-1 rounded-full shadow bg-white/60 text-gray-800 hover:bg-white transition-opacity duration-300 ${
            scrollPosition === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <IoChevronBackSharp size={20} />
        </button>

        <button
          onClick={scrollRight}
          disabled={scrollPosition >= maxScrollWidth} // Disable if at the end
          className={`p-1 rounded-full shadow bg-white/60 text-gray-800 hover:bg-white transition-opacity duration-300 ${
            scrollPosition >= maxScrollWidth
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          <IoChevronForwardSharp size={20} />
        </button>
      </div>
    </div>
  );
};

export default Categories;
