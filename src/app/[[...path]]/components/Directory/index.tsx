"use client";

import { useFiles } from "../../../context/filesContext";
import type { FileData } from "../../services";
import { FileItem } from "./FileItem";

interface DirectoryProps {
  files: Awaited<Awaited<FileData>[]>;
  size: "small" | "medium" | "large";
  showItemsAs: "list" | "grid";
  showHiddenFiles: boolean;
}

export function Directory({
  files,
  size,
  showItemsAs,
  showHiddenFiles,
}: DirectoryProps) {
  const { state } = useFiles();

  const filteredFiles = files.filter((file) => {
    if (!state.filter) return true;

    return file.name.toLowerCase().includes(state.filter.toLowerCase());
  });

  const fileItems = filteredFiles.map((file) => (
    <FileItem
      key={file.fullpath}
      {...file}
      size={size}
      showHiddenFiles={showHiddenFiles}
      showItemsAs={showItemsAs}
    />
  ));

  if (showItemsAs === "grid") {
    return (
      <ul className="grid grid-cols-5 gap-4 p-4 shadow-md rounded-md">
        {fileItems}
      </ul>
    );
  }

  return (
    <div className="flex flex-col bg-white rounded-md shadow-md">
      <ul>{fileItems}</ul>
    </div>
  );
}
