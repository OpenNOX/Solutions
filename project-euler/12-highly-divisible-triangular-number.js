const NoxMath = require("./shared/nox-math");

let divisors = [];
let answer = 0;

for (let i = 1; divisors.length < 500; i += 1) {
    answer += i;
    divisors = NoxMath.getProperDivisors(answer);
}

console.log(`Answer: ${answer}`);
