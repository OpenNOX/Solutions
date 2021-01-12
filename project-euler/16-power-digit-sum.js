const NoxMath = require("./shared/nox-math");

const answer = NoxMath.pow(2, 1000).split('').reduce((sum, digit) =>
    sum += parseInt(digit)
, 0);

console.log(`Answer: ${answer}`);
