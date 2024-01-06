import Image from "next/image";
import { getFileData } from "../../services";
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

  if (file.openAs === "text") {
    return <TextFile currentPath={currentPath} />;
  }

  if (file.openAs === "image") {
    return <ImageFile currentPath={currentPath} />;
  }

  if (file.openAs === "video") {
    return <VideoFile currentPath={currentPath} mimeType={file.mimeType} />;
  }

  return (
    <pre>
      <code>file: {JSON.stringify(file, null, 2)}</code>
    </pre>
  );
}
