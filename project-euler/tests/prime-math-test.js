const assert = require("assert");
const PrimeMath = require("../shared/prime-math");

describe("NoxMath", () => {
    describe(".getPrimeFactors", () => {
        describe("when returnExponentialForm is true", () => {
            it("5 returns [{base:5, power:1}]", () => {
                assert.deepStrictEqual(
                    PrimeMath.getPrimeFactors(5, true), [{ base:5, power:1 }]);
            });

            it("128 returns [{base:2, power:7}]", () => {
                assert.deepStrictEqual(
                    PrimeMath.getPrimeFactors(128, true), [{ base:2, power:7 }]);
            });

            it("644 returns [{base:2, power:2}, {base:7, power:1}, {base:23, power:1}]", () => {
                assert.deepStrictEqual(
                    PrimeMath.getPrimeFactors(644, true), [
                        { base:2, power:2 }, { base:7, power:1 }, { base:23, power:1 }
                    ]);
            });
        });

        describe("when returnExponentialForm is false", () => {
            it("5 returns [5]", () => {
                assert.deepStrictEqual(PrimeMath.getPrimeFactors(5, false), [5]);
            });

            it("128 returns [2, 2, 2, 2, 2, 2, 2]", () => {
                assert.deepStrictEqual(
                    PrimeMath.getPrimeFactors(128, false), [2, 2, 2, 2, 2, 2, 2]);
            });

            it("644 returns [2, 2, 7, 23]", () => {
                assert.deepStrictEqual(PrimeMath.getPrimeFactors(644, false), [2, 2, 7, 23]);
            });
        });
    });
});
