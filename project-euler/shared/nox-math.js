const englishNumberMap = {
    ones: [
        "one"    , "two"      , "three"   , "four"    , "five"   ,
        "six"    , "seven"    , "eight"   , "nine"    , "ten"    ,
        "eleven" , "twelve"   , "thirteen", "fourteen", "fifteen",
        "sixteen", "seventeen", "eighteen", "nineteen",
    ],
    tens: [
        "ten"  , "twenty" , "thirty", "forty" , "fifty",
        "sixty", "seventy", "eighty", "ninety"
    ]
};

const getSortedLengthInputs = (number1, number2) => [
    number1.toString().split('').map(n => parseInt(n)).reverse(),
    number2.toString().split('').map(n => parseInt(n)).reverse(),
].sort((a, b) => b.length - a.length);

class NoxMath {
    static mod(number, maximum) {
        return ((number % maximum) + maximum) % maximum;
    }

    static sum(number1, number2) {
        const [num1, num2] = getSortedLengthInputs(number1, number2);
        let sumResult = '';
        let carryOver = false;

        num1.forEach((digit1, digitIndex) => {
            const digit2 = num2[digitIndex] || 0;
            const digitSum = (digit1 + digit2) + ((carryOver) ? 1 : 0);
            carryOver = (digitSum >= 10);

            sumResult = (`${digitSum - ((carryOver) ? 10 : 0)}${sumResult}`);
        });

        if (carryOver) {
            sumResult = `1${sumResult}`;
        }

        return sumResult;
    }

    static product(number1, number2) {
        const [num1, num2] = getSortedLengthInputs(number1, number2);
        const products = [];
        let carryOver = 0;

        num2.forEach((digit2, digit2Index) => {
            let product = ''.padEnd(digit2Index, '0');

            num1.forEach((digit1, digit1Index) => {
                const digitProduct = (digit1 * digit2) + carryOver;
                carryOver = (digitProduct >= 10) ? Math.floor(digitProduct / 10) : 0;

                product = `${digitProduct - (carryOver * 10)}${product}`;

                if (digit1Index + 1 >= num1.length && carryOver !== 0) {
                    product = `${carryOver}${product}`;
                    carryOver = 0;
                }
            });

            products.push(product);
        });

        return products.reduce((productResult, product) =>
            productResult = NoxMath.sum(productResult, product)
        , '0');
    }

    static pow(baseValue, power) {
        baseValue = baseValue.toString();

        let powResult = baseValue;

        for (let powerIndex = 0; powerIndex < power - 1; powerIndex += 1) {
            powResult = NoxMath.product(baseValue, powResult);
        }

        return powResult;
    }

    static factorial(number) {
        let factorialResult = '1';

        for (let i = number; i > 0; i -= 1) {
            factorialResult = NoxMath.product(factorialResult, i);
        }

        return factorialResult;
    }

    static getProperDivisors(number) {
        const properDivisors = [];

        for (let i = 1; i <= Math.floor(Math.sqrt(number)) + 1; i += 1) {
            if (number % i === 0) {
                if (number / i === i) {
                    properDivisors.push(i);
                } else {
                    properDivisors.push(i, number / i);
                }
            }
        }

        return properDivisors.filter(n => n < number).sort((a, b) => a - b);
    }

    static isPrime(number) {
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
    }

    static getPrimeFactors(number) {
        const factors = NoxMath.getProperDivisors(number);

        return factors.filter(factor => NoxMath.isPrime(factor));
    }

    static getGregorianWeekDay(year, month, day) {
        const previousYear = month < 3;
        const century = parseInt(year.toString().slice(0, 2)) - ((previousYear) ? 1 : 0);
        year = parseInt(year.toString().slice(2, 4)) - ((previousYear) ? 1 : 0);
        year = (year < 0) ? 100 + year : year;
        month = (previousYear) ? 12 - (2 - month) : 14 - month;

        return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Satruday"][
            NoxMath.mod(day + Math.floor(2.6 * month - 0.2) - 2 * century + year + Math.floor(year / 4) + Math.floor(century / 4), 7)
        ];
    }

    static toEnglish(number) {
        if (number > 1000) {
            throw new RangeError("Not implemented for numbers greater than 1000.");
        }

        const input = number.toString().split('').reverse().map(digit => parseInt(digit));
        let englishResult = '';

        input.map((digit, digitIndex) => {
            switch (digitIndex) {
                case 0:    // ones place
                    if (input.length > 1) {
                        if (input[1] === 1) {
                            englishResult = `${englishNumberMap.ones[10 + digit - 1]}${englishResult}`;
                        }
                        else if (digit === 0) {
                            break;
                        }
                        else {
                            englishResult = `${englishNumberMap.ones[digit - 1]}${englishResult}`;
                        }

                        if (input[1] >= 2) {
                            englishResult = `-${englishResult}`;
                        }
                    }
                    else {
                        englishResult = `${englishNumberMap.ones[digit - 1]}${englishResult}`;
                    }

                    break;

                case 1:    // tens place
                    if (digit >= 2) {
                        englishResult = `${englishNumberMap.tens[digit - 1]}${englishResult}`;
                    }

                    if (input.length > 2 && input[2] !== 0 && (input[1] !==0 || input[0] !== 0)) {
                        englishResult = ` and ${englishResult}`;
                    }

                    break;

                case 2:    // hundreds place
                    if (digit !== 0) {
                        englishResult = `${englishNumberMap.ones[digit - 1]} hundred${englishResult}`;
                    }

                    break;

                case 3:    // thousands place
                    englishResult = `${englishNumberMap.ones[digit - 1]} thousand${englishResult}`;
                    break;
            }
        });

        return englishResult;
    }
}

module.exports = NoxMath;
