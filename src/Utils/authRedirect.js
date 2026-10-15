export function loginReturnPath(from) {
  return typeof from === "string" && from.startsWith("/")
    && !from.startsWith("//") && !from.includes("\\")
    ? from : "/";
}
