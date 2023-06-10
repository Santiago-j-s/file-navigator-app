"use client";

import Icon from "@/app/icons/Icon";
import { useFiles } from "../../filesContext";

export function Buttons() {
  const { state, dispatch } = useFiles();

  return (
    <div className="flex gap-2">
      <button
        className="flex items-center gap-1 text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md w-fit"
        title={
          state.showHiddenFiles ? "Hide hidden files" : "Show hidden files"
        }
        onClick={() =>
          dispatch({
            type: "SHOW_HIDDEN_FILES",
            payload: !state.showHiddenFiles,
          })
        }
      >
        <Icon
          name={state.showHiddenFiles ? "eye-slash" : "eye"}
          className="w-5 h-5"
        />
      </button>
      <button
        className="flex items-center gap-1 text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md w-fit"
        title={
          state.showItemsAs === "grid"
            ? "View items as list"
            : "View items as grid"
        }
        onClick={() =>
          dispatch({
            type: "SHOW_ITEMS_AS",
            payload: state.showItemsAs === "grid" ? "list" : "grid",
          })
        }
      >
        <Icon
          name={state.showItemsAs === "grid" ? "list" : "grid"}
          className="w-5 h-5"
        />
      </button>
    </div>
  );
}
