const fs = require("fs");

const adjacentDigitCount = 13;
let data = fs.readFileSync("./data/008.dat", "utf-8").split("\n").join("").split("");
let answer = 0;

for (let i = 0; i <= data.length - adjacentDigitCount; i += 1) {
    let product = 1;

    for (let offset = 0; offset < adjacentDigitCount; offset += 1) {
        product *= data[i + offset];
    }

    answer = (product > answer) ? product : answer;
}

console.log(`Answer: ${answer}`);
