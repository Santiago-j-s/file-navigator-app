"use client";

import Icon from "@/app/icons/Icon";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import type { FileData } from "../../services";

type LinkWrapperProps = Pick<Awaited<FileData>, "access" | "path"> & {
  children: React.ReactNode;
};

export function LinkWrapper({ path, access, children }: LinkWrapperProps) {
  if (access) {
    return <Link href={path}>{children}</Link>;
  }

  return <>{children}</>;
}

type FileItemProps = Awaited<FileData> & {
  size: "small" | "medium" | "large";
  showHiddenFiles: boolean;
  showItemsAs: "list" | "grid";
};

export function FileItem({
  name,
  access,
  hidden,
  type,
  path,
  fullpath,
  openAs,
  size,
  showHiddenFiles,
  showItemsAs,
}: FileItemProps) {
  if (showHiddenFiles === false && hidden) {
    return null;
  }

  const isImage = type === "file" && openAs === "image";

  return (
    <li
      className={clsx(
        "hover:bg-gray-100 overflow-hidden flex flex-col rounded-md focus-within:bg-gray-100",
        !access && "cursor-not-allowed opacity-50"
      )}
      title={`${type === "directory" ? "Directory" : "File"}: ${name}`}
    >
      <LinkWrapper access={access} path={path}>
        <span
          className={clsx(
            "flex items-center px-2 py-2 m-2 gap-2 overflow-hidden break-all",
            hidden ? "text-gray-600" : "text-gray-700",
            showItemsAs === "grid" && "flex-col",
            showItemsAs === "list" && "mr-auto"
          )}
        >
          {isImage ? (
            <div
              className={clsx(
                "relative",
                size === "small" && "h-6 w-6",
                size === "medium" && "h-10 w-10",
                size === "large" && "w-24 h-24"
              )}
            >
              <Image
                src={`/image?path=${fullpath}`}
                style={{ objectFit: "contain" }}
                alt=""
                fill
              />
            </div>
          ) : (
            <Icon
              name={type === "directory" ? "folder" : "file"}
              size={size}
              className={clsx("text-gray-500")}
            />
          )}
          {name}
        </span>
      </LinkWrapper>
    </li>
  );
}
