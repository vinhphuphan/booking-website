"use client";

import Image from "next/image";

interface AvatarProps {
  src?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      alt="avatar"
      height={30}
      width={30}
      className="rounded-full hidden md:block"
      src={src || "/placeholder.jpg"}
    />
  );
};

export default Avatar;
