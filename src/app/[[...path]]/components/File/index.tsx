import { getFileData } from "@/app/fs/getFileData";
import Image from "next/image";
import { TextFile } from "./TextFile";

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
    <div className="flex justify-center relative">
      <video controls className="h-full max-h-[720px]">
        <source src={`/video?path=${currentPath}`} type={mimeType} />
      </video>
    </div>
  );
}

function PdfFile({ currentPath }: { currentPath: string }) {
  return (
    <div className="flex justify-center relative">
      <object
        data={`/pdf?path=${currentPath}`}
        type="application/pdf"
        width="800"
        height="1200"
      >
        <p>
          You don&apos;t have a PDF plugin, but you can
          <a href={`/pdf?path=${currentPath}`}>download the PDF file. </a>
        </p>
      </object>
    </div>
  );
}

interface FileProps {
  currentPath: string;
}

export async function File({ currentPath }: FileProps) {
  const parts = currentPath.split("/");

  const filename = parts.pop();
  const dir = parts.join("/");

  if (!filename) {
    throw new Error(`Filename not found: ${currentPath}`);
  }

  const file = await getFileData(dir, filename);

  if (file.type !== "file") {
    throw new Error(
      `File component only works with files, not with ${file.type}`
    );
  }

  switch (file.openAs) {
    case "text":
      return <TextFile currentPath={currentPath} />;
    case "image":
      return <ImageFile currentPath={currentPath} />;
    case "video":
      return <VideoFile currentPath={currentPath} mimeType={file.mimeType} />;
    case "pdf":
      return <PdfFile currentPath={currentPath} />;
    default:
      return (
        <pre>
          <code>file: {JSON.stringify(file, null, 2)}</code>
        </pre>
      );
  }
}
