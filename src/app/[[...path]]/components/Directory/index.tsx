"use client";

import type { FileData } from "@/app/fs/getFileData";
import { useFilter } from "../../../context/filterContext";
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
  const { filter } = useFilter();

  const filteredFiles = files.filter((file) => {
    if (!filter) return true;

    return file.name.toLowerCase().includes(filter.toLowerCase());
  });

  const fileItems = filteredFiles.map((file) => (
    <FileItem
      key={file.fullpath}
      file={file}
      size={size}
      showHiddenFiles={showHiddenFiles}
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
    <ul className="flex flex-col rounded-md shadow-md gap-2">{fileItems}</ul>
  );
}
