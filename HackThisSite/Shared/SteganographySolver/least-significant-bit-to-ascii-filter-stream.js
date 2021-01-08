const { Transform } = require("stream");

class LeastSignificantBitToAsciiFilterStream extends Transform {
    constructor(options = {}) {
        super(options);
    }

    _transform(data, __, callback) {
        const foundAlphanumericAsciis = [];
        const leastSignificantBits = data.toString()
            .match(/(\d)(\s|$)/g).map(n => parseInt(n)).join('');

        if (leastSignificantBits.length >= 8) {
            for (let bitIndex = 0; bitIndex < leastSignificantBits.length; bitIndex += 1) {
                const shiftedAscii = `${leastSignificantBits.slice(0, bitIndex)}0${leastSignificantBits.slice(bitIndex)}`
                    .split('').reduce((binaryStr, bit, index) =>
                        binaryStr += ((index + 1) % 8 === 0) ? `${bit} ` : bit
                    , '')
                    .split(' ').filter(binaryStr => binaryStr.length > 0)
                    .map(binaryByteStr => String.fromCharCode(parseInt(binaryByteStr, 2)))
                    .join('');

                const expectedAlphanumericLength = shiftedAscii.length;
                const shiftedAlphanumericAscii = shiftedAscii.replace(/[^A-Za-z0-9]+/g, '');
                const notFoundYet = shiftedAlphanumericAscii.length === expectedAlphanumericLength
                    && !foundAlphanumericAsciis.includes(shiftedAlphanumericAscii);

                if (notFoundYet) {
                    foundAlphanumericAsciis.push(shiftedAlphanumericAscii);

                    this.push(`${shiftedAlphanumericAscii}\n`);
                }
            }
        }

        callback();
    }
}

module.exports = LeastSignificantBitToAsciiFilterStream;
