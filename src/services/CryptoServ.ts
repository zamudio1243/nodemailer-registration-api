import CryptoJS from "crypto-js";

class CryptoServ {
  /**
   * The function encrypts a given password using the SHA256 algorithm.
   * @param password - The `password` parameter is the input string that you want to encrypt using the
   * SHA256 algorithm.
   * @returns The encrypted password as a string.
   */
  static encryptPass(password) {
    return CryptoJS.SHA256(password).toString();
  }

  /**
   * The function checks if a given password matches a given hash value.
   * @param password - The password parameter is the plain text password that needs to be validated.
   * @param hash - The `hash` parameter is a string that represents the hashed version of a password.
   * @returns a boolean value. It is checking if the encrypted version of the password matches the
   * provided hash value. If they match, it returns true, indicating that the password is valid. If
   * they do not match, it returns false, indicating that the password is not valid.
   */
  static isValidPass(password, hash) {
    return CryptoServ.encryptPass(password) === hash;
  }
}

export default CryptoServ;
