import { homedir } from "os";
import { join } from "path";
import { Buttons } from "./components/Buttons";
import { Directory } from "./components/Directory";
import { File } from "./components/File";
import { FilesProvider } from "./filesContext";
import { getFileType, getFiles } from "./services";

type PageContentProps =
  | { fileType: "unknown" }
  | { fileType: "file"; currentPath: string }
  | { fileType: "directory"; currentPath: string };

async function PageContent(props: PageContentProps) {
  switch (props.fileType) {
    case "unknown":
      return (
        <div className="flex flex-col bg-white rounded-md shadow-md">
          <div className="flex items-center justify-center flex-1 p-8 text-gray-800">
            <p className="text-2xl font-bold">File not found</p>
          </div>
        </div>
      );

    case "file":
      // @ts-expect-error
      return <File currentPath={props.currentPath} />;

    case "directory":
      const files = await getFiles(props.currentPath);

      return <Directory files={files} />;
  }
}

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

  return (
    <FilesProvider>
      <main className="flex flex-col min-h-screen p-8 bg-gray-50 gap-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-bold text-gray-800">
            File Navigator App
          </h1>
          <div className="px-4 py-2 font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700">
            {currentPath.replace(homedir(), "~")}
          </div>
        </div>
        {fileType === "directory" && <Buttons />}
        {/** @ts-expect-error */}
        <PageContent fileType={fileType} currentPath={currentPath} />
      </main>
    </FilesProvider>
  );
}
