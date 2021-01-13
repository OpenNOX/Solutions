const NoxMath = require("./shared/nox-math");

let answer = 0;

for (let i = 3; i < 10000; i += 1) {
    const properDivisorsSum1 = NoxMath.getProperDivisors(i)
        .reduce((sum, divisor) => sum += divisor, 0);
    const properDivisorsSum2 = NoxMath.getProperDivisors(properDivisorsSum1)
        .reduce((sum, divisor) => sum += divisor, 0);

    if (properDivisorsSum1 !== i && properDivisorsSum2 === i) {
        answer += i + properDivisorsSum1;

        i = properDivisorsSum1;
    }
}

console.log(`Answer: ${answer}`);
