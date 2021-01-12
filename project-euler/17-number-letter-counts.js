const NoxMath = require("./shared/nox-math");

let answer = 0;

for (let i = 1; i <= 1000; i += 1) {
    answer += NoxMath.toEnglish(i).match(/[a-z]+/g).join('').length;
}

console.log(`Answer: ${answer}`);
