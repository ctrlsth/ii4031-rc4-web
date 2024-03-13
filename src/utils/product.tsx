import { loopKey, sanitizeKey } from './vigenere'

const BASE_ORD = 65;

export function encProduct(plainText: String, key: String): String {
    plainText = sanitizeKey(plainText);
    key = sanitizeKey(key);
    const transposition = key.length;
    key = loopKey(key, plainText.length);

    const row = Math.ceil(plainText.length / transposition);
    const column = transposition;

    var cipherResult = new String("");
    for (let x = 0; x < plainText.length; x++) {
        var cipherNum = ((plainText.charCodeAt(x) - BASE_ORD + (key.charCodeAt(x) - BASE_ORD)) % 26) + BASE_ORD;
        cipherResult += String.fromCharCode(cipherNum);
    }

    let arr_cipher: string[][] = [];
    for (let i = 0; i < row; i++) {
        arr_cipher[i] = [];
        for (let j = 0; j < column; j++) {
            if (i * column + j >= plainText.length) {
                arr_cipher[i][j] = 'Z';
            } else {
                arr_cipher[i][j] = cipherResult.charAt(i * column + j);
            }
        }
    }

    var cipherText = new String("");
    for (let j = 0; j < column; j++) { 
        for (let i = 0; i < row; i++) {
            cipherText += arr_cipher[i][j];
        }
    }

    return cipherText;
}

export function decProduct(cipherText: String, key: String): String {
    cipherText = sanitizeKey(cipherText);
    key = sanitizeKey(key);
    const transposition = key.length;
    key = loopKey(key, cipherText.length);

    const column = Math.ceil(cipherText.length / transposition);
    const row = transposition;

    let arr_cipher: string[][] = [];
    for (let i = 0; i < row; i++) {
        arr_cipher[i] = [];
        for (let j = 0; j < column; j++) {
            arr_cipher[i][j] = cipherText.charAt(i * column + j);
        }
    }

    var resultText = new String("");
    for (let j = 0; j < column; j++) { 
        for (let i = 0; i < row; i++) {
            resultText += arr_cipher[i][j];
        }
    }

    var decryptedText = new String("");
    for (let x = 0; x < resultText.length; x++) {
        var decNum = ((resultText.charCodeAt(x) - BASE_ORD - (key.charCodeAt(x) - BASE_ORD)) % 26) + BASE_ORD;
        if (decNum < 65) {
            decNum += 26;
        }
        decryptedText += String.fromCharCode(decNum);
    }
    return decryptedText;
}