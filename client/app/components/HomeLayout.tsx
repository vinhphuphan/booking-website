"use client";
import { useScroll } from "../context/ScrollContext";

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <div
      className={`
      pt-40
      md:pt-56
      grid
      grid-cols-2  
      md:grid-cols-3 
      lg:grid-cols-4
      gap-8
    `}
    >
      {children}
    </div>
  );
};

export default HomeLayout;
