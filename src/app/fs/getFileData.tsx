import { access } from "fs/promises";
import { homedir } from "os";
import { join } from "path";
import { getExtension } from "./getExtension";
import { getFileType } from "./getFileType";
import { getMimeType } from "./getMimeType";
import { isHidden } from "./isHidden";
import { openAs } from "./openAs";

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
