const keyMatrix = (key: String): Array<String> => {
  /* Valid Letters as Key are the members of alphabets */
  const validLetters = "ABCDEFGHIKLMNOPQRSTUVWXYZ";

  /* k adalah key yang isinya hanya unique alphabet characters */
  var k = new String("");
  key = key
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .replace("J", "");
  /* Cek setiap huruf dalam key, kalo ada dalam ValidLetters & belum ada di k, masukin ke k */
  for (let x = 0; x < key.length; x++) {
    if (!k.includes(key[x])) {
      k += key[x];
    }
  }

  /* Menambahkan sisa alphabet yang belum ada secara berurutan */
  for (let x = 0; x < 25; x++) {
    if (!k.includes(validLetters[x])) {
      k += validLetters[x];
    }
  }

  /* Kelompokkan 5 x 5 */
  var km = new Array<String>();
  for (let x = 0; x < k.length; x += 5) {
    km.push(k.slice(x, x + 5));
  }

  return km;
};

const plainMatrix = (plaintext: String): Array<String> => {
  var pm = new Array<String>();
  // Ubah jd huruf kapital, hapus spasi, dan hapus J
  plaintext = plaintext
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .replace("J", "I");

  var loop = true;
  var x = 1;
  while (loop) {
    // Jika tidak ada 2 huruf yang sama berimpitan, cari sampe ada
    while (plaintext[x] != plaintext[x - 1]) {
      x++;
      // Jika jumlah iterasi udah sama dengan panjang plaintext, hentikan loop.
      if (x == plaintext.length) {
        loop = false;
        break;
      }
    }

    // Sisipkan 'X' (atau 'Z' jika kedua huruf merupakan huruf 'X') diantara kedua huruf
    if (plaintext[x] == "X") {
      plaintext =
        plaintext.slice(0, x) + "Z" + plaintext.slice(x, plaintext.length);
    } else if (plaintext[x] != undefined) {
      plaintext =
        plaintext.slice(0, x) + "X" + plaintext.slice(x, plaintext.length);
    }
  }

  // Jika jumlah karakter ganjil, tambahkan 'x' di akhir
  if (plaintext.length % 2 != 0) {
    plaintext += "X";
  }

  // Bentuk Array of Bigram
  for (let x = 0; x < plaintext.length; x += 2) {
    pm.push(plaintext.slice(x, x + 2));
  }

  return pm;
};

export function encPlayfair(plaintext: String, key: String): String {
  const bigrams = plainMatrix(plaintext);
  const km = keyMatrix(key);
  const encBigrams = new Array<String>();

  // Untuk setiap bigram
  for (var bigram of bigrams) {
    // Cari posisi dari setiap karakter
    var posX = [-1, -1];
    var posY = [-1, -1];
    for (let x = 0; x < 2; x++) {
      var y = 0;
      var search = true;
      while (y < 5 && search) {
        if (km[y].includes(bigram[x])) {
          posX[x] = y;
          /* cari kolom */
          posY[x] = km[y].indexOf(bigram[x]);
          search = false;
        }
        y++;
      }
    }

    // Jika sebaris, geser kanan sekali (siklik)
    if (posX[0] == posX[1]) {
      encBigrams.push(
        km[posX[0]][(posY[0] + 1) % 5] + km[posX[1]][(posY[1] + 1) % 5]
      );
    } // Jika sekolom, geser ke bawah sekali (siklik)
    else if (posY[0] == posY[1]) {
      encBigrams.push(
        km[(posX[0] + 1) % 5][posY[0]] + km[(posX[1] + 1) % 5][posY[1]]
      );
    } /* Jika beda kolom & beda baris,
      Huruf ke-1: Cari yang sebaris dengan huruf pertama dan sekolom dengan huruf kedua 
      Huruf ke-2: Cari yang sebaris dengan huruf kedua dan sekolom dengan huruf pertama */ else {
      encBigrams.push(km[posX[0]][posY[1]] + km[posX[1]][posY[0]]);
    }
  }

  // Sambungin semua isi dari Array Bigram jadi String
  return encBigrams.join("");
}

// Menghilangkan x yang pernah disisipkan,
// kecuali yang di akhir yang menggenapkan jumlah karakter
const postProcess = (text: String): String => {
  var x = 0;
  var loop = true;
  while (loop) {
    if (x + 2 <= text.length) {
      // Kesamaan Huruf ke 1 & 3     Huruf kedua = X       Huruf yg sama itu X & huruf di antaranya Z
      if (
        text[x] == text[x + 2] &&
        (text[x + 1] == "X" || (text[x] == "X" && text[x + 1] == "Z"))
      ) {
        text = text.slice(0, x + 1) + text.slice(x + 2, text.length);
      } else {
        x++;
      }
    } else {
      loop = false;
    }
  }

  return text;
};

// Mirip sama Encryption, bedanya cuma di arah enkripsi kalo sebaris, sekolom, atau tidak sama sekali
export function decPlayfair(ciphertext: String, key: String): String {
  // Bentuk Array of Bigram
  const bigrams = new Array<String>();
  for (let x = 0; x < ciphertext.length; x += 2) {
    bigrams.push(ciphertext.slice(x, x + 2));
  }
  const km = keyMatrix(key);
  const decBigrams = new Array<String>();

  for (var bigram of bigrams) {
    var posX = [-1, -1];
    var posY = [-1, -1];
    for (let x = 0; x < 2; x++) {
      var y = 0;
      var search = true;
      while (y < 5 && search) {
        if (km[y].includes(bigram[x])) {
          posX[x] = y;
          /* cari kolom */
          posY[x] = km[y].indexOf(bigram[x]);
          search = false;
        }
        y++;
      }
    }

    if (posX[0] == posX[1]) {
      decBigrams.push(
        km[posX[0]][(posY[0] + 4) % 5] + km[posX[1]][(posY[1] + 4) % 5]
      );
    } else if (posY[0] == posY[1]) {
      decBigrams.push(
        km[(posX[0] + 4) % 5][posY[0]] + km[(posX[1] + 4) % 5][posY[1]]
      );
    } else {
      decBigrams.push(km[posX[0]][posY[1]] + km[posX[1]][posY[0]]);
    }
  }

  return postProcess(decBigrams.join(""));
}
