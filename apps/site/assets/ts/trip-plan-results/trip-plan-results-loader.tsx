import React from "react";
import ReactDOM from "react-dom";
import TripPlannerResults, { Itinerary } from "./components/TripPlannerResults";

const render = (): void => {
  const itinDataEl = document.getElementById("js-tp-itinerary-data");
  if (!itinDataEl) return;
  const rootEl = document.getElementById("react-root");
  rootEl!.innerHTML = ""; // purge server rendered content
  const itineraryData = JSON.parse(itinDataEl.innerHTML)
    .itineraryData as Itinerary[];
  console.log(itineraryData);
  ReactDOM.render(
    <TripPlannerResults itineraryData={itineraryData} />,
    document.getElementById("react-root")
  );
};

export const onLoad = (): void => {
  render();
};

export default onLoad;
