"use client";

import Icon from "@/app/icons/Icon";
import { useFiles } from "../../../filesContext";
import type { FileType } from "../../services";

interface ActionBarProps {
  title: string;
  fileType: FileType;
}

export function ActionBar({ title, fileType }: ActionBarProps) {
  const { state, dispatch } = useFiles();

  return (
    <div className="flex gap-2">
      <button
        disabled={title === "~"}
        className="flex items-center gap-1 text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md w-fit disabled:bg-gray-100 disabled:text-gray-300"
        title="Go back"
        onClick={() => {
          window.history.back();
        }}
      >
        <Icon name="arrow-left" className="w-5 h-5" />
      </button>
      <div className="px-4 py-2 font-medium text-gray-500 bg-gray-50 rounded-md">
        {title}
      </div>
      {fileType === "directory" && (
        <>
          <input
            type="text"
            className="px-4 py-2 flex-1 font-medium text-gray-500 bg-gray-50 rounded-md focus:outline-none focus:outline-gray-400"
            placeholder="Filter"
            onChange={(event) => {
              dispatch({ type: "FILTER", payload: event.target.value });
            }}
          />
          <button
            className="ml-auto flex items-center gap-1 text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md w-fit"
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
        </>
      )}
    </div>
  );
}
