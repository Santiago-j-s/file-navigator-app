import { isHidden } from "./isHidden";

export function getExtension(filename: string) {
  if (!filename.includes(".")) {
    return null;
  }

  const filenameParts = filename.split(".");

  // if a hidden file has only one dot, it's not a file extension
  if (isHidden(filename) && filenameParts.length === 2) {
    return null;
  }

  return filenameParts.pop();
}
