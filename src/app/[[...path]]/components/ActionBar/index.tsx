import { readCookies } from "@/app/context/server";
import type { FileType } from "@/app/fs/getFileType";
import { ActionBarClient } from "./ActionBar.client";

interface ActionBarProps {
  title: string;
  fileType: FileType;
}

export async function ActionBar({ title, fileType }: ActionBarProps) {
  const { showHiddenFiles, showItemsAs, size } = await readCookies();

  return (
    <ActionBarClient
      showHiddenFiles={showHiddenFiles}
      showItemsAs={showItemsAs}
      size={size}
      title={title}
      fileType={fileType}
    />
  );
}
