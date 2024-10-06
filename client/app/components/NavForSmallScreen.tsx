"use client";

import { IoHome } from "react-icons/io5";
import { SafeUser } from "../types";
import Container from "./Container";
import { AiFillHeart } from "react-icons/ai";
import { BiTrip } from "react-icons/bi";
import { FaCircleUser, FaRegMessage } from "react-icons/fa6";
import ButtonForSmallScreen from "./ButtonForSmallScreen"; // Import the reusable button
import { useRouter } from "next/navigation";

interface NavForSmallScreenProps {
  currentUser?: SafeUser | null;
}

const NavForSmallScreen: React.FC<NavForSmallScreenProps> = ({ currentUser }) => {
    const router = useRouter();

  return (
    <div className="w-full fixed md:hidden z-20 bg-white border-t-[1px] bottom-0 left-0">
      <Container>
        <div className="flex flex-row items-center justify-between py-2">
          {/* 1st Column */}
          <ButtonForSmallScreen
            label="Home"
            onClick={() => router.push("/")} // Replace with actual navigation logic
            icon={IoHome}
          />
          {/* 2nd Column */}
          <ButtonForSmallScreen
            label="Favorites"
            onClick={() => router.push("/favorites")}
            icon={AiFillHeart}
          />
          {/* 3rd Column */}
          <ButtonForSmallScreen
            label="Trips"
            onClick={() => router.push("/trips")}
            icon={BiTrip}
          />
          {/* 4th Column */}
          <ButtonForSmallScreen
            label="Messages"
            onClick={() => console.log("Messages clicked")}
            icon={FaRegMessage}
          />
          {/* 5th Column */}
          <ButtonForSmallScreen
            label="Profile"
            onClick={() => console.log("Profile clicked")}
            icon={FaCircleUser}
          />
        </div>
      </Container>
    </div>
  );
};

export default NavForSmallScreen;
