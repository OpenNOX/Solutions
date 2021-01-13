const minimum = parseInt('1'.padEnd(3, '0'));
const maximum = (minimum * 10) - 1;
let answer = 0;

for (let a = minimum; a <= maximum; a += 1) {
    for (let b = minimum; b <= maximum; b += 1) {
        const product = a * b;

        if (product.toString() === product.toString().split('').reverse().join('')) {
            answer = (product > answer) ? product : answer;
        }
    }
}

console.log(`Answer: ${answer}`);
