"use client";

import { useFiles } from "@/app/context/filesContext";
import Icon from "@/app/icons/Icon";
import type { FileType } from "../../../fs/getFileType";

interface FormContentProps {
  title: string;
  fileType: FileType;
  size: "small" | "medium" | "large";
  showHiddenFiles: boolean;
  showItemsAs: "list" | "grid";
}

export function FormContent({
  title,
  fileType,
  size,
  showHiddenFiles,
  showItemsAs,
}: FormContentProps) {
  return (
    <>
      <BackButton title={title} />
      <CurrentPath title={title} />
      {fileType === "directory" && (
        <>
          <FilterInput />
          <select
            id="set-size"
            className="px-4 py-2 font-medium text-gray-500 bg-gray-50 rounded-md focus:outline-none focus:outline-gray-400"
            name="size"
            onChange={(event) => {
              if (event.currentTarget.form == null) return;
              event.currentTarget.form.requestSubmit();
            }}
            defaultValue={size}
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
          <button
            className="ml-auto flex items-center gap-1 text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md w-fit"
            title={showHiddenFiles ? "Hide hidden files" : "Show hidden files"}
            name="showHiddenFiles"
            value={showHiddenFiles ? "false" : "true"}
          >
            <Icon
              name={showHiddenFiles ? "eye-slash" : "eye"}
              className="w-5 h-5"
            />
          </button>
          <button
            className="flex items-center gap-1 text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md w-fit"
            title={
              showItemsAs === "grid"
                ? "View items as list"
                : "View items as grid"
            }
            type="submit"
            name="showItemsAs"
            value={showItemsAs === "grid" ? "list" : "grid"}
          >
            <Icon
              name={showItemsAs === "grid" ? "list" : "grid"}
              className="w-5 h-5"
            />
          </button>
        </>
      )}
    </>
  );
}

function CurrentPath({ title }: { title: string }) {
  return (
    <div className="px-4 py-2 font-medium text-gray-500 bg-gray-50 rounded-md">
      {title}
    </div>
  );
}

function BackButton({ title }: { title: string }) {
  return (
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
  );
}

function FilterInput() {
  const { dispatch } = useFiles();

  return (
    <input
      type="text"
      className="px-4 py-2 flex-1 font-medium text-gray-500 bg-gray-50 rounded-md focus:outline-none focus:outline-gray-400"
      placeholder="Filter"
      onChange={(event) => {
        dispatch({ type: "FILTER", payload: event.target.value });
      }}
    />
  );
}
