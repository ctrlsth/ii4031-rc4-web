const BASE_ORD = 65;

export function sanitizeKey(key: String): string {
  return key.toUpperCase().replace(/[^A-Z]/g, "");
}

export function autoKey(key: String, plaintext: String): String {
  /* Nyambungin key dengan potongan plaintext hingga sepanjang plaintext */
  if (key.length >= plaintext.length) {
    return key;
  } else {
    return key += (plaintext.slice(0, plaintext.length - key.length));
  }
};

export function loopKey(key: String, n: number): String {
  /* Ngulangin key ampe panjangnya sama kayak plaintext */
  if (key.length >= n) {
    return key;
  } else {
    var x = 0;
    var fk = new String(key)
    while (fk.length != n) {
      fk += key.charAt(x);
      x++;
      if (x == key.length) {
        x = 0;
      }
    }
    return fk;
  }
};

export function encVigenere(plaintext: String, key: String, type: number): String {
  var fullkey = new String("");
  var ciphertext = new String("");

  if (type == 2) {
    key = sanitizeKey(key)
    fullkey = loopKey(key, plaintext.length);
    for (let x = 0; x < plaintext.length; x++) {
      var cipherNum = ((plaintext.charCodeAt(x) - BASE_ORD + (fullkey.charCodeAt(x) - BASE_ORD)) % 256) + BASE_ORD;
      ciphertext += String.fromCharCode(cipherNum); //String.fromCharCode ngubah ASCII ke Character
    }
  } else {
    plaintext = sanitizeKey(plaintext);
    key = sanitizeKey(key);
  
    if (type == 0) {
      fullkey = loopKey(key, plaintext.length);
    } else {
      fullkey = autoKey(key, plaintext);
    }

    for (let x = 0; x < plaintext.length; x++) {
      /* cipherNum adalah huruf dalam plaintext yang diconvert ke ASCII kemudian dienkripsi memakai key */
      const cipherNum = ((plaintext.charCodeAt(x) - BASE_ORD + (fullkey.charCodeAt(x) - BASE_ORD)) % 26) + BASE_ORD;
      ciphertext += String.fromCharCode(cipherNum); //String.fromCharCode ngubah ASCII ke Character
    }
  }
  return ciphertext;
}

export function decVigenere(ciphertext: String, key: String, type: number): String {
  var fullkey = new String("");
  var decryptedtext = new String("");

  if (type == 2) {
    key = sanitizeKey(key)
    fullkey = loopKey(key, ciphertext.length);

    for (let x = 0; x < ciphertext.length; x++) {
      var cipherNum = ((ciphertext.charCodeAt(x) - BASE_ORD - (fullkey.charCodeAt(x) - BASE_ORD)) % 256) + BASE_ORD;
      if (cipherNum < 0) {
        cipherNum += 256;
      }
      decryptedtext += (String.fromCharCode(cipherNum));
    }
  } else {
    ciphertext = sanitizeKey(ciphertext);
    key = sanitizeKey(key);

    if (type == 0) {
      fullkey = loopKey(key, ciphertext.length);
    } else if (type == 1) {
      fullkey = key;
    }

    for (let x = 0; x < ciphertext.length; x++) {
      var cipherNum = ((ciphertext.charCodeAt(x) - BASE_ORD - (fullkey.charCodeAt(x) - BASE_ORD)) % 26) + BASE_ORD;
      if (cipherNum < 65) {
        cipherNum += 26;
      }
      (type == 1) ? fullkey += String.fromCharCode(cipherNum) : null;
      decryptedtext += (String.fromCharCode(cipherNum));
    }
  }
  return decryptedtext;
}
