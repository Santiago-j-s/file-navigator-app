"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

import { usePathname } from "next/navigation";

const FilesContext = createContext<{
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
} | null>(null);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filter, setFilter] = useState(() => "");

  /**
   * Reset the filter on navigations.
   */
  const pathname = usePathname();

  useEffect(() => {
    setFilter("");
  }, [pathname]);

  return (
    <FilesContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilesContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilesContext);

  if (!context) {
    throw new Error("useFiles must be used within a FilesProvider");
  }

  return context;
}
