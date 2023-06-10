import { Eye } from "./eye";
import { EyeSlash } from "./eye-slash";
import { FileIcon } from "./file";
import { Folder } from "./folder";
import { Grid } from "./grid";
import { List } from "./list";
import { LockClosed } from "./lock-closed";
import { LockOpen } from "./lock-open";

interface IconProps {
  name:
    | "lock-open"
    | "lock-closed"
    | "folder"
    | "file"
    | "eye"
    | "eye-slash"
    | "grid"
    | "list";
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

    case "eye":
      return <Eye className={className} />;

    case "eye-slash":
      return <EyeSlash className={className} />;

    case "grid":
      return <Grid className={className} />;

    case "list":
      return <List className={className} />;

    default:
      throw new Error(`Icon "${name}" not found`);
  }
}
