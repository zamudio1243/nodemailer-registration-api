import CryptoJS from "crypto-js";

class CryptoServ {
  static encryptPass(password) {
    return CryptoJS.SHA256(password).toString();
  }

  static isValidPass(password, hash) {
    return CryptoServ.encryptPass(password) === hash;
  }
}

export default CryptoServ;
