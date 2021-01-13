const NoxMath = require("./shared/nox-math");

let answer = 0;

for (let year = 1901; year <= 2000; year += 1) {
    for (let month = 1; month <= 12; month += 1) {
        answer += (NoxMath.getGregorianWeekDay(year, month, 1) === "Sunday") ? 1 : 0;
    }
}

console.log(`Answer: ${answer}`);
