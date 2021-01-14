const fs = require("fs");

const numbers = fs.readFileSync("./data/013.dat", "utf-8").split("\n").map(number =>
    number.trim().split("").reverse().map(digit => parseInt(digit)));
let answer = [];

for (let i = 0; i < numbers.length; i += 1) {
    for (let d = 0; d < numbers[i].length; d += 1) {
        if (i === 0) {
            answer = numbers[i];
            continue;
        }

        let sum = answer[d] + numbers[i][d];

        if (sum < 10) {
            answer[d] = sum;
        } else {
            answer[d] = sum - 10;

            if (d === answer.length - 1) {
                answer.push(1);
            } else {
                answer[d + 1] += 1;
            }
        }
    }
}

answer = answer.reverse().slice(0, 9).join("");

console.log(`Answer: ${answer}`);
