import React from "react";
import ReactDOM from "react-dom";
import TripPlannerPage from "./components/TripPlannerPage";
import { MapData } from "../leaflet/components/__mapdata";

const render = (): void => {
  const mapDataEl = document.getElementById("js-trip-planner-map-data");
  if (!mapDataEl) return;

  const mapData = JSON.parse(mapDataEl.innerHTML) as MapData;
  ReactDOM.render(
    <TripPlannerPage mapData={mapData} />,
    document.getElementById("react-root")
  );
};

export const onLoad = (): void => {
  render();
};

export default onLoad;
