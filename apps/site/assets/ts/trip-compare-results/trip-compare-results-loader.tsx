import React from "react";
import { createRoot } from "react-dom/client";
import TripCompareResults from "./components/TripCompareResults";
import { Itinerary } from "./components/TripPlannerResults";

const render = (jsId: string, reactId: string): void => {
  const itinDataEl = document.getElementById(jsId);
  if (!itinDataEl) return;

  const rootEl = document.getElementById(reactId);
  rootEl!.innerHTML = ""; // purge server rendered content

  const json = JSON.parse(itinDataEl.innerHTML);
  const itineraryData = json.itineraryData as Itinerary[];
  const itineraryHeader = json.itineraryExplanation as string;

  const root = createRoot(document.getElementById(reactId)!);
  root.render(
    <TripCompareResults
      itineraryData={itineraryData}
      itineraryHeader={itineraryHeader}
    />
  );
};

export const onLoad = (): void => {
  render("js-tp-itinerary-data", "react-root");
};

export default onLoad;
