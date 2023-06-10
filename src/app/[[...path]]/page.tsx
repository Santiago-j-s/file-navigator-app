import { homedir } from "os";
import { join } from "path";
import { Directory } from "./components/Directory";
import { File } from "./components/File";
import { HideFilesButton } from "./components/HideFilesButton";
import { FilesProvider } from "./filesContext";
import { getFileType } from "./services";

interface PageProps {
  params: {
    path: string[];
  };
}

export default async function Page({ params }: PageProps) {
  const { path } = params;

  const currentPath = join(
    homedir(),
    decodeURIComponent(path?.join("/") ?? [])
  );
  const fileType = await getFileType(currentPath);

  let content: React.ReactNode;
  switch (fileType) {
    case "unknown":
      content = (
        <div className="flex flex-col bg-white rounded-md shadow-md">
          <div className="flex items-center justify-center flex-1 p-8 text-gray-800">
            <p className="text-2xl font-bold">File not found</p>
          </div>
        </div>
      );
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
    <FilesProvider>
      <main className="flex flex-col min-h-screen h-full p-8 bg-gray-50 gap-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-bold text-gray-800">
            File Navigator App
          </h1>
          <div className="px-4 py-2 font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700">
            {currentPath.replace(homedir(), "~")}
          </div>
        </div>
        {fileType === "directory" && <HideFilesButton />}
        {content}
      </main>
    </FilesProvider>
  );
}
