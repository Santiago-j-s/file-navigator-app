"use client";

import clsx from "clsx";
import Link from "next/link";
import Icon from "../../../icons/Icon";
import { useFiles } from "../../filesContext";
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

type FileItemProps = Pick<
  Awaited<FileData>,
  "name" | "access" | "hidden" | "type" | "path"
>;

export function FileItem({ name, access, hidden, type, path }: FileItemProps) {
  const { state } = useFiles();

  if (state.showHiddenFiles === false && hidden) {
    return null;
  }

  return (
    <li
      className={clsx(
        "hover:bg-gray-100 overflow-hidden",
        !access && "cursor-not-allowed opacity-50"
      )}
      title={`${type === "directory" ? "Directory" : "File"}: ${name}`}
    >
      <LinkWrapper access={access} path={path}>
        <div className="flex items-center px-4 py-2">
          <span
            className={clsx(
              "mr-auto flex",
              hidden ? "text-gray-600" : "text-gray-700"
            )}
          >
            <Icon
              name={type === "directory" ? "folder" : "file"}
              className="text-gray-500 mr-2"
            />
            {name}
          </span>
        </div>
      </LinkWrapper>
    </li>
  );
}
