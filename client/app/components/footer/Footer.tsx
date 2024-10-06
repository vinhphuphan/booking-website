"use client";

import { GrLanguage } from "react-icons/gr";
import Container from "../Container";
import { IoChevronDown } from "react-icons/io5";
import { usePathname } from "next/navigation";
import Icon from "./Icon";

const Footer = () => {
  const pathName = usePathname();
  const isListingPage = /^\/listings\/[a-zA-Z0-9]+$/.test(pathName);


  return (
    <div className="block w-full bg-[#F7F7F7] transition">
      <div
        className={`h-auto px-0 ${isListingPage ? "lg:px-28" : ""}`}
      >
        <Container>
          <div className="flex flex-col">
            <div className="flex flex-col md:flex-row pt-12">
              <div className="flex-1 flex-col py-4 border-b-[1px] border-neutral-300 md:border-[#F7F7F7]">
                <div className="text-sm md:text-base mb-3 font-semibold">
                  Support
                </div>
                <div className="text-sm md:text-base mb-3 font-normal hover:underline cursor-pointer">
                  Help Centre
                </div>
                <div className="text-sm md:text-base mb-3 font-normal hover:underline cursor-pointer">
                  Get help with a safety issue
                </div>
                <div className="text-sm md:text-base mb-3 font-normal hover:underline cursor-pointer">
                  Cover
                </div>
                <div className="text-sm md:text-base mb-3 font-normal hover:underline cursor-pointer">
                  Anti-discrimination
                </div>
                <div className="text-sm md:text-base mb-3 font-normal hover:underline cursor-pointer">
                  Disability supportport
                </div>
                <div className="text-sm md:text-base mb-3 font-normal hover:underline cursor-pointer">
                  Cancellation options
                </div>
                <div className="text-sm md:text-base mb-3 font-normal hover:underline cursor-pointer">
                  Report neighbourhood concern
                </div>
              </div>

              <div className="flex-1 flex-col py-8 md:py-4 border-b-[1px] border-neutral-300 md:border-[#F7F7F7]">
                <div className="text-sm md:text-base mb-3 font-semibold">
                  Hosting
                </div>
                <div className="text-sm md:text-base mb-3 font-normal hover:underline cursor-pointer">
                  List your accommodation
                </div>
                <div className="text-sm md:text-base mb-3 font-normal hover:underline cursor-pointer">
                  Cover for Hosts
                </div>
                <div className="text-sm md:text-base mb-3 font-normal hover:underline cursor-pointer">
                  Hosts Resources
                </div>
                <div className="text-sm md:text-base mb-3 font-normal hover:underline cursor-pointer">
                  Community forum
                </div>
                <div className="text-sm md:text-base mb-3 font-normal hover:underline cursor-pointer">
                  Hosting responsibly
                </div>
                <div className="text-sm md:text-base mb-3 font-normal hover:underline cursor-pointer">
                  Join a free Hosting class
                </div>
              </div>

              <div className="flex-1 flex-col pt-8 pb-4 md:py-4 border-b-[1px] border-neutral-300 md:border-[#F7F7F7]">
                <div className="text-sm md:text-base mb-3 font-semibold">
                  Hotel Booking News
                </div>
                <div className="text-sm md:text-base mb-3 font-normal hover:underline cursor-pointer">
                  About
                </div>
                <div className="text-sm md:text-base mb-3 font-normal hover:underline cursor-pointer">
                  New features
                </div>
                <div className="text-sm md:text-base mb-3 font-normal hover:underline cursor-pointer">
                  Careers
                </div>
                <div className="text-sm md:text-base mb-3 font-normal hover:underline cursor-pointer">
                  Investor
                </div>
                <div className="text-sm md:text-base mb-3 font-normal hover:underline cursor-pointer">
                  Gift cards
                </div>
                <div className="text-sm md:text-base mb-3 font-normal hover:underline cursor-pointer">
                  Emergency stays
                </div>
                <div className="text-sm md:text-base mb-3 font-normal hover:underline cursor-pointer">
                  Reconciliation Hub
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-2 md:gap-0 md:flex-row items-start md:items-center justify-start md:justify-between">
              {/* Left Footer */}
              <div className="flex flex-col md:flex-row gap-1 md:gap-5">
                <div className="flex flex-row gap-5 text-sm md:text-base text-neutral-800">
                  © 2024 Hotel Booking
                </div>
                {/* Links Container */}
                <div className="flex flex-row gap-5 text-sm md:text-base text-neutral-800">
                  <div className="hover:underline">Privacy</div>
                  <div className="hover:underline">Term</div>
                  <div className="hover:underline">Sitemap</div>
                </div>
              </div>

              {/* Right Footer */}
              <div className="flex flex-row gap-3 md:gap-6 pt-6 pb-3 md:py-6">
                <div className="flex flex-row gap-2 text-neutral-800">
                  <div className="flex items-center justify-center">
                    <GrLanguage />
                  </div>
                  <div className="flex items-center text-sm md:text-base font-semibold hover:underline cursor-pointer">
                    English
                  </div>
                </div>

                <div className="flex flex-row gap-1 text-neutral-800">
                  <div className="flex items-center justify-center font-semibold">
                    $
                  </div>
                  <div className="flex items-center text-sm md:text-base font-semibold hover:underline cursor-pointer">
                    USD
                  </div>
                </div>

                <div className="hidden md:flex flex-row gap-4 text-neutral-800">
                  <Icon
                    type="twitter"
                    size={18}
                    color="currentColor"
                    ariaLabel="Navigate to Twitter"
                    url="https://x.com/"
                  />
                  <Icon
                    type="instagram"
                    size={18}
                    color="currentColor"
                    ariaLabel="Navigate to Instagram"
                    url="https://www.instagram.com/"
                  />
                  <Icon
                    type="facebook"
                    size={18}
                    color="currentColor"
                    ariaLabel="Navigate to Facebook"
                    url="https://www.facebook.com/"
                  />
                </div>
              </div>
            </div>

            <div className="block md:hidden w-full h-20">

            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Footer;
