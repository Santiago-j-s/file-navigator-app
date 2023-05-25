import { Stats } from "fs";
import { access, readdir, stat } from "fs/promises";
import { homedir } from "os";
import { join } from "path";

export type FileType = "file" | "directory" | "unknown";

export interface MyFile {
  name: string;
  access: boolean;
  type: FileType;
  hidden: boolean;
  extension?: string | null;
  path: string;
}

export function getPath(slug: string[]) {
  const homepath = homedir();

  return join(homepath, decodeURIComponent(slug.join("/")));
}

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

export const textExtensions = new Set(["txt", "md", "js", "json"]);
export const imageExtensions = new Set(["png", "jpg", "jpeg", "gif"]);
export const videoExtensions = new Set(["mp4", "webm", "ogg", "mov"]);

export async function getFile(dir: string, filename: string) {
  const fileData = await getFileData(dir, filename);

  return {
    ...fileData,
    content: null,
  };
}

async function getFileData(dir: string, filename: string) {
  const filePath = join(dir, filename);
  const filePathWithoutHome = filePath.replace(homedir(), "");

  return {
    name: filename,
    path: filePathWithoutHome,
    access: await access(filePath)
      .then(() => true)
      .catch(() => false),
    type: await getFileType(filePath),
    hidden: filename.startsWith("."),
    extension: filename.split(".").pop(),
  };
}

export async function getFiles(path: string): Promise<MyFile[]> {
  const files = await readdir(path);

  const filesWithTypes = await Promise.all(
    files.map((file) => getFileData(path, file))
  );

  return filesWithTypes;
}
