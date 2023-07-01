"use server";

import { z } from "zod";

import { cookies } from "next/headers";

export async function setContextCookies(data: FormData) {
  const cookieStore = cookies();

  if (!data) {
    console.warn("No data to set cookies");
    return;
  }

  if (data.has("showHiddenFiles")) {
    // @ts-expect-error
    cookieStore.set("showHiddenFiles", data.get("showHiddenFiles")?.toString());
  }

  if (data.has("showItemsAs")) {
    // @ts-expect-error
    cookieStore.set("showItemsAs", data.get("showItemsAs"));
  }

  if (data.has("size")) {
    // @ts-expect-error
    cookieStore.set("size", data.get("size"));
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
