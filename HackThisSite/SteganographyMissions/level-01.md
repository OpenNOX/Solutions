# Steganography Level 01

* **Hint:** This is an encoded message, the only tip you get is '2 null bytes'.
* "2 null bytes" leads to having to look at the `level-01.bmp` in a hex editor.
* Located the 55 bytes below between a pair of 2 null bytes.
    ```
    16 16 17 17 17 16 16 16 16 17 17 16 16 17 17 16 16 17 17 16 17 17 17 16 17 17 16 17 16 16 16 16 17 17 16 16 16 16 17 16 17 17 17 16 16 17 17 16 16 17 17 16 17 17 16
    ```
* Learned about [Least Significant Bit (LSB)](https://en.wikipedia.org/wiki/Bit_numbering#Least_significant_bit), and listed each of the 55 bytes LSB's below.
    ```
    00111000 01100110 01101110 11010000 11000010 11100110 0110110?
    ```
* Converting the LSBs binary to ASCII gives `8fn���6`, but should be a human-readable password.
* Wrote [steganography-solver.js](../Shared/SteganographySolver/steganography-solver.js) and supporting streams to find all human-readable passwords.
