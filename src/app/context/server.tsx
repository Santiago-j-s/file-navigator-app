"use server";

import { z } from "zod";

import { cookies } from "next/headers";
import invariant from "tiny-invariant";

export async function setContextCookies(data: FormData) {
  const cookieStore = cookies();

  if (!data) {
    console.warn("No data to set cookies");
    return;
  }

  if (data.has("showHiddenFiles")) {
    const showHiddenFiles = data.get("showHiddenFiles");

    invariant(
      showHiddenFiles === "true" || showHiddenFiles === "false",
      "showHiddenFiles must be a boolean"
    );

    cookieStore.set("showHiddenFiles", showHiddenFiles);
  }

  if (data.has("showItemsAs")) {
    const showItemsAs = data.get("showItemsAs");

    invariant(
      showItemsAs === "list" || showItemsAs === "grid",
      "showItemsAs must be a list or grid"
    );

    cookieStore.set("showItemsAs", showItemsAs);
  }

  if (data.has("size")) {
    const size = data.get("size");

    invariant(
      size === "small" || size === "medium" || size === "large",
      "size must be small, medium or large"
    );

    cookieStore.set("size", size);
  }
}

const filesStateSchema = z.object({
  showHiddenFiles: z.boolean(),
  showItemsAs: z.enum(["list", "grid"] as const),
  size: z.enum(["small", "medium", "large"] as const),
});

export async function readProviderCookies(): Promise<{
  showHiddenFiles: boolean;
  showItemsAs: "list" | "grid";
  size: "small" | "medium" | "large";
}> {
  const cookieStore = cookies();

  const showHiddenFiles = cookieStore.get("showHiddenFiles")?.value === "true";
  const showItemsAs = cookieStore.get("showItemsAs")?.value ?? "list";
  const size = cookieStore.get("size")?.value ?? "medium";

  return filesStateSchema.parse({
    showHiddenFiles,
    showItemsAs,
    size,
  });
}
