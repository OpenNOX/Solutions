const NoxMath = require("./shared/nox-math");

const answer = NoxMath.factorial(100)
    .split('')
    .map(digit => parseInt(digit))
    .reduce((sum, digit) => sum += digit);

console.log(`Answer: ${answer}`);
