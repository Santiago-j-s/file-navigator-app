const k = 1024;
const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

/**
 * Taken from https://gist.github.com/zentala/1e6f72438796d74531803cc3833c039c
 *
 * @example
 * formatBytes(1024); // 1 KB
 * formatBytes(1234); // 1.2 KB
 * formatBytes(1234, 3); // 1.205 KB
 */
export function formatBytes(bytes: number, decimals: number = 1) {
  if (bytes === 0) {
    return "0 Bytes";
  }

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${(bytes / Math.pow(k, i)).toFixed(decimals)} ${sizes[i]}`;
}
