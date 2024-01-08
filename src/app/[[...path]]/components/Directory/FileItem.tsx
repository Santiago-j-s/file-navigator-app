"use client";

import { formatBytes } from "@/app/fs/formatBytes";
import type { FileData } from "@/app/fs/getFileData";
import Icon from "@/app/icons/Icon";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

type LinkWrapperProps = Pick<Awaited<FileData>, "access" | "path"> & {
  children: React.ReactNode;
};

export function LinkWrapper({ path, access, children }: LinkWrapperProps) {
  const className = cn(
    "flex items-center space-x-3 w-full overflow-hidden truncate",
    !access && "cursor-not-allowed opacity-50"
  );

  if (access) {
    return (
      <Link href={path} className={className}>
        {children}
      </Link>
    );
  }

  return <div className={className}>{children}</div>;
}

type FileItemProps = {
  size: "small" | "medium" | "large";
  showHiddenFiles: boolean;
  file: Awaited<FileData>;
};

export function FileItem({ file, size, showHiddenFiles }: FileItemProps) {
  if (showHiddenFiles === false && file.hidden) {
    return null;
  }

  const isImage = file.type === "file" && file.openAs === "image";

  return (
    <li
      title={`${file.type === "directory" ? "Directory" : "File"}: ${
        file.name
      }`}
    >
      <LinkWrapper access={file.access} path={file.path}>
        {isImage ? (
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
              style={{ objectFit: "contain" }}
              alt=""
              fill
            />
          </div>
        ) : (
          <Icon
            name={file.type === "directory" ? "folder" : "file"}
            size={size}
            className={clsx("text-gray-500")}
          />
        )}

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
        </div>
      </LinkWrapper>
    </li>
  );
}
