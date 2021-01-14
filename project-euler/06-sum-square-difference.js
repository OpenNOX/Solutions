let sumOfSquares = 0;
let squareOfSum = 0;

for (let i = 1; i <= 100; i += 1) {
    sumOfSquares += (i * i);
    squareOfSum += i;
}

console.log(`Answer: ${(squareOfSum * squareOfSum) - sumOfSquares}`);
