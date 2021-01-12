const assert = require("assert");
const maximumPathSum = require("../shared/maximum-path-sum");

describe("maximumPathSum", () => {
    it("returns the maximum path sum of the given triangle data file", () => {
        assert.strictEqual(maximumPathSum("./data/maximum-path-sum-triangle.dat"), 23);
    });
});
