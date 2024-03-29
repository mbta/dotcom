const cron = require("node-cron");
const fs = require("fs");
const path = require("path");
const { Worker } = require("worker_threads");

const { fileToMetricName } = require("../utils");

const filesPath = path.join(__dirname, "..", "scenarios");

const workers = fs.readdirSync(filesPath).map((file) => {
  const name = fileToMetricName(file);
  const worker = new Worker(path.join(__dirname, "worker.js"), {
    workerData: { name, path: path.join(filesPath, file) },
  });

  return worker;
});

cron.schedule("* * * * *", (_) => {
  workers.forEach((worker, index) => {
    setTimeout(
      (_) => {
        worker.postMessage(null);
      },
      (60000 / workers.length) * index,
    );
  });
});
