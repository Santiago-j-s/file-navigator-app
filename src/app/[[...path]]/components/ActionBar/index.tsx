import { readProviderCookies, setContextCookies } from "@/app/context/server";
import type { FileType } from "../../services";
import { FormContent } from "./FormContent";

interface ActionBarProps {
  title: string;
  fileType: FileType;
}

export async function ActionBar({ title, fileType }: ActionBarProps) {
  const { showHiddenFiles, showItemsAs, size } = await readProviderCookies();

  return (
    <form action={setContextCookies} className="flex gap-2">
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
