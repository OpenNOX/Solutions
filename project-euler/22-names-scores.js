const fs = require("fs");

const answer = fs.readFileSync("./data/022.dat", "utf-8")
    .split(/","|"/)
    .filter(name => name !== '')
    .sort()
    .reduce((nameScoresTotal, name, nameIndex) =>
        nameScoresTotal += (nameIndex + 1) * name.split('').reduce((nameScore, letter) =>
            nameScore += letter.charCodeAt(0) - 64
        , 0)
    , 0);

console.log(`Answer: ${answer}`);
