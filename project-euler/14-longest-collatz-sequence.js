let answer = {
    number: 0,
    length: 0
};

for (let i = 2; i < 1000000; i += 1) {
    const chain = [];
    let n = i;

    while (n !== 1) {
        chain.push(n);

        if (n % 2 === 0) {
            n /= 2;
        } else {
            n = (3 * n) + 1;
        }
    }

    answer = (chain.length > answer.length) ? { number: i, length: chain.length } : answer;
}

console.log(`Answer: ${answer.number}`);
