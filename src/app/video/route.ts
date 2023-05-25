import { createReadStream } from "fs";
import { stat } from "fs/promises";
import { NextResponse } from "next/server";
import { Readable } from "stream";

function getContentType(path: string) {
  const ext = path.split(".").pop();

  switch (ext) {
    case "mov":
      return "video/quicktime";
    case "mp4":
      return "video/mp4";
    case "webm":
      return "video/webm";
    case "ogg":
      return "video/ogg";
    default:
      throw new Error("Invalid file type");
  }
}

const CHUNK_SIZE = 10 ** 6;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path");

  if (!path) {
    return new NextResponse("Missing path parameter", { status: 400 });
  }

  const range = request.headers.get("range");

  if (!range) {
    return new NextResponse("Missing range header", { status: 400 });
  }

  const stats = await stat(path);
  const videoSize = stats.size;

  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
  const contentLength = end - start + 1;

  const video = Readable.toWeb(createReadStream(path, { start, end }));

  return new NextResponse(video, {
    body: video,
    status: 206,
    headers: {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Content-Type": getContentType(path),
      "Content-Length": contentLength,
      "Accept-Ranges": "bytes",
    },
  });
}
