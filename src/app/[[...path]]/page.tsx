import clsx from "clsx";
import { readFile } from "fs/promises";
import Image from "next/image";
import Link from "next/link";
import { homedir } from "os";
import Icon from "../icons/Icon";
import {
  getFileData,
  getFileType,
  getFiles,
  getPath,
  imageExtensions,
  textExtensions,
  videoExtensions,
} from "../services";

type FileItemProps = Awaited<ReturnType<typeof getFileData>>;

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

async function Directory({ currentPath }: DirectoryProps) {
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
            extension={file.extension}
            mimeType={file.mimeType}
          />
        ))}
      </ul>
    </div>
  );
}

function Unknown() {
  return (
    <div className="flex flex-col bg-white rounded-md shadow-md">
      <div className="flex items-center justify-center flex-1 p-8 text-gray-800">
        <p className="text-2xl font-bold">File not found</p>
      </div>
    </div>
  );
}

async function TextFile({ currentPath }: { currentPath: string }) {
  const content = await readFile(currentPath, "utf-8");

  return (
    <pre>
      <code>{content}</code>
    </pre>
  );
}

function ImageFile({ currentPath }: { currentPath: string }) {
  return (
    <div className="w-full h-full relative">
      <Image
        src={`/image?path=${currentPath}`}
        style={{ objectFit: "contain" }}
        alt=""
        fill
      />
    </div>
  );
}

function VideoFile({
  currentPath,
  mimeType,
}: {
  currentPath: string;
  mimeType: string | null;
}) {
  if (!mimeType) {
    throw new Error(`Mime type not found: ${currentPath}`);
  }

  return (
    <div className="w-full h-full relative">
      <video controls>
        <source src={`/video?path=${currentPath}`} type={mimeType} />
      </video>
    </div>
  );
}

interface FileProps {
  currentPath: string;
}

async function File({ currentPath }: FileProps) {
  const dir = currentPath.split("/").slice(0, -1).join("/");
  const filename = currentPath.split("/").pop();

  if (!filename) {
    throw new Error(`Filename not found: ${currentPath}`);
  }

  const file = await getFileData(dir, filename);

  return (
    <>
      {textExtensions.has(file.extension ?? "") ? (
        /** @ts-expect-error */
        <TextFile currentPath={currentPath} />
      ) : imageExtensions.has(file.extension ?? "") ? (
        <ImageFile currentPath={currentPath} />
      ) : videoExtensions.has(file.extension ?? "") ? (
        <VideoFile currentPath={currentPath} mimeType={file.mimeType} />
      ) : (
        <pre>
          <code>file: {JSON.stringify(file, null, 2)}</code>
        </pre>
      )}
    </>
  );
}

interface PageProps {
  params: {
    path: string[];
  };
}

export default async function Page({ params }: PageProps) {
  const { path } = params;

  const currentPath = getPath(path ?? []);
  const fileType = await getFileType(currentPath);

  let content: React.ReactNode;
  switch (fileType) {
    case "unknown":
      content = <Unknown />;
      break;
    case "file":
      // @ts-expect-error
      content = <File currentPath={currentPath} />;
      break;
    case "directory":
      // @ts-expect-error
      content = <Directory currentPath={currentPath} />;
      break;
  }

  return (
    <main className="flex flex-col min-h-screen h-full p-8 bg-gray-50">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-4xl font-bold text-gray-800">File Navigator App</h1>
        <div className="px-4 py-2 font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700">
          {currentPath?.length > 0
            ? currentPath.replace(homedir(), "~")
            : "Home"}
        </div>
      </div>
      {content}
    </main>
  );
}
