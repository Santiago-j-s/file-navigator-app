import clsx from "clsx";
import { readdir } from "fs/promises";
import Link from "next/link";
import Icon from "../../icons/Icon";
import { getFileData } from "../services";

export async function getFiles(path: string) {
  const files = await readdir(path);

  const filesWithTypes = await Promise.all(
    files.map((file) => getFileData(path, file))
  );

  return filesWithTypes;
}

type FileItemProps = Pick<
  Awaited<ReturnType<typeof getFileData>>,
  "name" | "access" | "hidden" | "type" | "path"
>;

function FileItem({ name, access, hidden, type, path }: FileItemProps) {
  return (
    <Link href={path}>
      <li
        className={clsx(
          access && "cursor-pointer hover:bg-gray-100",
          hidden && "opacity-50"
        )}
      >
        <div className="flex items-center px-4 py-2">
          <span className="text-gray-800 mr-auto">{name}</span>
          <span className="flex text-sm text-gray-500">
            <Icon
              name={access ? "lock-open" : "lock-closed"}
              className="text-gray-500 mr-2"
            />
            <Icon
              name={type === "directory" ? "folder" : "file"}
              className="text-gray-500 mr-2"
            />
          </span>
        </div>
      </li>
    </Link>
  );
}

interface DirectoryProps {
  path: string[];
  currentPath: string;
}

export async function Directory({ currentPath }: DirectoryProps) {
  const files = await getFiles(currentPath);

  const filesToShow = files.filter((file) => !file.hidden);

  return (
    <div className="flex flex-col bg-white rounded-md shadow-md">
      <ul className="divide-y divide-gray-200">
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
