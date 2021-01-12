const assert = require("assert");
const NoxMath = require("../shared/nox-math");

describe("NoxMath", () => {
    describe(".sum", () => {
        const number1 = 85315486;
        const number2 = 22164;

        it("returns correct value when number1 length less than number2 length", () => {
            assert.strictEqual(NoxMath.sum(number1, number2), (number1 + number2).toString());
        });

        it("returns correct value when number1 length greater than number2 length", () => {
            assert.strictEqual(NoxMath.sum(number2, number1), (number2 + number1).toString());
        });

        it("returns correct value when number1 length is equal to number 2 length", () => {
            assert.strictEqual(NoxMath.sum(number1, number1), (number1 + number1).toString());
        });
    });

    describe(".product", () => {
        const number1 = 202093;
        const number2 = 3029;

        it("returns correct value when number1 length less than number2 length", () => {
            assert.strictEqual(NoxMath.product(number1, number2), (number1 * number2).toString());
        });

        it("returns correct value when number1 length greater than number2 length", () => {
            assert.strictEqual(NoxMath.product(number2, number1), (number2 * number1).toString());
        });

        it("returns correct value when number1 length is equal to number 2 length", () => {
            assert.strictEqual(NoxMath.product(number1, number1), (number1 * number1).toString());
        });
    });

    describe(".pow", () => {
        it("returns correct value", () => {
            const baseValue = 2;
            const power = 15;

            assert.strictEqual(NoxMath.pow(baseValue, power), (Math.pow(baseValue, power)).toString());
        });
    });

    describe(".toEnglish", () => {
        it("throws not implemented error when input greater than 1000", () => {
            assert.throws(() => { NoxMath.toEnglish(1467) }, RangeError, "Not implemented for numbers greater than 1000.");
        });

        it("2 returns 'two'", () => {
            assert.strictEqual(NoxMath.toEnglish(2), "two");
        });

        it("13 returns 'thirteen'", () => {
            assert.strictEqual(NoxMath.toEnglish(13), "thirteen");
        });

        it("104 returns 'one hundred and four'", () => {
            assert.strictEqual(NoxMath.toEnglish(104), "one hundred and four");
        });

        it("324 returns 'three hundred and twenty-four'", () => {
            assert.strictEqual(NoxMath.toEnglish(324), "three hundred and twenty-four");
        });

        it("420 returns 'four hundred and twenty'", () => {
            assert.strictEqual(NoxMath.toEnglish(420), "four hundred and twenty");
        });

        it("800 returns 'eight hundred'", () => {
            assert.strictEqual(NoxMath.toEnglish(800), "eight hundred");
        });

        it("1000 returns 'one thousand'", () => {
            assert.strictEqual(NoxMath.toEnglish(1000), "one thousand");
        });
    });
});
