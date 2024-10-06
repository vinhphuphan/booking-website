"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();
    return ( 
        <Image 
            onClick={() => router.push('/')}
            alt="logo"
            height={100}
            width={100}
            className="hidden md:block cursor-pointer md:w-12 md:h-12"
            src="/new-logo.png"
        />
    );
}
 
export default Logo;