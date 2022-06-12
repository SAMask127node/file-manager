const errMsgInv = "Invalid input";
const errMsgFail = "Operation failed";

export const errors = {
  async invalidInput() {
    return console.log(errMsgInv);
  },
  async operationFailed() {
    return console.log(errMsgFail);
  },
};
