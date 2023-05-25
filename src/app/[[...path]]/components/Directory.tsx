import clsx from "clsx";
import { readdir } from "fs/promises";
import Link from "next/link";
import Icon from "../../icons/Icon";
import { getFileData } from "../services";

type LinkWrapperProps = Pick<
  Awaited<ReturnType<typeof getFileData>>,
  "access" | "path"
> & { children: React.ReactNode };

function LinkWrapper({ path, access, children }: LinkWrapperProps) {
  if (access) {
    return <Link href={path}>{children}</Link>;
  }

  return <>{children}</>;
}

type FileItemProps = Pick<
  Awaited<ReturnType<typeof getFileData>>,
  "name" | "access" | "hidden" | "type" | "path"
>;

function FileItem({ name, access, hidden, type, path }: FileItemProps) {
  return (
    <li
      className={clsx(
        "hover:bg-gray-100",
        !access && "cursor-not-allowed opacity-50",
        hidden && "opacity-50"
      )}
    >
      <LinkWrapper access={access} path={path}>
        <div className="flex items-center px-4 py-2">
          <span className="mr-auto flex text-gray-800">
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

interface DirectoryProps {
  path: string[];
  currentPath: string;
}

export async function Directory({ currentPath }: DirectoryProps) {
  const files = await readdir(currentPath);

  const filesWithTypes = await Promise.all(
    files.map((file) => getFileData(currentPath, file))
  );

  const filesToShow = filesWithTypes.filter((file) => !file.hidden);

  return (
    <div className="flex flex-col bg-white rounded-md shadow-md">
      <ul>
        {filesToShow.map((file) => (
          <FileItem
            key={file.path}
            name={file.name}
            access={file.access}
            hidden={file.hidden}
            type={file.type}
            path={file.path}
          />
        ))}
      </ul>
    </div>
  );
}
