const PrimeMath = require("./shared/prime-math");


//  -----  Inputs    -----
const consecutiveNumberTarget = 4;
const distinctPrimeFactorTargetCount = 4;


//  -----  Solution  -----
let previousMatchedNumber = 0;
let consecutiveNumberCount = 0;
let i = 1;
while (consecutiveNumberCount < consecutiveNumberTarget) {
    const primeFactors = PrimeMath.getPrimeFactors(i, true);

    if (primeFactors.length === distinctPrimeFactorTargetCount
        && (previousMatchedNumber === i - 1 || previousMatchedNumber === 0)) {
        previousMatchedNumber = i;
        consecutiveNumberCount += 1;
    }
    else if (consecutiveNumberCount !== 0) {
        previousMatchedNumber = 0;
        consecutiveNumberCount = 0;
    }

    i += 1;
}

const answer = previousMatchedNumber - consecutiveNumberTarget + 1;

console.log(`Answer ${answer}`);
