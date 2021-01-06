const HtsDriver = require("../Shared/hts-driver");

const missionBaseUrl = "https://www.hackthissite.org/missions/prog/11";

(async () => {
    const hts = new HtsDriver("../Shared/hts-driver.json");

    await hts.initializeBrowser();
    await hts.driver.get(missionBaseUrl);

    const siteBufferText = await hts.getSiteBufferText();
    const shift = parseInt(siteBufferText.match(/\n\nShift: (.+)\n\n/)[1]);
    const solution = String.fromCharCode(...siteBufferText
        .match(/\n\nGenerated String: (.+)\n\n/)[1]
        .split(/[^0-9]+/)
        .filter(value => value !== "")
        .map(value => parseInt(value) - shift));

    await hts.solveMission(solution);
    await hts.closeBrowser();
})();
