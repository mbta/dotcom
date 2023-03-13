import React from "react";
import { createRoot } from "react-dom/client";
import TripPlannerPage from "./components/TripPlannerPage";
import { MapData } from "../leaflet/components/__mapdata";

const render = (): void => {
  const mapDataEl = document.getElementById("js-trip-planner-map-data");
  if (!mapDataEl) return;

  const mapData = JSON.parse(mapDataEl.innerHTML) as MapData;
  const root = createRoot(document.getElementById("react-root")!);
  root.render(<TripPlannerPage mapData={mapData} />);
};

export const onLoad = (): void => {
  render();
};

export default onLoad;
