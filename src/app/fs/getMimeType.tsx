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
  | "video/quicktime"
  | "text/yaml"
  | "image/vnd.adobe.photoshop"
  | "application/pdf"
  | "application/x-apple-diskimage"
  | "image/svg+xml"
  | "text/csv";

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
    case "yml":
    case "yaml":
      return "text/yaml";
    case "psd":
      return "image/vnd.adobe.photoshop";
    case "pdf":
      return "application/pdf";
    case "dmg":
      return "application/x-apple-diskimage";
    case "excalidraw":
      return "application/json";
    case "svg":
      return "image/svg+xml";
    case "csv":
      return "text/csv";
    default:
      return null;
  }
}
