'use client';

import { PuffLoader } from "react-spinners";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
const Loader = () => {
  const pathName = usePathname();
  const [isListingPage, SetIsListingPage] = useState(false);

  useEffect(() => {
    const currentPath = pathName ?? "";
    const listingPathPattern = /^\/listings\/[a-zA-Z0-9]+$/;
    SetIsListingPage(listingPathPattern.test(currentPath));
  }, [pathName]);

  return (
    <div className={`${isListingPage ? "h-[70vh]" : "h-[90vh]"} flex flex-col justify-center items-center`}>
      <PuffLoader 
        size={60}
        color="red"
      />
    </div>
  )
}

export default Loader;
