import clsx from "clsx";
import Link from "next/link";
import Icon from "../icons/Icon";
import {
  FileType,
  MyFile,
  getFile,
  getFileType,
  getFiles,
  getPath,
  imageExtensions,
  textExtensions,
} from "../services";

interface DirectoryItemProps {
  name: string;
  access: boolean;
  hidden: boolean;
  type: FileType;
  path: string;
}

function FileItem({ name, access, hidden, type, path }: DirectoryItemProps) {
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

interface WrapperProps {
  path: string[];
  children: React.ReactNode;
}

function Wrapper({ path, children }: WrapperProps) {
  return (
    <main className="flex flex-col min-h-screen p-8 bg-gray-50">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-4xl font-bold text-gray-800">File Navigator App</h1>
        <div className="px-4 py-2 font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700">
          {path?.length > 0 ? path.join(" / ") : "Home"}
        </div>
      </div>
      {children}
    </main>
  );
}

interface DirectoryProps {
  path: string[];
  currentPath: string;
}

async function Directory({ path, currentPath }: DirectoryProps) {
  const files = await getFiles(currentPath);

  const filesToShow = files.filter((file) => !file.hidden);

  return (
    <Wrapper path={path}>
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
    </Wrapper>
  );
}

interface UnknownProps {
  path: string[];
}

function Unknown({ path }: UnknownProps) {
  return (
    <Wrapper path={path}>
      <div className="flex flex-col bg-white rounded-md shadow-md">
        <div className="flex items-center justify-center flex-1 p-8 text-gray-800">
          <p className="text-2xl font-bold">File not found</p>
        </div>
      </div>
    </Wrapper>
  );
}

function TextFile({ file }: { file: MyFile & { content: string } }) {
  return (
    <pre>
      <code>{file.content}</code>
    </pre>
  );
}

function ImageFile({ file }: { file: MyFile & { content: string } }) {
  return <img src={`data:image/${file.extension};base64,${file.content}`} />;
}

interface FileProps {
  path: string[];
  currentPath: string;
}

async function File({ path, currentPath }: FileProps) {
  const dir = currentPath.split("/").slice(0, -1).join("/");
  const filename = currentPath.split("/").pop();

  if (!filename) {
    throw new Error(`Filename not found: ${currentPath}`);
  }

  const file = await getFile(dir, filename);

  return (
    <Wrapper path={path}>
      <div className="flex flex-col bg-white rounded-md shadow-md">
        <div className="flex items-center justify-center flex-1 p-8 text-gray-800">
          <p className="text-2xl font-bold">File</p>
        </div>
      </div>
      {textExtensions.has(file.extension ?? "") && file.content ? (
        <TextFile file={file} />
      ) : imageExtensions.has(file.extension ?? "") && file.content ? (
        <ImageFile file={file} />
      ) : (
        <pre>
          <code>file: {JSON.stringify(file, null, 2)}</code>
        </pre>
      )}
    </Wrapper>
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

  switch (fileType) {
    case "unknown":
      return <Unknown path={path} />;
    case "file":
      // @ts-expect-error
      return <File path={path} currentPath={currentPath} />;
    case "directory":
      // @ts-expect-error
      return <Directory path={path} currentPath={currentPath} />;
  }
}
