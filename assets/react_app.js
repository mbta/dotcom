import React from "react";
import ReactServer from "react-dom/server";
import readline from "readline";

import ProjectsPage from "../assets/ts/projects/components/ProjectsPage";
import AdditionalLineInfo from "../assets/ts/schedule/components/AdditionalLineInfo";
import ScheduleFinder from "../assets/ts/schedule/components/ScheduleFinder";
import TransitNearMe from "../assets/ts/tnm/components/TransitNearMe";

const log = (title, obj) => {
  process.stdout.write(
    `node_logging ${title} ${Object.keys(obj).map(
      key => `${key}=${obj[key]}`
    )}\n`
  );
};

// log the process id when a process is started
log(`node_process`, { process: process.pid });

// log the memory usage each minute
const memoryUsage = () => {
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  log(`node_memory`, {
    process: process.pid,
    memory_in_mb: Math.round(used * 100) / 100
  });
};

const epipeBomb = (stream, callback) => {
  if (stream == null) stream = process.stdout;
  if (callback == null) callback = process.exit;

  function epipeFilter(err) {
    if (err.code === "EPIPE") return callback();

    // If there's more than one error handler (ie, us),
    // then the error won't be bubbled up anyway
    if (stream.listeners("error").length <= 1) {
      stream.removeAllListeners(); // Pretend we were never here
      stream.emit("error", err); // Then emit as if we were never here
      stream.on("error", epipeFilter); // Then reattach, ready for the next error!
    }
  }

  stream.on("error", epipeFilter);
};

epipeBomb();

const logMemoryUsage = setInterval(memoryUsage, 60000);

const Components = {
  ScheduleFinder,
  AdditionalLineInfo,
  TransitNearMe,
  ProjectsPage
};

const encodeZeroWidthSpaceAsHtml = str => str.replace(/​/g, "&#8203;");

const makeHtml = ({ name, props }) => {
  try {
    if (!Components[name]) {
      throw Error(`Unknown component: ${name}`);
    }
    const element = Components[name];
    const createdElement = React.createElement(element, props);
    const markup = ReactServer.renderToString(createdElement);

    return {
      error: null,
      markup: markup,
      component: name
    };
  } catch (err) {
    return {
      error: {
        type: err.constructor.name,
        message: err.message,
        stack: err.stack
      },
      markup: null,
      component: name
    };
  }
};

readline
  .createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  })
  .on("line", line => {
    const input = JSON.parse(line);
    const result = makeHtml(input);
    const jsonResult = JSON.stringify(result) + "\n";
    // Translate zero-width space UTF-8 characters into HTML entities,
    // otherwise they are getting corrupted somewhere between here and Elixir
    const encodedJsonResult = encodeZeroWidthSpaceAsHtml(jsonResult);
    process.stdout.write(encodedJsonResult);
  })
  .on("close", () => {
    clearInterval(logMemoryUsage);
    process.exit();
  });
