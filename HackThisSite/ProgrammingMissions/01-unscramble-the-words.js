const fs = require("fs");
const unzipper = require("unzipper");
const HtsDriver = require("./Shared/hts-driver");

const missionBaseUrl = "https://www.hackthissite.org/missions/prog/1";
const wordlistZipFilePath = "./Temp/01-wordlist.zip";
const wordlistExtractPath = "./Temp/01-wordlist";

const unzipFile = async (zipFilePath, outFilePath) => new Promise(resolve => {
    fs.createReadStream(zipFilePath)
        .pipe(unzipper.Extract({ path: outFilePath }))
        .on("close", resolve);
});

(async () => {
    const hts = new HtsDriver("./Shared/hts-driver.json");

    await hts.downloadFile(`${missionBaseUrl}/wordlist.zip`, wordlistZipFilePath);
    await unzipFile(wordlistZipFilePath, wordlistExtractPath);

    const sortedWordlist = fs
        .readFileSync(`${wordlistExtractPath}/wordlist.txt`, "utf-8")
        .split(/\r?\n/)
        .filter(word => word !== "")
        .map(word => ({ originalWord: word, sortedWord: word.split('').sort().join('') }))
        .sort((wordObjA, wordObjB) => (wordObjA.sortedWord > wordObjB.sortedWord) ? 1 : -1);

    await hts.initializeBrowser();
    await hts.driver.get(missionBaseUrl);

    const siteBufferText = await hts.getSiteBufferText();
    const solution = siteBufferText.match(/List of scrambled words:\s*((.|\n)+)\s*Answer:/)[1]
        .split(/\r?\n/)
        .filter(word => word.trim() !== "")
        .map(word => sortedWordlist
            .find(wordObj => wordObj.sortedWord === word.trim().split('').sort().join(''))
                .originalWord)
        .join(',');

    await hts.solveMission(solution);
    await hts.closeBrowser();
})();
