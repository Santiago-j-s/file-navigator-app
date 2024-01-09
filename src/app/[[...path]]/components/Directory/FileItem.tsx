"use client";

import { formatBytes } from "@/app/fs/formatBytes";
import type { FileData } from "@/app/fs/getFileData";
import Icon from "@/app/icons/Icon";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type LinkWrapperProps = Pick<Awaited<FileData>, "access" | "path"> & {
  className?: string;
  children: React.ReactNode;
};

function LinkWrapper({ path, access, children, className }: LinkWrapperProps) {
  if (access) {
    return (
      <Link href={path} className={className}>
        {children}
      </Link>
    );
  }

  return <div className={className}>{children}</div>;
}

interface FileImageProps {
  file: Awaited<FileData>;
  size: "small" | "medium" | "large";
}

function FileIcon({ file, size }: FileImageProps) {
  if (file.type === "file" && file.openAs === "image") {
    return (
      <div
        className={cn(
          "relative border-white",
          size === "small" && "h-6 w-6 border",
          size === "medium" && "h-10 w-10 border-2",
          size === "large" && "w-24 h-24 border-4"
        )}
      >
        <Image
          src={`/image?path=${file.fullpath}`}
          alt=""
          className="object-contain"
          fill
        />
      </div>
    );
  }

  return (
    <Icon
      name={file.type === "directory" ? "folder" : "file"}
      size={size}
      className="text-gray-500"
    />
  );
}

type FileItemProps = {
  size: "small" | "medium" | "large";
  showHiddenFiles: boolean;
  file: Awaited<FileData>;
};

export function FileGridItem({ file, size, showHiddenFiles }: FileItemProps) {
  if (showHiddenFiles === false && file.hidden) {
    return null;
  }

  return (
    <li
      title={`${file.type === "directory" ? "Directory" : "File"}: ${
        file.name
      }`}
    >
      <LinkWrapper
        access={file.access}
        path={file.path}
        className={cn(
          "flex items-center space-x-3 w-full overflow-hidden truncate",
          !file.access && "cursor-not-allowed opacity-50"
        )}
      >
        <FileIcon file={file} size={size} />

        <div className="w-full truncate">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
            {file.name}
          </p>
          <p
            className="text-sm text-gray-500 dark:text-gray-400 truncate"
            title={`${file.size} bytes`}
          >
            {file.type === "directory"
              ? `${file.numberOfItems} files`
              : file.size
              ? formatBytes(file.size)
              : null}
          </p>
          {file.birthDate && (
            <p className="text-xs text-gray-500">
              Created:{" "}
              {file.birthDate.toLocaleDateString("es-AR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
          )}
        </div>
      </LinkWrapper>
    </li>
  );
}

export function FileListItem({ file, size, showHiddenFiles }: FileItemProps) {
  if (showHiddenFiles === false && file.hidden) {
    return null;
  }

  return (
    <TableRow
      className="relative"
      title={`${file.type === "directory" ? "Directory" : "File"}: ${
        file.name
      }`}
    >
      <TableCell>
        <FileIcon file={file} size={size} />
      </TableCell>
      <TableCell>
        <LinkWrapper
          path={file.path}
          access={file.access}
          className="after:content-[''] after:block after:absolute after:inset-0 after:w-full"
        >
          {file.name}
        </LinkWrapper>
      </TableCell>
      <TableCell>
        {file.size && file.type === "file" ? formatBytes(file.size) : "--"}
      </TableCell>
      <TableCell>
        {file.type === "file" && file.mimeType
          ? file.mimeType
          : file.type === "directory"
          ? "Folder"
          : "--"}
      </TableCell>
      <TableCell>
        {file.lastModifiedDate?.toLocaleDateString("es-AR", {
          dateStyle: "long",
        })}
      </TableCell>
    </TableRow>
  );
}
