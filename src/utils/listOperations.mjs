import { readdir } from "fs";
import path from "path";
import { cwd } from "process";
import { errors } from "../store/error.mjs";
import {
  currentDirectoryMessage,
  isDirectory,
} from "../store/workingDirecory.mjs";

export const goUp = async () => {
  try {
    if (path.parse(cwd()).root === cwd()) {
      return await currentDirectoryMessage();
    }
    const newPath = path.resolve(path.join(cwd(), "../"));
    process.chdir(newPath);
    return await currentDirectoryMessage();
  } catch (error) {
    await errors.operationFailed();
  }
};

export const goFolder = async (par) => {
  try {
    if (await isDirectory(par)) {
      process.chdir(par);
      return await currentDirectoryMessage();
    } else {
      return await errors.operationFailed();
    }
  } catch (error) {
    await errors.operationFailed();
  }
};

export const list = async () => {
  try {
    readdir(cwd(), async (e, files) => {
      if (e) {
        console.log("Operation failed_1");
      }
      console.log(files);
      await currentDirectoryMessage();
    });
    return 1;
  } catch (error) {
    await errors.operationFailed();
  }
};
