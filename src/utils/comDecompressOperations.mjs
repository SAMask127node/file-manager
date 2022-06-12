import { errors } from "../store/error.mjs";
import {
  isPathExist,
  isFile,
  currentDirectoryMessage,
} from "../store/workingDirecory.mjs";
import * as zlib from "zlib";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream";

export const compressFile = async (path_1, path_2) => {
  try {
    if (
      !(await isFile(path_1)) ||
      ((await isPathExist(path_2)) && !(await isFile(path_2)))
    ) {
      return await errors.operationFailed();
    }

    const gzTransform = zlib.createBrotliCompress();
    const fileToArchive = createReadStream(path_1);
    const newArchivedFile = createWriteStream(path_2);

    pipeline(fileToArchive, gzTransform, newArchivedFile, async (err) => {
      if (err) {
        console.log(err);
        return await errors.operationFailed();
      }
    });
    await currentDirectoryMessage();
  } catch (error) {
    await errors.operationFailed();
  }

  return;
};

export const decompressFile = async (path_1, path_2) => {
  try {
    if (
      !(await isFile(path_1)) ||
      ((await isPathExist(path_2)) && !(await isFile(path_2)))
    ) {
      return await errors.operationFailed();
    }

    const gzUnzipTransform = zlib.createBrotliDecompress();
    const fileToGunzip = createReadStream(path_1);
    const newGunzipedFile = createWriteStream(path_2);

    pipeline(fileToGunzip, gzUnzipTransform, newGunzipedFile, async (err) => {
      if (err) {
        await errors.operationFailed();
      }
    });
    await currentDirectoryMessage();
  } catch (error) {
    await errors.operationFailed();
  }

  return;
};
