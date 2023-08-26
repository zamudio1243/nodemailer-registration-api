import CryptoJS from "crypto-js";

class CryptoServ {
  encryptPass(password) {
    return CryptoJS.SHA256(password).toString();
  }

  isValidPass(password, hash) {
    return this.encryptPass(password) === hash;
  }
}

export default CryptoServ;
