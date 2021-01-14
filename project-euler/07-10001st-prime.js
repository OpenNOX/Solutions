const NoxMath = require("./shared/nox-math");

let primeCount = 0;
let answer = 2;

for (let i = 2; primeCount < 10001; i += 1) {
    if (NoxMath.isPrime(i)) {
        primeCount += 1;
        answer = i;
    }
}

console.log(`Answer: ${answer}`);
