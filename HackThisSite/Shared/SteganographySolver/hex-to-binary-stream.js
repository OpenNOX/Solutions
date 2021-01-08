const { Transform } = require("stream");

class ByteToLeastSignificantBitStream extends Transform {
    constructor(options = {}) {
        super(options);
    }

    _transform(data, __, callback) {
        this.push(data.toString().split(' ')
            .map(hexValue => parseInt(hexValue, 16).toString(2)).join(' '));

        callback();
    }
}

module.exports = ByteToLeastSignificantBitStream;
