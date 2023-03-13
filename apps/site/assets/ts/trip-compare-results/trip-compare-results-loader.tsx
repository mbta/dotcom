import React from "react";
import ReactDOM from "react-dom";
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

  ReactDOM.render(
    <TripCompareResults
      itineraryData={itineraryData}
      itineraryHeader={itineraryHeader}
    />,
    document.getElementById(reactId)
  );
};

export const onLoad = (): void => {
  render("js-tp-itinerary-data", "react-root");
};

export default onLoad;
