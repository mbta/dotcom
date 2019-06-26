import ReactServer from "react-dom/server";
import React from "react";
import readline from "readline";

import TransitNearMe from "../assets/ts/tnm/components/TransitNearMe";
import StopPage from "../assets/ts/stop/components/StopPage";
import SchedulePage from "../assets/ts/schedule/components/SchedulePage";
import ScheduleNote from "../assets/ts/schedule/components/ScheduleNote";
import ScheduleFinder from "../assets/ts/schedule/components/ScheduleFinder";
import TripPlannerResults from "../assets/ts/trip-plan-results/components/TripPlannerResults";

const Components = {
  ScheduleFinder,
  ScheduleNote,
  SchedulePage,
  StopPage,
  TransitNearMe,
  TripPlannerResults
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
    const input = JSON.parse(line);
    const result = makeHtml(input);
    const jsonResult = JSON.stringify(result) + "\n";
    // Translate zero-width space UTF-8 characters into HTML entities,
    // otherwise they are getting corrupted somewhere between here and Elixir
    const encodedJsonResult = encodeZeroWidthSpaceAsHtml(jsonResult);
    process.stdout.write(encodedJsonResult);
  });
