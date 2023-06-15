"use client";

import { useFiles } from "../../../filesContext";
import type { FileData } from "../../services";
import { FileItem } from "./FileItem";

interface DirectoryProps {
  files: Awaited<Awaited<FileData>[]>;
}

export function Directory({ files }: DirectoryProps) {
  const { state } = useFiles();

  const filteredFiles = files.filter((file) => {
    if (!state.filter) return true;

    return file.name.toLowerCase().includes(state.filter.toLowerCase());
  });

  const fileItems = filteredFiles.map((file) => (
    <FileItem
      key={file.path}
      name={file.name}
      access={file.access}
      hidden={file.hidden}
      type={file.type}
      path={file.path}
    />
  ));

  if (state.showItemsAs === "grid") {
    return (
      <ul className="grid grid-cols-4 gap-4 p-4 shadow-md rounded-md">
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
