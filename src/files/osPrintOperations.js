import * as os from "os";

export const osPrintOperations = {
  EOL: async () => {
    return console.log(JSON.stringify(os.EOL));
  },
  cpus: async () => {
    const cpus = os.cpus();
    const cpusInfo = {
      amount_of_CPUs: cpus.length,
      model: cpus[0].model,
      clock_rate: cpus.map((m) => m.speed / 1000),
    };
    return console.log(cpusInfo);
  },
  homedir: async () => {
    return console.log(os.homedir());
  },
  username: async (par) => {
    return console.log(os.userInfo().username);
  },
  architecture: async (par) => {
    return console.log(os.arch());
  },
};
