'use client';

import { createContext, useCallback, useEffect, useState, ReactNode, useContext } from "react";

// Create the context
const ScrollContext = createContext<{
  scrolled: boolean;
  setScrolled: (value: boolean) => void; // Include setScrolled in the context
}>({
  scrolled: false,
  setScrolled: () => {} // Provide a no-op function as default
});

// ScrollProvider component that tracks the scroll and provides the context
export const ScrollProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    if (window.scrollY > 30) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <ScrollContext.Provider value={{ scrolled, setScrolled }}>
      {children}
    </ScrollContext.Provider>
  );
};

// Custom hook to use the scroll state and setScrolled function in any component
export const useScroll = () => {
  return useContext(ScrollContext);
};
