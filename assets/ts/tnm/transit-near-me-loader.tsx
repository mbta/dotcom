import React from "react";
import ReactDOM from "react-dom";
import { MapData } from "../leaflet/components/__mapdata";
import TransitNearMe from "./components/TransitNearMe";
import { parseQuery } from "../helpers/query";

let search = null; // eslint-disable-line

const render = (): void => {
  const dataEl = document.getElementById("js-tnm-map-dynamic-data");
  const stopsWithDistancesEl = document.getElementById(
    "js-tnm-stop-sidebar-data"
  );
  if (!dataEl || !stopsWithDistancesEl) return;
  const mapId = dataEl.getAttribute("data-for") as string;
  const mapData = JSON.parse(dataEl.innerHTML) as MapData;
  const stopsWithDistances = JSON.parse(stopsWithDistancesEl.innerHTML);
  const query = parseQuery(window.location.search, window.decodeURIComponent);
  ReactDOM.render(
    <TransitNearMe
      mapData={mapData}
      mapId={mapId}
      query={query}
      stopsWithDistances={stopsWithDistances}
      routesWithRealtimeSchedules={[]}
      stopsWithRoutes={[]}
    />,
    document.getElementById("react-root")
  );
};

export const onLoad = (): void => {
  render();
};

export default onLoad;
