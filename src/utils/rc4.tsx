const MAX_LENGTH = 256;

export const relativelyPrime = (m: number): boolean => {
  if (m % 2 == 0 || m % MAX_LENGTH == 0 || m <= 1) {
    return false;
  }
  return true;
};

function ksa(key: string, m: number, b: number): Array<number> {
  // 1. Buat Larik
  var S = new Array<number>(MAX_LENGTH);
  for (let x = 0; x < 256; x++) {
    S[x] = x;
  }

  // 2. Permutasikan (Acak) dengan Key
  var y = 0;
  for (let x = 0; x < MAX_LENGTH; x++) {
    y = (y + S[x] + key.charCodeAt(x % key.length)) % MAX_LENGTH;
    [S[x], S[y]] = [S[y], S[x]];
  }

  // MODIFICATION
  // 3. Ubah Value Stream dengan Konsep Affine Cipher
  if (relativelyPrime(m)) {
    for (let x = 0; x < MAX_LENGTH; x++) {
      S[x] = (m * S[x] + b) % MAX_LENGTH;
    }
  }

  return S;
}

export function rc4(
  key: string,
  plaintext: string,
  m: number,
  b: number
): String {
  var ciphertext = new String("");

  /* Key-Scheduling Algorithm */
  var S = ksa(key, m, b);

  /* Pseudo-Random Generation Algorithm (Encryption Included) */
  // 1. Ambil S[i] dan S[j]
  // 2. Tukar Value
  // 3. Jumlahkan S[i] dan S[j], lalu modulasikan dengan MAX_LENGTH
  var i = 0;
  var j = 0;

  for (let x = 0; x < plaintext.length; x++) {
    // MODIFICATION
    // Pengambilan i dipengaruhi oleh Key dengan konsep Extended Viginere Cipher
    i = (((i + 1) % MAX_LENGTH) + key.charCodeAt(x % key.length)) % MAX_LENGTH;

    j = (j + S[i]) % MAX_LENGTH;
    [S[i], S[j]] = [S[j], S[i]];

    /*** Enkripsikan! ***/
    var c = S[(S[i] + S[j]) % MAX_LENGTH] ^ plaintext.charCodeAt(x);
    ciphertext += String.fromCharCode(c);
  }

  return ciphertext;
}
