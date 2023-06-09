"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type Dispatch,
} from "react";

import { usePathname } from "next/navigation";

export interface FilesState {
  filter: string;
}

export type FilesAction = { type: "FILTER"; payload: string };

const initialState: FilesState = {
  filter: "",
};

const FilesContext = createContext<{
  state: FilesState;
  dispatch: Dispatch<FilesAction>;
} | null>(null);

function filesReducer(state: FilesState, action: FilesAction): FilesState {
  switch (action.type) {
    case "FILTER": {
      return { ...state, filter: action.payload };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

interface FilesProviderProps {
  showHiddenFiles?: boolean;
  showItemsAs?: "list" | "grid";
  size?: "small" | "medium" | "large";
  children: React.ReactNode;
}

function FilesProvider({ children }: FilesProviderProps) {
  const [state, dispatch] = useReducer(filesReducer, initialState, () => {
    return { filter: "" };
  });

  /**
   * Reset the filter on navigations.
   */
  const pathname = usePathname();

  useEffect(() => {
    dispatch({ type: "FILTER", payload: "" });
  }, [pathname]);

  // Memoize the context value to prevent unnecessary re-renders
  // in consumers that only use the dispatch and not the state itself.
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <FilesContext.Provider value={value}>{children}</FilesContext.Provider>
  );
}

function useFiles() {
  const context = useContext(FilesContext);

  if (!context) {
    throw new Error("useFiles must be used within a FilesProvider");
  }

  return context;
}

export { FilesProvider, useFiles };
