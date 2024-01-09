"use client";

import type { FileData } from "@/app/fs/getFileData";
import { Table, TableBody } from "@/components/ui/table";
import { useFilter } from "../../../context/filterContext";
import { FileGridItem, FileListItem } from "./FileItem";

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

  if (showItemsAs === "grid") {
    return (
      <ul className="grid grid-cols-5 gap-4 p-4 shadow-md rounded-md">
        {filteredFiles.map((file) => (
          <FileGridItem
            key={file.fullpath}
            file={file}
            size={size}
            showHiddenFiles={showHiddenFiles}
          />
        ))}
      </ul>
    );
  }

  return (
    <Table>
      <TableBody>
        {filteredFiles.map((file) => (
          <FileListItem
            key={file.fullpath}
            file={file}
            size={size}
            showHiddenFiles={showHiddenFiles}
          />
        ))}
      </TableBody>
    </Table>
  );
}
