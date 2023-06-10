"use client";

import {
  Dispatch,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from "react";

export interface FilesState {
  showHiddenFiles: boolean;
}

export type FilesAction = { type: "SHOW_HIDDEN_FILES"; payload: boolean };

const initialState: FilesState = {
  showHiddenFiles: false,
};

const FilesContext = createContext<{
  state: FilesState;
  dispatch: Dispatch<FilesAction>;
} | null>(null);

function filesReducer(state: FilesState, action: FilesAction) {
  switch (action.type) {
    case "SHOW_HIDDEN_FILES": {
      return { ...state, showHiddenFiles: action.payload };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

interface FilesProviderProps {
  children: React.ReactNode;
}

function FilesProvider({ children }: FilesProviderProps) {
  const [state, dispatch] = useReducer(filesReducer, initialState);

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