# Modified RC4 - Stream Cipher Tool

## II4031 Kriptografi dan Koding

## Table of Contents

- [Program Description](#program-description)
- [List of Cipher Algorithm](#list-of-cipher-algorithm)
- [Requirements](#requirements)
- [How to Run the Program](#how-to-run-the-program)
- [Project Structure](#project-structure)
- [Authors](#authors)

## Program Description

Modified RC4 - Stream Cipher Tool is a web-based application to encrypt and decrypt text or file based on user's input using a **modified RC4 algorithm**. The modification are applied in both of ARCFOUR's internal algorithm: _Key-Scheduling Algorithm (KSA)_ & _Pseudo-Random Generation Algorithm (PRGA)_.

### Modifications
#### Key-Scheduling Algorithm (KSA)
```
// MODIFICATION
// 3. Ubah Value Stream dengan Konsep Affine Cipher
if (relativelyPrime(m)) {
   for (let x = 0; x < MAX_LENGTH; x++) {
   S[x] = (m * S[x] + b) % MAX_LENGTH;
   }
}
```
#### Pseudo-Random Generation Algorithm (PRGA)
```
// MODIFICATION
   // Pengambilan i dipengaruhi oleh Key dengan konsep Extended Viginere Cipher
   i = (((i + 1) % MAX_LENGTH) + key.charCodeAt(x % key.length)) % MAX_LENGTH;
```

## Requirements

- [NodeJS](https://nodejs.org/en/download)

## How to Run the Program

1. Clone this repository

   ```sh
   git clone https://github.com/cathlauretta/II4031-classic-cipher.git
   ```

2. Change the directory to the cloned repository

   ```sh
   cd II4031-classic-cipher
   ```

3. Install the required package

   ```
   npm install
   ```

4. Run the program

   ```
   npm run dev
   ```

5. Open the program in a new browser tab or you can access the program on `localhost:3000`

## Project Structure

    .
    ├─ public                       # Contains file sample to test the encrypt algorithm
    └─ src                          # Contains the source codes of the application
        ├─ app                      # Consists of the layout and main page of the application
        └─ utils                    # Consists of the Modified ARCFOUR encryption and decryption algorithms

## Authors

| Student ID | Name                   |
| ---------- | ---------------------- |
| 18221157   | Cathleen Lauretta      |
| 18221171   | Hans Stephano Edbert N |
