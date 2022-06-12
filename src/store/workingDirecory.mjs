import { cwd } from "process";
import { homedir } from "os";
import * as fs from "fs";
import { absolutePath } from "../service/getAbsolutePath.mjs";
import { errors } from "./error.mjs";

export const workingDirectory = {
  dir: cwd(),
  get currentDirectory() {
    return `${this.dir}`;
  },
  set currentDirectory(value) {
    this.dir = value;
  },
};
async function currentDirectoryChangeToHomeDir() {
  try {
    process.chdir(homedir());
    return cwd();
  } catch (error) {
    await errors.operationFailed();
  }
}

async function currentDirectoryMessage() {
  try {
    return console.log(`You are currently in ${cwd()}`);
  } catch (error) {
    await errors.operationFailed();
  }
}

async function isPathExist(par) {
  try {
    await fs.promises.access(par);
    return true;
  } catch {
    return false;
  }
}

async function isFile(par) {
  try {
    let statObject;
    await fs.promises.stat(par).then((res) => {
      statObject = res;
    });
    return statObject.isFile();
  } catch {
    return false;
  }
}

async function isDirectory(par) {
  try {
    const statObject = await fs.promises.stat(par);
    return statObject.isDirectory();
  } catch (error) {
    return false;
  }
}

async function isArgCorrectPath(par) {
  try {
    const isArgPathExist = await isPathExist(await absolutePath(par));
    return isArgPathExist;
  } catch (error) {
    return false;
  }
}

export {
  currentDirectoryChangeToHomeDir,
  currentDirectoryMessage,
  isDirectory,
  isPathExist,
  isFile,
  isArgCorrectPath,
};
