import ReactServer from "react-dom/server";
import React from "react";
import readline from "readline";
import fs from "fs";
import TransitNearMe from "../assets/ts/tnm/components/TransitNearMe";
import StopPage from "../assets/ts/stop/components/StopPage";
import SchedulePage from "../assets/ts/schedule/components/SchedulePage";
import ScheduleNote from "../assets/ts/schedule/components/ScheduleNote";
import ScheduleFinder from "../assets/ts/schedule/components/ScheduleFinder";
import ScheduleDirection from "../assets/ts/schedule/components/ScheduleDirection";
import TripPlannerResults from "../assets/ts/trip-plan-results/components/TripPlannerResults";
import MoreProjectsTable from "../assets/ts/projects/components/MoreProjectsTable";
import ProjectBanner from "../assets/ts/projects/components/Banner.tsx";
import FeaturedProjectsList from "../assets/ts/projects/components/FeaturedProjectsList";

// create a stream for logging
const log = fs.createWriteStream("nodejs.log", { flags: "a" });

// use this stream for stderr output
process.stderr.pipe(log);

// log the process id when a process is started
log.write(`node_process process=${process.pid}\n`);

// log the memory usage each minute
const memoryUsage = () => {
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  log.write(
    `node_memory process=${process.pid} memory_in_mb=${Math.round(used * 100) /
      100}\n`
  );
};
setInterval(memoryUsage, 60000);

const Components = {
  ScheduleDirection,
  ScheduleFinder,
  ScheduleNote,
  SchedulePage,
  StopPage,
  TransitNearMe,
  TripPlannerResults,
  MoreProjectsTable,
  ProjectBanner,
  FeaturedProjectsList
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

process.stdin.on("end", () => {
  process.exit();
});

readline
  .createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  })
  .on("line", line => {
    const hrstart = process.hrtime();
    const input = JSON.parse(line);
    const result = makeHtml(input);
    const jsonResult = JSON.stringify(result) + "\n";
    // Translate zero-width space UTF-8 characters into HTML entities,
    // otherwise they are getting corrupted somewhere between here and Elixir
    const encodedJsonResult = encodeZeroWidthSpaceAsHtml(jsonResult);
    process.stdout.write(encodedJsonResult);
    const hrend = process.hrtime(hrstart);

    // log request time
    log.write(`node_req_time milliseconds=${hrend[1] / 1000000}\n`);
  });
