"use client";

import { useFilter } from "@/app/context/filterContext";
import Icon from "@/app/icons/Icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FileType } from "../../../fs/getFileType";

interface FormContentProps {
  title: string;
  fileType: FileType;
  size: "small" | "medium" | "large";
  showHiddenFiles: boolean;
  showItemsAs: "list" | "grid";
  formRef: React.RefObject<HTMLFormElement>;
}

export function FormContent({
  title,
  fileType,
  size,
  showHiddenFiles,
  showItemsAs,
  formRef,
}: FormContentProps) {
  return (
    <>
      <BackButton title={title} />
      <CurrentPath title={title} />
      {fileType === "directory" && (
        <>
          <FilterInput />
          <Select
            name="size"
            onValueChange={() => {
              if (formRef.current == null) {
                return;
              }

              formRef.current.requestSubmit();
            }}
            defaultValue={size}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Small</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="large">Large</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            title={showHiddenFiles ? "Hide hidden files" : "Show hidden files"}
            name="showHiddenFiles"
            value={showHiddenFiles ? "false" : "true"}
          >
            <Icon
              name={showHiddenFiles ? "eye-slash" : "eye"}
              className="w-5 h-5"
            />
          </Button>
          <Button
            variant="outline"
            title={
              showItemsAs === "grid"
                ? "View items as list"
                : "View items as grid"
            }
            type="submit"
            name="showItemsAs"
            value={showItemsAs === "grid" ? "list" : "grid"}
          >
            <Icon
              name={showItemsAs === "grid" ? "list" : "grid"}
              className="w-5 h-5"
            />
          </Button>
        </>
      )}
    </>
  );
}

function CurrentPath({ title }: { title: string }) {
  return (
    <div className="px-4 py-2 font-medium rounded-md bg-background">
      {title}
    </div>
  );
}

function BackButton({ title }: { title: string }) {
  return (
    <Button
      variant="outline"
      disabled={title === "~"}
      title="Go back"
      onClick={() => {
        window.history.back();
      }}
    >
      <Icon name="arrow-left" className="w-5 h-5" />
    </Button>
  );
}

function FilterInput() {
  const { setFilter } = useFilter();

  return (
    <Input
      type="text"
      placeholder="Filter"
      className="flex-1"
      onChange={(event) => {
        setFilter(event.target.value);
      }}
    />
  );
}
