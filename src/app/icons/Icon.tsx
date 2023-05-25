import { FileIcon } from "./file";
import { Folder } from "./folder";
import { LockClosed } from "./lock-closed";
import { LockOpen } from "./lock-open";

interface IconProps {
  name: "lock-open" | "lock-closed" | "folder" | "file";
  className?: string;
}

export default function Icon({ name, className }: IconProps) {
  switch (name) {
    case "lock-open":
      return <LockOpen className={className} />;

    case "lock-closed":
      return <LockClosed className={className} />;

    case "folder":
      return <Folder className={className} />;

    case "file":
      return <FileIcon className={className} />;

    default:
      return null;
  }
}
