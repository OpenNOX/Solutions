const gridSize = 20;
let answer = 1;

for (let i = 0; i < gridSize; i += 1) {
    answer *= (2 * gridSize) - i;
    answer /= i + 1
}

console.log(`Answer: ${answer}`);
