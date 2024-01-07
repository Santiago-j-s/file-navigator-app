import { Stats } from "fs";
import { stat } from "fs/promises";

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
