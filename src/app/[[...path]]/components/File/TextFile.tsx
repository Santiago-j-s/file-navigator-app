import { readFile } from "fs/promises";
import { TextFileClient } from "./TextFile.client";

export async function TextFile({ currentPath }: { currentPath: string }) {
  const content = await readFile(currentPath, "utf-8");
  const extension = currentPath.split(".").pop();

  return <TextFileClient content={content} fileExtension={extension} />;
}
