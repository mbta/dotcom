import React from "react";
import { createRoot } from "react-dom/client";
import { MapData } from "./components/__mapdata";
import Map from "./components/Map";

const render = (): void => {
  const dataEl = document.querySelector(".js-map-data");
  if (!dataEl) return;
  const mapData = JSON.parse(dataEl.innerHTML) as MapData;
  const rootEl = document.getElementById("leaflet-react-root");
  if (!rootEl) return;
  rootEl!.innerHTML = ""; // purge server rendered content
  const root = createRoot(rootEl);
  root.render(<Map mapData={mapData} />);
};

export default render;
