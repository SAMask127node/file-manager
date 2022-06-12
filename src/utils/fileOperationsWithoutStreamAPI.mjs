import * as fs from "fs";
import { errors } from "../store/error.mjs";
import { currentDirectoryMessage } from "../store/workingDirecory.mjs";

export const create = async (par) => {
  try {
    await fs.promises
      .writeFile(par, "", {
        flag: "wx",
      })
      .then(async () => {
        await currentDirectoryMessage();
      })
      .catch(async (err) => {
        await errors.operationFailed();
        return;
      });
  } catch (error) {
    await errors.operationFailed();
  }
};
