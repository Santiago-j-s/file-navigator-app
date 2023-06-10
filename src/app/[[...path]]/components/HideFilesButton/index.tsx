"use client";

import Icon from "@/app/icons/Icon";
import { useFiles } from "../../filesContext";

export function HideFilesButton() {
  const { state, dispatch } = useFiles();

  const handleClick = () => {
    dispatch({ type: "SHOW_HIDDEN_FILES", payload: !state.showHiddenFiles });
  };

  return (
    <button
      className="flex items-center gap-1 text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md w-fit"
      onClick={handleClick}
    >
      <Icon
        name={state.showHiddenFiles ? "eye-slash" : "eye"}
        className="w-5 h-5"
      />
      {state.showHiddenFiles ? "Hide" : "Show"}
    </button>
  );
}
