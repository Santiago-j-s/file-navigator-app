import { readFile } from "fs/promises";
import Image from "next/image";
import { getFileData, getMimeType } from "../../services";

export const textExtensions = new Set(["txt", "md", "js", "json", "sql", "ts"]);
export const imageExtensions = new Set(["png", "jpg", "jpeg", "gif"]);
export const videoExtensions = new Set(["mp4", "webm", "ogg", "mov"]);

async function TextFile({ currentPath }: { currentPath: string }) {
  const mimeType = getMimeType(currentPath);
  const content = await readFile(currentPath, "utf-8");

  let contentPrettified = content;
  try {
    if (mimeType === "application/json") {
      contentPrettified = JSON.stringify(JSON.parse(content), null, 2);
    }
  } catch (error) {
    console.log(`Error parsing JSON: ${currentPath}`);
  }

  return (
    <pre className="bg-gray-800 rounded-md text-gray-300 p-8 whitespace-pre-wrap">
      <code>{contentPrettified}</code>
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
  const parts = currentPath.split("/");

  const filename = parts.pop();
  const dir = parts.join("/");

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
