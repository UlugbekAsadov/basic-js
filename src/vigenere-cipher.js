const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
  }

  encrypt(message, key) {
    if (typeof message !== "string" || typeof key !== "string") {
      throw new Error("Incorrect arguments!");
    }

    message = message.toUpperCase();
    key = key.toUpperCase();
    let keyIndex = 0;
    let encryptedMessage = "";

    for (let i = 0; i < message.length; i++) {
      const messageChar = message[i];

      if (/[A-Z]/.test(messageChar)) {
        const messageCode = messageChar.charCodeAt(0);
        const keyChar = key[keyIndex % key.length];
        const keyCode = keyChar.charCodeAt(0);

        const encryptedCharCode =
          ((messageCode - 65 + (keyCode - 65)) % 26) + 65;
        encryptedMessage += String.fromCharCode(encryptedCharCode);

        keyIndex++;
      } else {
        encryptedMessage += messageChar;
      }
    }

    return this.isDirect
      ? encryptedMessage
      : encryptedMessage.split("").reverse().join("");
  }

  decrypt(encryptedMessage, key) {
    if (typeof encryptedMessage !== "string" || typeof key !== "string") {
      throw new Error("Incorrect arguments!");
    }

    encryptedMessage = encryptedMessage.toUpperCase();
    key = key.toUpperCase();
    let keyIndex = 0;
    let decryptedMessage = "";

    for (let i = 0; i < encryptedMessage.length; i++) {
      const encryptedChar = encryptedMessage[i];

      if (/[A-Z]/.test(encryptedChar)) {
        const encryptedCode = encryptedChar.charCodeAt(0);
        const keyChar = key[keyIndex % key.length];
        const keyCode = keyChar.charCodeAt(0);

        const decryptedCharCode =
          ((encryptedCode - 65 - (keyCode - 65) + 26) % 26) + 65;
        decryptedMessage += String.fromCharCode(decryptedCharCode);

        keyIndex++;
      } else {
        decryptedMessage += encryptedChar;
      }
    }

    return this.isDirect
      ? decryptedMessage
      : decryptedMessage.split("").reverse().join("");
  }
}

module.exports = {
  VigenereCipheringMachine,
};
