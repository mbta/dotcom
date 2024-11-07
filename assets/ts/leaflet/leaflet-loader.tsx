import React from "react";
import ReactDOM from "react-dom";
import { MapData } from "./components/__mapdata";
import Map from "./components/Map";
import "../../css/leaflet.scss";

const render = (): void => {
  const dataEl = document.querySelector(".js-map-data");
  if (!dataEl) return;
  const mapData = JSON.parse(dataEl.innerHTML) as MapData;
  const rootEl = document.getElementById("leaflet-react-root");
  rootEl!.innerHTML = ""; // purge server rendered content
  ReactDOM.render(<Map mapData={mapData} />, rootEl);
};

export default render;
