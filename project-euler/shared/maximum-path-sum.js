const fs = require("fs");

const maximumPathSum = (filePath) =>
    fs.readFileSync(filePath, "utf-8")
        .split('\n')
        .map(row => (row.match(/\d+/g) || []).map(n => parseInt(n)))
        .filter(row => row.length > 0)
        .reverse()
        .reduce((pathMaxTotals, row) =>
            pathMaxTotals = row.reduce((maxRow, number, numberIndex) => {
                const leftValue = pathMaxTotals[numberIndex];
                const rightValue = pathMaxTotals[numberIndex + 1] || 0;
                const maxValue = Math.max(leftValue, rightValue);

                maxRow.push(number + maxValue);

                return maxRow;
            }, []))[0];

module.exports = maximumPathSum;
