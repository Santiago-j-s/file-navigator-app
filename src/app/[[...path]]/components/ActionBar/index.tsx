import { readCookies, setCookies } from "@/app/context/server";
import type { FileType } from "@/app/fs/getFileType";
import { FormContent } from "./FormContent";

interface ActionBarProps {
  title: string;
  fileType: FileType;
}

export async function ActionBar({ title, fileType }: ActionBarProps) {
  const { showHiddenFiles, showItemsAs, size } = await readCookies();

  return (
    <form action={setCookies} className="flex gap-2">
      <FormContent
        title={title}
        fileType={fileType}
        size={size}
        showHiddenFiles={showHiddenFiles}
        showItemsAs={showItemsAs}
      />
    </form>
  );
}
