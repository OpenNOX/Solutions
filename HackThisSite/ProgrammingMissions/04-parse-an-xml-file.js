const fs = require("fs");
const { createCanvas } = require("canvas");
const xml2js = require("xml2js");

const getXml = (xmlFilePath) => new Promise((resolve, reject) => {
    xml2js.parseString(fs.readFileSync(xmlFilePath, "utf-8"), (error, result) => {
        if (error) {
            reject(error);
        } else {
            resolve(result);
        }
    });
});

const drawLines = (xml, outputFilePath, lineColor) => {
    const canvasWidth = 768;
    const canvasHeight = 768;
    const canvas = createCanvas(canvasWidth, canvasHeight);
    const context = canvas.getContext("2d");

    context.fillStyle = "black";
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    xml.Line
        .map(line => ({
            strokeStyle: (line.Color) ? line.Color[0] : "white",
            startPoint: {
                x: parseFloat(line.XStart[0]),
                y: canvasHeight - parseFloat(line.YStart[0]),
            },
            endPoint: {
                x: parseFloat(line.XEnd[0]),
                y: canvasHeight - parseFloat(line.YEnd[0]),
            },
        }))
        .filter(line => lineColor === undefined || line.strokeStyle === lineColor)
        .forEach(line => {
            context.strokeStyle = line.strokeStyle;
            context.beginPath();
            context.moveTo(line.startPoint.x, line.startPoint.y);
            context.lineTo(line.endPoint.x, line.endPoint.y);
            context.stroke();
        });

    const degreesToRadians = Math.PI / 180;

    xml.Arc
        .map(arc => ({
            strokeStyle: (arc.Color) ? arc.Color[0] : "white",
            radius: parseFloat(arc.Radius[0]),
            arcCenter: {
                x: parseFloat(arc.XCenter[0]),
                y: canvasHeight - parseFloat(arc.YCenter[0]),
            },
            radians: {
                start: (-parseInt(arc.ArcStart[0]) + -parseInt(arc.ArcExtend[0])) * degreesToRadians,
                end: -parseInt(arc.ArcStart[0]) * degreesToRadians,
            },
        }))
        .filter(arc => lineColor === undefined || arc.strokeStyle === lineColor)
        .forEach((arc, i) => {
            context.strokeStyle = arc.strokeStyle;
            context.beginPath();
            context.arc(arc.arcCenter.x, arc.arcCenter.y, arc.radius, arc.radians.start,
                arc.radians.end);
            context.stroke();
        });

    fs.writeFileSync(outputFilePath, canvas.toDataURL("image/png").split(',')[1], "base64");
};

(async () => {
    const colorNames = ["blue", "green", "red", "yellow", "white"];

    const xml = await getXml("./Temp/04-line-plots.xml");

    colorNames.forEach(colorName => {
        drawLines(xml.ppcPlot, `./Temp/04-${colorName}-line-plots.png`, colorName);
    });

    drawLines(xml.ppcPlot, './Temp/04-all-line-plots.png');
})();
