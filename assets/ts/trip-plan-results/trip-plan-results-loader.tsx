import React from "react";
import ReactDOM from "react-dom";
import TripPlannerResults, { Itinerary } from "./components/TripPlannerResults";

const render = (): void => {
  const itinDataEl = document.getElementById("js-tp-itinerary-data");
  if (!itinDataEl) return;
  const rootEl = document.getElementById("react-root");
  rootEl!.innerHTML = ""; // purge server rendered content
  const data = JSON.parse(itinDataEl.innerHTML);
  const itineraryData = data.itineraryData as Itinerary[];
  ReactDOM.render(
    <TripPlannerResults
      itineraryData={itineraryData}
      metadata={data.metadata}
    />,
    document.getElementById("react-root")
  );
};

export const onLoad = (): void => {
  render();
};

export default onLoad;
