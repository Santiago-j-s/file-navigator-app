import { readFile, stat } from "fs/promises";
import { NextResponse } from "next/server";

function getContentType(path: string) {
  const ext = path.split(".").pop();

  switch (ext) {
    case "pdf":
      return "application/pdf";
    default:
      throw new Error("Invalid file type");
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path");

  if (!path) {
    return new NextResponse("Missing path parameter", { status: 400 });
  }

  const stats = await stat(path);
  const pdf = await readFile(path);

  return new NextResponse(pdf, {
    headers: {
      "Content-Type": getContentType(path),
      "Content-Length": stats.size.toString(),
    },
  });
}
