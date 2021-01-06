const fs = require("fs");
const PNG = require("pngjs").PNG;
const HtsDriver = require("../Shared/hts-driver");

const missionBaseUrl = "https://www.hackthissite.org/missions/prog/2";
const imageFilePath = "./Temp/02-encoded-message.png";
const morseCodeMap = {
    ".-"   : 'A', "-..." : 'B', "-.-." : 'C', "-.."  : 'D', "."    : 'E', "..-." : 'F',
    "--."  : 'G', "...." : 'H', ".."   : 'I', ".---" : 'J', "-.-"  : 'K', ".-.." : 'L',
    "--"   : 'M', "-."   : 'N', "---"  : 'O', ".--." : 'P', "--.-" : 'Q', ".-."  : 'R',
    "..."  : 'S', "-"    : 'T', "..-"  : 'U', "...-" : 'V', ".--"  : 'W', "-..-" : 'X',
    "-.--" : 'Y', "--.." : 'Z', ".----": '1', "..---": '2', "...--": '3', "....-": '4',
    ".....": '5', "-....": '6', "--...": '7', "---..": '8', "----.": '9', "-----": '0',
    '/'    : ' ',
};

const getMorseCode = async () => new Promise(resolve => {
    fs.createReadStream(imageFilePath)
        .pipe(new PNG())
        .on("parsed", function () {
            const charCodes = [];
            let pixelLocation = 0;
            let previousPixelOnLocation = 0;

            for (let y = 0; y < this.height; y += 1) {
                for (let x = 0; x < this.width; x += 1) {
                    const isPixelOn = this.data[(this.width * y + x) << 2] === 255;

                    if (isPixelOn) {
                        charCodes.push(pixelLocation - previousPixelOnLocation);

                        previousPixelOnLocation = pixelLocation;
                    }

                    pixelLocation += 1;
                }
            }

            resolve(charCodes);
        });
});

(async () => {
    const hts = new HtsDriver("../Shared/hts-driver.json");

    await hts.initializeBrowser();
    await hts.driver.get(missionBaseUrl);
    await hts.saveImage("//img[@src='/missions/prog/2/PNG']", imageFilePath);
    await hts.solveMission(
        String.fromCharCode(...await getMorseCode())
            .split(' ').map(morse => morseCodeMap[morse]).join(''));
    await hts.closeBrowser();
})();
