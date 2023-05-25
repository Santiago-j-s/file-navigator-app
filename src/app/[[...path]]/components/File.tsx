import { readFile } from "fs/promises";
import Image from "next/image";
import { getFileData } from "../services";

export const textExtensions = new Set(["txt", "md", "js", "json"]);
export const imageExtensions = new Set(["png", "jpg", "jpeg", "gif"]);
export const videoExtensions = new Set(["mp4", "webm", "ogg", "mov"]);

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

export async function File({ currentPath }: FileProps) {
  const dir = currentPath.split("/").slice(0, -1).join("/");
  const filename = currentPath.split("/").pop();

  if (!filename) {
    throw new Error(`Filename not found: ${currentPath}`);
  }

  const file = await getFileData(dir, filename);

  if (textExtensions.has(file.extension ?? "")) {
    return (
      /** @ts-expect-error */
      <TextFile currentPath={currentPath} />
    );
  }

  if (imageExtensions.has(file.extension ?? "")) {
    return <ImageFile currentPath={currentPath} />;
  }

  if (videoExtensions.has(file.extension ?? "")) {
    return <VideoFile currentPath={currentPath} mimeType={file.mimeType} />;
  }

  return (
    <pre>
      <code>file: {JSON.stringify(file, null, 2)}</code>
    </pre>
  );
}
