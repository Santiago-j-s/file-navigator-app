import type { Metadata } from "next";
import { homedir } from "os";
import { join } from "path";
import { readCookies } from "../context/server";
import { getFileType } from "../fs/getFileType";
import { getFiles } from "../fs/getFiles";
import { ActionBar } from "./components/ActionBar";
import { Directory } from "./components/Directory";
import { File } from "./components/File";

export const dynamic = "force-dynamic";

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
      return <File currentPath={props.currentPath} />;

    case "directory":
      const files = await getFiles(props.currentPath);
      const { size, showHiddenFiles, showItemsAs } = await readCookies();

      return (
        <Directory
          files={files}
          size={size}
          showItemsAs={showItemsAs}
          showHiddenFiles={showHiddenFiles}
        />
      );
  }
}

interface PageProps {
  params: {
    path: string[];
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { path } = params;

  const currentPath = join(
    homedir(),
    decodeURIComponent(path?.join("/") ?? "")
  );

  return {
    title: currentPath.replace(homedir(), "~"),
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
    <main className="flex flex-col min-h-screen h-full overflow-scroll p-8 bg-gray-50 gap-4">
      <ActionBar
        title={currentPath.replace(homedir(), "~")}
        fileType={fileType}
      />
      <PageContent fileType={fileType} currentPath={currentPath} />
    </main>
  );
}
