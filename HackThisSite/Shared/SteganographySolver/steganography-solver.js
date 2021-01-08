const fs = require("fs");
const ByteTransformStream = require("./byte-transform-stream");
const HexToBinaryStream = require("./hex-to-binary-stream");
const LeastSignificantBitToAsciiFilterStream = require("./least-significant-bit-to-ascii-filter-stream");
const RegExSearchByteStream = require("./regex-search-byte-stream");

fs.createReadStream("../../SteganographyMissions/level-01.bmp")
    .pipe(new ByteTransformStream())
    .pipe(new RegExSearchByteStream({
        regExPattern: /00 00 ([^00]+) 00 00/g,
    }))
    .pipe(new HexToBinaryStream())
    .pipe(new LeastSignificantBitToAsciiFilterStream())
    .pipe(fs.createWriteStream("../../SteganographyMissions/level-01.txt"));
