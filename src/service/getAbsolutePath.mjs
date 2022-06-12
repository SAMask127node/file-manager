import path from "path";
import { cwd } from "process";

export async function absolutePath(par) {
  let newPath = par;

  if (
    !path.isAbsolute(par) ||
    (path.isAbsolute(par) && !path.parse(par).root.includes("C:"))
  ) {
    newPath = path.resolve(path.join(cwd(), par));
  }

  return newPath;
}
