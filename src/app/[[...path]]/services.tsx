import { Stats } from "fs";
import { access, readdir, stat } from "fs/promises";
import { homedir } from "os";
import { join } from "path";

const textExtensions = new Set([
  "txt",
  "md",
  "js",
  "json",
  "sql",
  "ts",
  "tsx",
  "jsx",
]);
const imageExtensions = new Set(["png", "jpg", "jpeg", "gif"]);
const videoExtensions = new Set(["mp4", "webm", "ogg", "mov"]);

export type FileType = "file" | "directory" | "unknown";

export async function getFileType(file: string): Promise<FileType> {
  let stats: Stats;

  try {
    stats = await stat(file);
  } catch (error) {
    console.log(error);
    return "unknown";
  }

  if (stats.isDirectory()) {
    return "directory";
  }

  if (stats.isFile()) {
    return "file";
  }

  return "unknown";
}

export type MimeTypes =
  | "text/plain"
  | "text/markdown"
  | "text/javascript"
  | "application/json"
  | "image/png"
  | "image/jpeg"
  | "image/gif"
  | "video/mp4"
  | "video/webm"
  | "video/ogg"
  | "video/quicktime";

export function getMimeType(filename: string): MimeTypes | null {
  const extension = getExtension(filename);

  if (!extension) {
    return null;
  }

  switch (extension) {
    case "txt":
      return "text/plain";
    case "md":
      return "text/markdown";
    case "js":
      return "text/javascript";
    case "json":
      return "application/json";
    case "png":
      return "image/png";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "gif":
      return "image/gif";
    case "mp4":
      return "video/mp4";
    case "webm":
      return "video/webm";
    case "ogg":
      return "video/ogg";
    case "mov":
      return "video/quicktime";
    default:
      return null;
  }
}

function isHidden(filename: string) {
  return filename.startsWith(".");
}

function getExtension(filename: string) {
  if (!filename.includes(".")) {
    return null;
  }

  // if a hidden file has only one dot, it's not a file extension
  if (filename.startsWith(".") && filename.split(".").length === 2) {
    return null;
  }

  return filename.split(".").pop();
}

export async function getFileData(dir: string, filename: string) {
  const filePath = join(dir, filename);
  const filePathWithoutHome = filePath.replace(homedir(), "");

  const canOpen = await access(filePath)
    .then(() => true)
    .catch(() => false);

  const type = await getFileType(filePath);

  if (type === "directory" || type === "unknown") {
    return {
      name: filename,
      path: filePathWithoutHome,
      fullpath: filePath,
      access: canOpen,
      type,
      hidden: isHidden(filename),
    };
  }

  const extension = getExtension(filename);

  if (type === "file") {
    return {
      name: filename,
      path: filePathWithoutHome,
      fullpath: filePath,
      access: canOpen,
      type,
      hidden: isHidden(filename),
      extension,
      mimeType: getMimeType(filename),
      openAs: openAs(extension),
    };
  }

  throw new Error(`Invalid filetype: ${type}`);
}

export type FileData = ReturnType<typeof getFileData>;

function openAs(
  extension?: string | null
): "none" | "text" | "image" | "video" {
  if (!extension) {
    return "none";
  }

  if (textExtensions.has(extension)) {
    return "text";
  }

  if (imageExtensions.has(extension)) {
    return "image";
  }

  if (videoExtensions.has(extension)) {
    return "video";
  }

  return "none";
}

export async function getFiles(dir: string) {
  const files = await readdir(dir);

  return Promise.all(files.map((file) => getFileData(dir, file)));
}
