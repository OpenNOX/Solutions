let currentTerm = 1;
let previousTerm = 1;
let answer = 0;

while (currentTerm < 4000000) {
    let tempTerm = currentTerm;

    if (currentTerm % 2 === 0) {
        answer += currentTerm;
    }

    currentTerm += previousTerm;
    previousTerm = tempTerm;
}

console.log(`Answer: ${answer}`);
