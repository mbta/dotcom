import React from "react";
import { createRoot } from "react-dom/client";
import TripPlannerResults, { Itinerary } from "./components/TripPlannerResults";

const render = (): void => {
  const itinDataEl = document.getElementById("js-tp-itinerary-data");
  if (!itinDataEl) return;
  const rootEl = document.getElementById("react-root");
  rootEl!.innerHTML = ""; // purge server rendered content
  const itineraryData = JSON.parse(itinDataEl.innerHTML)
    .itineraryData as Itinerary[];
  const root = createRoot(document.getElementById("react-root")!);
  root.render(<TripPlannerResults itineraryData={itineraryData} />);
};

export const onLoad = (): void => {
  render();
};

export default onLoad;
