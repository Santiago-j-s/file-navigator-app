import { type Stats } from "fs";
import { access, readdir, stat } from "fs/promises";
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

  let fileStat: Stats | null;

  try {
    fileStat = await stat(filePath);
  } catch (error) {
    fileStat = null;
  }

  const type = await getFileType(fileStat);

  if (type === "directory" || type === "unknown") {
    return {
      name: filename,
      path: filePathWithoutHome,
      fullpath: filePath,
      access: canOpen,
      type,
      hidden: isHidden(filename),
      numberOfItems:
        canOpen && type === "directory"
          ? await readdir(filePath)
              .then((files) => files.length)
              .catch(() => null)
          : null,
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
      size: fileStat && fileStat.size,
    };
  }

  throw new Error(`Invalid filetype: ${type}`);
}

export type FileData = ReturnType<typeof getFileData>;
