const BASE_ORD = 65;
const MAX_LENGTH = 256;

export function rc4(key: string, plaintext: string): String {
  var ciphertext = new String();

  /* Key-Scheduling Algorithm */
  // 1. Buat Larik
  var S = new Array<number>(MAX_LENGTH);
  for (let x = 0; x < 256; x++) {
    S[x] = x;
  }

  // 2. Permutasikan (Acak) dengan Key
  var y = 0;
  for (let x = 0; x < 256; x++) {
    y = y + S[x] + (key.charCodeAt(x % key.length) % MAX_LENGTH);
    [S[x], S[y]] = [S[y], S[x]];
  }

  /* Pseudo-Random Generation Algorithm */
  // 1. Ambil S[i] dan S[j]
  // 2. Tukar Value
  // 3. Jumlahkan S[i] dan S[j], lalu modulasikan dengan MAX_LENGTH
  // 4. Gunakan hasil pada langkah ke-3 sebagai indeks dari KUNCI ALIR yang terpilih
  // 5. Enkripsi plainteks dengan KUNCI ALIR
  var i = 0;
  var j = 0;
  for (let x = 0; x < plaintext.length; x++) {
    i = (i + 1) % MAX_LENGTH;
    j = (j + S[i]) % MAX_LENGTH;
    [S[i], S[j]] = [S[j], S[i]];
    var c = S[(S[i] + S[j]) % MAX_LENGTH] ^ plaintext.charCodeAt(x);
    ciphertext += String.fromCharCode(c);
  }

  return ciphertext;
}
