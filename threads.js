const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");

if (isMainThread) {
  console.log("---START--- main thread");
  const worker = new Worker(__filename, {
    workerData: {
      outputPrefix: "Received message",
      timeToWaste: 500,
    },
  });

  worker.on("message", (msg) => {
    console.log(`${msg} msg from worker ${worker.threadId}`);
  });

  worker.postMessage("hey this is main my work is done");

  console.log("---END--- of main");
} else {
  console.log("---START--- starting in worker");
  parentPort.on(`${workerData.outputPrefix}`, (msg) => {
    console.log(msg);
  });

  parentPort.postMessage("getting started");
  wasteTime(workerData.timeToWaste);
  parentPort.postMessage("in middle");
  wasteTime(workerData.timeToWaste);
  parentPort.postMessage("done");

  console.log("---END--- ending worker");
}

function wasteTime(delay) {
  const end = Date.now() + delay;
  while (Date.now() < end) {}
}
