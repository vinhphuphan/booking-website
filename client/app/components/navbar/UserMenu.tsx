"use client";

import { AiOutlineMenu } from "react-icons/ai";
import { GrLanguage } from "react-icons/gr";
import Avatar from "../Avatar";
import { useCallback, useEffect, useRef, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";
import useRentModal from "@/app/hooks/useRentModal";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, [setIsOpen]);

  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      // Check if the click is outside the menu and button
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    },
    [isOpen]
  );

  const openRegisterModal = useCallback(() => {
    if (isOpen) {
      toggleOpen(); // Close the menu
    }
    registerModal.onOpen();
  }, [isOpen, toggleOpen, registerModal]);

  const openLoginModal = useCallback(() => {
    if (isOpen) {
      toggleOpen(); // Close the menu
    }
    loginModal.onOpen();
  }, [isOpen, toggleOpen, loginModal]);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    // Open Rent Modal
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  const onLogOut = useCallback(() => {
    signOut();
    toast.success("Logged out successfully");
    router.push("/");
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center">
        <div
          onClick={onRent}
          className="hidden xl:block px-4 py-3 rounded-full hover:bg-neutral-100 transition text-sm font-semibold cursor-pointer"
        >
          List Your Accommodation
        </div>
        <div className="hidden xl:block p-4 mr-1 rounded-full hover:bg-neutral-100 transition text-sm font-semibold cursor-pointer">
          <GrLanguage size={16} />
        </div>
        <div
          ref={buttonRef}
          onClick={toggleOpen}
          className="flex flex-row items-center gap-3 p-2 rounded-full border-[1px] hover:shadow-lg transition cursor-pointer"
        >
          <AiOutlineMenu size={17} />
          <Avatar src={currentUser?.image} />
        </div>
      </div>
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute top-14 right-0 z-50 w-[30vw] lg:w-[80%] bg-white shadow-xl border-[1px] rounded-xl overflow-hidden"
        >
          <div className="flex flex-col">
            {currentUser ? (
              <>
                <MenuItem label="Trips" onClick={() => router.push("/trips")} />
                <MenuItem
                  label="Favorites"
                  onClick={() => router.push("/favorites")}
                />
                <hr />
                <MenuItem label="List Your Accommodation" onClick={rentModal.onOpen} />
                <MenuItem
                  label="Manage properties"
                  onClick={() => router.push("/properties")}
                />
                <hr />
                <MenuItem label="Gift cards" onClick={() => {}} />
                <MenuItem label="Help center" onClick={() => {}} />
                <MenuItem label="Log out" onClick={() => onLogOut()} />
              </>
            ) : (
              <>
                <MenuItem label="Sign up" onClick={openRegisterModal} />
                <MenuItem label="Log in" onClick={openLoginModal} />
                <hr />
                <MenuItem label="Gift cards" onClick={() => {}} />
                <MenuItem label="List Your Accommodation" onClick={() => {}} />
                <MenuItem label="Help center" onClick={() => {}} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
