const NoxMath = require("./shared/nox-math");

let answer = 0;

for (let i = 2; i < 2000000; i += 1) {
    if (NoxMath.isPrime(i)) {
        answer += i;
    }
}

console.log(`Answer: ${answer}`);
