import { readdir } from "fs/promises";
import { getFileData } from "./getFileData";

export async function getFiles(dir: string) {
  const files = await readdir(dir);

  return Promise.all(files.map((file) => getFileData(dir, file)));
}
