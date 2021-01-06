const fs = require("fs");
const https = require("https");
const edge = require("selenium-webdriver/edge");
const { By, Key, until} = require("selenium-webdriver");

class HtsDriver {
    constructor(configFilePath) {
        this.config = JSON.parse(fs.readFileSync(configFilePath));
        this.driver = null;
    }

    async initializeBrowser() {
        const options = new edge.Options();

        if (this.config.headless) {
            options.addArguments("headless");
        }

        this.driver = await edge.Driver.createSession(options);

        await this.driver.get("https://www.hackthissite.org");
        await this.driver.findElement(By.name("username"))
            .sendKeys(this.config.login.username, Key.TAB, this.config.login.password, Key.ENTER);
        await this.driver.wait(until.elementLocated(
            By.xpath(`//a[@href="/user/view/${this.config.login.username}/"]`)));
    }

    async getSiteBufferText() {
        return await this.driver.findElement(By.xpath("//td[@class='sitebuffer']")).getText();
    }

    async getElementByXPath(elementXPath) {
        return this.driver.findElement(By.xpath(elementXPath));
    }

    async solveMission(solution) {
        const resultXPath = "//td[@class='sitebuffer']//div[@class='light-td']";

        await this.driver.findElement(By.name("solution")).sendKeys(solution);
        await this.driver.findElement(By.name("submitbutton")).click()
        await this.driver.wait(until.elementLocated(By.xpath(resultXPath)));

        const result = await this.driver.findElement(By.xpath(resultXPath)).getText();

        console.log(`Solution: ${solution}`);
        console.log(`Result  : ${result}`);
    }

    async closeBrowser() {
        this.driver.quit();
    }

    async downloadFile(fileUrl, filePath) {
        await new Promise(resolve => {
            https.get(fileUrl)
                .on("response", response => {
                    response.pipe(fs.createWriteStream(filePath).on("finish", resolve));
                });
        });
    }

    async saveImage(elementXPath, filePath) {
        await this.driver.findElement(By.xpath(elementXPath)).takeScreenshot()
            .then(image => {
                fs.writeFileSync(filePath, image, "base64");
            });
    }
}

module.exports = HtsDriver;
