import { getExtension } from "./getExtension";

export type MimeTypes =
  | "text/plain"
  | "text/markdown"
  | "text/javascript"
  | "application/json"
  | "image/png"
  | "image/jpeg"
  | "image/gif"
  | "video/mp4"
  | "video/webm"
  | "video/ogg"
  | "video/quicktime";

export function getMimeType(filename: string): MimeTypes | null {
  const extension = getExtension(filename);

  if (!extension) {
    return null;
  }

  switch (extension) {
    case "txt":
      return "text/plain";
    case "md":
      return "text/markdown";
    case "js":
      return "text/javascript";
    case "json":
      return "application/json";
    case "png":
      return "image/png";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "gif":
      return "image/gif";
    case "mp4":
      return "video/mp4";
    case "webm":
      return "video/webm";
    case "ogg":
      return "video/ogg";
    case "mov":
      return "video/quicktime";
    default:
      return null;
  }
}
