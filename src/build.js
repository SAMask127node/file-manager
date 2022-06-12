import * as readline from "readline";

import { operations } from "./files/operations.js";
import {
  currentDirectoryChangeToHomeDir,
  currentDirectoryMessage,
  isArgCorrectPath,
} from "./store/workingDirecory.mjs";
import { errors } from "./store/error.mjs";
import { absolutePath } from "./service/getAbsolutePath.mjs";
import { osPrintOperations } from "./files/osPrintOperations.js";

const userName = process.argv[2].split("=")[1];
const userNameWelcomeMessage = `Welcome to the File Manager, ${userName}!`;
const userNameSayonaroMessage = `Thank you for using File Manager, ${userName}!`;

console.log(userNameWelcomeMessage);

await currentDirectoryChangeToHomeDir();
await currentDirectoryMessage();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("SIGINT", () => {
  console.log(userNameSayonaroMessage);
  rl.close();
});

rl.on("line", async (input) => {
  const [command, firstArg, secondArg, ...rest] = input.split(" ");
  const isArgOS =
    firstArg &&
    firstArg.length > 3 &&
    firstArg.split("").slice(0, 2).join("") == "--";
  if (command == ".exit") {
    console.log(userNameSayonaroMessage);
    rl.close();
    return;
  }
  try {
    if (command != "os" && !(command in operations)) {
      await errors.invalidInput();
    } else if (command == "os" && isArgOS) {
      const osArg = firstArg.split("--")[1];
      if (!(osArg in osPrintOperations)) {
        await errors.invalidInput();
      } else {
        await osPrintOperations[osArg]();
        await currentDirectoryMessage();
      }
    } else if (
      firstArg &&
      command !== "add" &&
      !(await isArgCorrectPath(firstArg))
    ) {
      await errors.operationFailed();
    } else if (
      secondArg &&
      !["rn", "compress", "decompress"].includes(command) &&
      !(await isArgCorrectPath(secondArg))
    ) {
      await errors.operationFailed();
    } else {
      const src_1 = firstArg && (await absolutePath(firstArg));
      const src_2 = secondArg && (await absolutePath(secondArg));
      await operations[command](src_1, src_2, ...rest);
    }
  } catch (error) {
    await errors.operationFailed();
  }
});
