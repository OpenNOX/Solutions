const { Transform } = require("stream");

class ByteTransformStream extends Transform {
    constructor(options = {}) {
        super(options);

        this.columnWidth = options.columnWidth;
    }

    _transform(data, __, callback) {
        const bytes = [];

        data.forEach((byte, index) => {
            bytes.push(byte.toString(16).toUpperCase().padStart(2, '0'));

            if (this.columnWidth && (index + 1) % this.columnWidth === 0) {
                this.push(bytes.join(' '));

                bytes.splice(0, bytes.length);
            }
        });

        if (!this.columnWidth) {
            this.push(bytes.join(' '));
        }

        callback();
    }
}

module.exports = ByteTransformStream;
