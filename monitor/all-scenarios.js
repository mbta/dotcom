const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const { Worker } = require('worker_threads');

const filesPath = path.join(__dirname, '..', 'scenarios');

cron.schedule('* * * * *', () => {
    fs.readdirSync(filesPath).forEach((file) => {
        const worker = new Worker(path.join(__dirname, 'worker.js'));
    
        worker.on('message', (message) => {
            console.log(message);
        });
    
        worker.postMessage(path.join(filesPath, file));
    });
});
