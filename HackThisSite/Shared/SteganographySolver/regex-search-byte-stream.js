const { Transform } = require("stream");

class RegExSearchByteStream extends Transform {
    constructor(options = {}) {
        super(options);

        this.regExPattern = options.regExPattern;
    }

    _transform(data, __, callback) {
        for (const match of data.toString().matchAll(this.regExPattern)) {
            this.push(match[1]);
        }

        callback();
    }
}

module.exports = RegExSearchByteStream;
