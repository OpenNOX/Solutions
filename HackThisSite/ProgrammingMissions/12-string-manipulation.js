const HtsDriver = require("./Shared/hts-driver");

const missionBaseUrl = "https://www.hackthissite.org/missions/prog/12";

const isPrime = (number) => {
    if (number < 2 ) {
        return false;
    }

    if (number === 2) {
        return true;
    } else if (number % 2 === 0) {
        return false;
    }

    for (var i = 3; i * i <= number; i += 2) {
        if (number % i === 0) {
            return false;
        }
    }

    return true;
};

(async () => {
    const hts = new HtsDriver("./Shared/hts-driver.json");

    await hts.initializeBrowser();
    await hts.driver.get(missionBaseUrl);

    const inputString = await (
        await hts.getElementByXPath("//td[@class='sitebuffer']//input[@type='text']")
    ).getAttribute("value");


    const classifiedNumbers = { composite: [], prime: [] };

    inputString.match(/[2-9]/g).forEach(numberStr => {
        const number = parseInt(numberStr);

        if (isPrime(number)) {
            classifiedNumbers.prime.push(number);
        } else {
            classifiedNumbers.composite.push(number);
        }
    });

    const reduceFunc = (sum, value) => sum += value;
    const product = classifiedNumbers.composite.reduce(reduceFunc, 0) *
        classifiedNumbers.prime.reduce(reduceFunc, 0);
    const asciiValue = inputString.match(/[^0-9]+/g).join('').substr(0, 25).split('')
        .map(char => String.fromCharCode(char.charCodeAt(0) + 1)).join('');

    await hts.solveMission(`${asciiValue}${product}`)
    await hts.closeBrowser();
})();
