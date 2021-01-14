const pythagoreanSum = 1000;
let answer = 0;

for (let c = 3; c < pythagoreanSum; c += 1) {
    for (let b = 2; b < pythagoreanSum; b += 1) {
        for (let a = 1; a < pythagoreanSum; a += 1) {
            if ((a * a) + (b * b) === (c * c)) {
                if (a + b + c === pythagoreanSum) {
                    answer = a * b * c;

                    break;
                }
            }
        }
    }
}

console.log(`Answer: ${answer}`);
