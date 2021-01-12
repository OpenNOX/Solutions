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