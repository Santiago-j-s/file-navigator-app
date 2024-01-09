const textExtensions = new Set([
  "txt",
  "md",
  "js",
  "json",
  "sql",
  "ts",
  "tsx",
  "jsx",
  "html",
  "css",
  "scss",
  "yml",
  "yaml",
]);
const imageExtensions = new Set(["png", "jpg", "jpeg", "gif"]);
const videoExtensions = new Set(["mp4", "webm", "ogg", "mov"]);
const pdfExtensions = new Set(["pdf"]);

export function openAs(
  extension?: string | null
): "none" | "text" | "image" | "video" | "pdf" {
  if (!extension) {
    return "none";
  }

  if (textExtensions.has(extension)) {
    return "text";
  }

  if (imageExtensions.has(extension)) {
    return "image";
  }

  if (videoExtensions.has(extension)) {
    return "video";
  }

  if (pdfExtensions.has(extension)) {
    return "pdf";
  }

  return "none";
}
