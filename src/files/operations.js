import { goFolder, goUp, list } from "../utils/listOperations.mjs";
import {
  copyFile,
  deleteFile,
  moveFile,
  read,
  renameFile,
} from "../utils/fileOperationsWithStreamAPI.mjs";
import { create } from "../utils/fileOperationsWithoutStreamAPI.mjs";
import { calculateHash } from "../utils/calcHash.mjs";
import {
  compressFile,
  decompressFile,
} from "../utils/comDecompressOperations.mjs";

export const operations = {
  up: async () => {
    return await goUp();
  },
  cd: async (par) => {
    return await goFolder(par);
  },
  ls: async () => {
    return await list();
  },
  cat: async (par) => {
    return await read(par);
  },
  add: async (par) => {
    return await create(par);
  },
  rn: async (par1, par2) => {
    return await renameFile(par1, par2);
  },
  cp: async (par1, par2) => {
    return await copyFile(par1, par2);
  },
  mv: async (par1, par2) => {
    return await moveFile(par1, par2);
  },
  rm: async (par) => {
    return await deleteFile(par);
  },
  hash: async (par) => {
    return await calculateHash(par);
  },
  compress: async (par1, par2) => {
    return await compressFile(par1, par2);
  },
  decompress: async (par1, par2) => {
    return await decompressFile(par1, par2);
  },
};
