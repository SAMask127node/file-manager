import { createReadStream } from "fs";
import { EOL } from "os";
import * as fs from "fs";
import { errors } from "../store/error.mjs";
import {
  currentDirectoryMessage,
  isPathExist,
  isFile,
  isDirectory,
} from "../store/workingDirecory.mjs";
import path from "path";

export const read = async (par) => {
  try {
    if (!(await isFile(par))) {
      return await errors.operationFailed();
    }
    const newStream = createReadStream(par);
    newStream.pipe(process.stdout);
    newStream.on("end", async () => {
      process.stdout.write(EOL);
      await currentDirectoryMessage();
    });
    newStream.on("error", async () => {
      await errors.operationFailed();
    });
  } catch (error) {
    await errors.operationFailed();
  }

  return;
};

export const renameFile = async (path_1, path_2) => {
  try {
    if (
      !(await isFile(path_1)) ||
      ((await isPathExist(path_2)) && !(await isFile(path_2)))
    ) {
      return await errors.operationFailed();
    }
    const newStream = createReadStream(path_1).destroy();

    newStream.on("close", async () => {
      await fs.promises.rename(path_1, path_2);
      await currentDirectoryMessage();
      ls;
    });
  } catch (error) {
    await errors.operationFailed();
  }

  return;
};

export const copyFile = async (path_1, path_2) => {
  try {
    if (!(await isFile(path_1)) || !(await isDirectory(path_2))) {
      return await errors.operationFailed();
    }
    const fileName = path.basename(path_1);
    const newPath_2 = path.resolve(path.join(path_2, fileName));
    const newStream = createReadStream(path_1).destroy();

    newStream.on("close", async () => {
      await fs.promises.copyFile(path_1, newPath_2);
      await currentDirectoryMessage();
    });
  } catch (error) {
    await errors.operationFailed();
  }

  return;
};

export const moveFile = async (path_1, path_2) => {
  try {
    if (!(await isFile(path_1)) || !(await isDirectory(path_2))) {
      return await errors.operationFailed();
    }
    const fileName = path.basename(path_1);
    const newPath_2 = path.resolve(path.join(path_2, fileName));

    const newStream = createReadStream(path_1).destroy();

    newStream.on("close", async () => {
      await fs.promises.copyFile(path_1, newPath_2);
      if (path_1 != newPath_2) await fs.promises.unlink(path_1);
      await currentDirectoryMessage();
    });
  } catch (error) {
    await errors.operationFailed();
  }

  return;
};

export const deleteFile = async (par) => {
  try {
    if (!(await isFile(par))) {
      return await errors.operationFailed();
    }
    const newStream = createReadStream(par).destroy();

    newStream.on("close", async () => {
      await fs.promises.unlink(par);
      await currentDirectoryMessage();
    });
  } catch (error) {
    await errors.operationFailed();
  }

  return;
};
