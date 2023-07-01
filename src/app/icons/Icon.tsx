import clsx from "clsx";
import { ArrowLeft } from "./arrow-left";
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
    | "list"
    | "arrow-left";
  className?: string;
  size?: "small" | "medium" | "large";
}

function IconContent({ name }: { name: string }) {
  switch (name) {
    case "lock-open":
      return <LockOpen />;

    case "lock-closed":
      return <LockClosed />;

    case "folder":
      return <Folder />;

    case "file":
      return <FileIcon />;

    case "eye":
      return <Eye />;

    case "eye-slash":
      return <EyeSlash />;

    case "grid":
      return <Grid />;

    case "list":
      return <List />;

    case "arrow-left":
      return <ArrowLeft />;

    default:
      throw new Error(`Icon "${name}" not found`);
  }
}

export default function Icon({ className, name, size = "small" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={clsx(
        className,
        size === "small" && "w-6 h-6",
        size === "medium" && "w-9 h-9",
        size === "large" && "w-12 h-12"
      )}
    >
      <IconContent name={name} />;
    </svg>
  );
}
