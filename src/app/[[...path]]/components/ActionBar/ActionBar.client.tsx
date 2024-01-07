"use client";
import { setCookies } from "@/app/context/server";
import type { FileType } from "@/app/fs/getFileType";
import { useRef } from "react";
import { FormContent } from "./FormContent";

interface ActionBarClientProps {
  showHiddenFiles: boolean;
  showItemsAs: "list" | "grid";
  size: "small" | "medium" | "large";
  title: string;
  fileType: FileType;
}

export function ActionBarClient({
  showHiddenFiles,
  showItemsAs,
  size,
  title,
  fileType,
}: ActionBarClientProps) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form action={setCookies} className="flex gap-2" ref={formRef}>
      <FormContent
        title={title}
        fileType={fileType}
        size={size}
        showHiddenFiles={showHiddenFiles}
        showItemsAs={showItemsAs}
        formRef={formRef}
      />
    </form>
  );
}
