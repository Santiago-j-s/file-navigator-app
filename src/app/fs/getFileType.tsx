import { Stats } from "fs";

export type FileType = "file" | "directory" | "unknown";

export async function getFileType(fileStat: Stats | null): Promise<FileType> {
  if (!fileStat) {
    return "unknown";
  }

  if (fileStat.isDirectory()) {
    return "directory";
  }

  if (fileStat.isFile()) {
    return "file";
  }

  return "unknown";
}
