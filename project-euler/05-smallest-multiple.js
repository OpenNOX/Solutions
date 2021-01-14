const threshold = 20;
let answer = threshold;

while (true) {
    let isAnswer = true;

    for (let i = 3; i <= threshold; i += 1) {
        if (answer % i !== 0) {
            isAnswer = false;
            break;
        }
    }

    if (isAnswer) {
        break;
    } else {
        answer += 2;
    }
}

console.log(`Answer: ${answer}`);
