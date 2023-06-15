"use client";

import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useEffect,
  type Dispatch,
} from "react";

import { usePathname } from "next/navigation";

export interface FilesState {
  showHiddenFiles: boolean;
  showItemsAs: "list" | "grid";
  filter: string;
}

export type FilesAction =
  | { type: "SHOW_HIDDEN_FILES"; payload: boolean }
  | { type: "SHOW_ITEMS_AS"; payload: "list" | "grid" }
  | { type: "FILTER"; payload: string };

const initialState: FilesState = {
  showHiddenFiles: false,
  showItemsAs: "list",
  filter: "",
};

const FilesContext = createContext<{
  state: FilesState;
  dispatch: Dispatch<FilesAction>;
} | null>(null);

function filesReducer(state: FilesState, action: FilesAction): FilesState {
  switch (action.type) {
    case "SHOW_HIDDEN_FILES": {
      return { ...state, showHiddenFiles: action.payload };
    }

    case "SHOW_ITEMS_AS": {
      return { ...state, showItemsAs: action.payload };
    }

    case "FILTER": {
      return { ...state, filter: action.payload };
    }

    default: {
      // @ts-expect-error
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

interface FilesProviderProps {
  children: React.ReactNode;
}

function FilesProvider({ children }: FilesProviderProps) {
  const [state, dispatch] = useReducer(filesReducer, initialState);

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
