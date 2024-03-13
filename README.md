# NDCrypto - Classic Cipher Program
## II4031 Kriptografi dan Koding

## Table of Contents
- [Program Description](#program-description)
- [List of Cipher Algorithm](#list-of-cipher-algorithm)
- [Requirements](#requirements)
- [How to Run the Program](#how-to-run-the-program)
- [Project Structure](#project-structure)
- [Authors](#authors)

## Program Description
NDCrypto is a web-based application to encrypt and decrypt text or file based on user's input with some classic cipher algorithms.

## List of Cipher Algorithm
- Vigènere Cipher Standard
- Extended Vigènere Cipher
- Auto-Key Vigènere Cipher
- Playfair Cipher
- Product Cipher
- Affine Cipher

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

5. Open the program in a new browser tab or you can access the program on ``localhost:3000``


## Project Structure
    .
    ├─ public                       # Contains file sample to test the encrypt algorithm
    └─ src                          # Contains the source codes of the application
        ├─ app                      # Consists of the layout and main page of the application
        └─ utils                    # Consists of the encryption and decryption algorithms

## Progress Checklist
| | Text Input | Text File | Binary File |
|---|---|---|---|
| Standard Vigènere | &check; | &check; | |
| Extended Vigènere | &check; | &check; | &check; |
| Auto-Key Vigènere | &check; | &check; | |
| Playfair | &check; | &check; | |
| Product | &check; | &check; | |
| Affine | &check; | &check; | |

## Authors
| Student ID | Name |
|-----|----|
| 18221157 | Cathleen Lauretta |
| 18221171 | Hans Stephano Edbert N |