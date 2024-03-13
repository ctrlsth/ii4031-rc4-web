const BASE_ORD = 65;
const ALPHA_NUM = 26;

const inverseMod = (a: number, mod: number): number => {
  for (let x = 1; x < mod; x++) {
    if (((a % mod) * (x % mod)) % mod == 1) {
      return x;
    }
  }
  throw new Error("Can Not Find Mod Inverse!");
};

export const relativelyPrime = (m: number): boolean => {
  if (m % 2 == 0 || m % 13 == 0 || m % ALPHA_NUM == 0 || m <= 1) {
    return false;
  }
  return true;
};

export function encAffine(m: number, plaintext: String, b: number): String {
  if (relativelyPrime(m)) {
    var ciphertext = new String("");
    plaintext = plaintext.toUpperCase().replace(/[^A-Z]/g, "");
    for (let x = 0; x < plaintext.length; x++) {
      const cipherNum =
        ((m * (plaintext.charCodeAt(x) - BASE_ORD) + b) % ALPHA_NUM) + BASE_ORD;
      ciphertext += String.fromCharCode(cipherNum);
    }
    return ciphertext;
  }
  return "M-Key is Not Relatively Prime to 26";
}

export function decAffine(m: number, ciphertext: String, b: number): String {
  if (relativelyPrime(m)) {
    var decryptedtext = new String("");
    ciphertext.toUpperCase().replace(/[^A-Z]/g, "");
    for (let x = 0; x < ciphertext.length; x++) {
      const decryptedNum =
        ((((inverseMod(m, ALPHA_NUM) *
          (ciphertext.charCodeAt(x) - BASE_ORD - b)) %
          ALPHA_NUM) +
          ALPHA_NUM) %
          ALPHA_NUM) +
        BASE_ORD;
      decryptedtext += String.fromCharCode(decryptedNum);
    }
    return decryptedtext;
  }
  return "M-Key is Not Relatively Prime to 26";
}
