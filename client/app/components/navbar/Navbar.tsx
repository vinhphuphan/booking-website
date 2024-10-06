"use client";

import { SafeUser } from "@/app/types";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Categories from "./Categories";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useScroll } from "@/app/context/ScrollContext";
import SearchSmallScreen from "./SearchSmallScreen";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const pathName = usePathname();
  const [isListingPage, SetIsListingPage] = useState(false);
  const { scrolled } = useScroll();

  useEffect(() => {
    const currentPath = pathName ?? "";
    const listingPathPattern = /^\/listings\/[a-zA-Z0-9]+$/;
    SetIsListingPage(listingPathPattern.test(currentPath));
  }, [pathName]);

  if (isListingPage) {
    return (
      <div className={`w-full block z-20 bg-white transition`}>
        <div
          className={`h-auto relative py-4 border-none md:border-b-[1px] transition`}
        >
          <Container>
            <div
              className={`flex flex-row items-center justify-between xl:px-28`}
            >
              {/* 1st Column */}
              <div className="hidden md:flex flex-1 h-full">
                <Logo />
              </div>

              {/* 2nd Column */}
              <div className="">
                <div className="hidden md:flex flex-1">
                  <Search isListingPage={isListingPage} />
                </div>
              </div>

              {/* 3rd Column */}
              <div className="hidden md:flex flex-1 justify-end">
                <UserMenu currentUser={currentUser} />
              </div>
            </div>
          </Container>
        </div>
        <Categories />
      </div>
    );
  }

  return (
    <div
      className={`shadow-md md:shadow-none w-full fixed z-20 bg-white transition ${
        scrolled ? "shadow-customShadow" : ""
      }`}
    >
      <div
        className={`
           relative py-4 ${
             scrolled ? "" : "h-auto md:h-40"
           } border-b-0 md:border-b-[1px] transition`}
      >
        <Container>
          <div
            className={`flex flex-row items-center justify-between ${
              isListingPage ? "xl:px-44" : ""
            }`}
          >
            {/* 1st Column */}
            <div className="hidden md:flex flex-1 h-full">
              <Logo />
            </div>

            {/* 2nd Column */}
            <div className="w-full md:w-auto">
              {/* Search bar for medium and large screen */}
              <div className="hidden md:block">
                <Search isListingPage={isListingPage} />
              </div>

              {/* Search bar for small screen */}
              <div className="block md:hidden w-full h-auto bg-white shadow-customShadow rounded-full cursor-pointer">
                <SearchSmallScreen />
              </div>
            </div>

            {/* 3rd Column */}
            <div className="hidden md:flex flex-1 justify-end">
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
