import { createHash } from "crypto";
import { createReadStream } from "fs";
import { EOL } from "os";
import { errors } from "../store/error.mjs";
import { currentDirectoryMessage } from "../store/workingDirecory.mjs";

export const calculateHash = async (par) => {
  try {
    const hash = createHash("sha256");
    const newStream = createReadStream(par);

    newStream.pipe(hash).setEncoding("hex").pipe(process.stdout);

    newStream.on("end", async () => {
      process.stdout.write(EOL);
      await currentDirectoryMessage();
    });
  } catch (error) {
    await errors.operationFailed();
  }
};
