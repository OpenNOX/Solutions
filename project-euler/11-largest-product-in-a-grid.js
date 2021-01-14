const fs = require("fs");

const adjacentNumberCount = 4;
const grid = fs.readFileSync("./data/011.dat", "utf-8").split("\n").map((row) => row.split(" "));
let answer = 0;

for (let y = 0; y < grid.length; y += 1) {
    for (let x = 0; x < grid[y].length; x += 1) {
        const products = new Array(4).fill(1);
        const yInBounds = y + adjacentNumberCount < grid.length;
        const xInBounds = x + adjacentNumberCount < grid[y].length;

        for (let yOffset = 0; yOffset < adjacentNumberCount; yOffset += 1) {
            for (let xOffset = 0; xOffset < adjacentNumberCount; xOffset += 1) {
                const offsetY = y + yOffset;
                const offsetX = x + xOffset;

                if (xOffset === 0 && yInBounds) {
                    products[0] *= grid[offsetY][offsetX];
                }

                if (yOffset === 0 && xInBounds) {
                    products[1] *= grid[offsetY][offsetX];
                }

                if (xOffset === yOffset && yInBounds && xInBounds) {
                    products[2] *= grid[offsetY][offsetX];

                    if (offsetX >= 0) {
                        products[3] *= grid[offsetY][offsetX - (xOffset * 2)];
                    }
                }
            }
        }

        products.forEach((product) => {
            answer = (product > answer) ? product : answer;
        });
    }
}

console.log(`Answer: ${answer}`);
