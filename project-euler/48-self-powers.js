const os = require("os");
const { isMainThread, parentPort, Worker, workerData } = require("worker_threads");
const NoxMath = require("./shared/nox-math");

const cpuCount = os.cpus().length;

if (isMainThread) {
    const threadRange = Math.floor(1000 / cpuCount);
    const threadRangeRemainder = 1000 % threadRange;
    let answer = '0';
    let workersCompleted = 0;

    for (let i = 0; i < cpuCount; i += 1) {
        const start = (i * threadRange) + 1 + ((i === 0) ? 0 : threadRangeRemainder);
        const end = start + threadRange - 1 + ((i === 0) ? threadRangeRemainder : 0);
        const worker = new Worker(__filename, { workerData: { start, end } });

        worker.once("message", (threadAnswer) => {
            answer = NoxMath.sum(answer, threadAnswer);

            workersCompleted += 1;

            if (workersCompleted === cpuCount) {
                console.log(`Answer: ${answer.slice(answer.length - 10)}`);
            }
        });
    }
} else {
    let threadAnswer = '0';

    for (let i = workerData.start; i <= workerData.end; i += 1) {
        threadAnswer = NoxMath.sum(threadAnswer, NoxMath.pow(i, i));
    }

    parentPort.postMessage(threadAnswer);
    process.exit();
}
