import React from "react";
import ReactDOM from "react-dom";
import { MapData } from "../leaflet/components/__mapdata";
import { doWhenGoogleMapsIsReady } from "../../js/google-maps-loaded";
import TransitNearMeSearch from "./search";
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
  const query = parseQuery(window.location.search);
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

const renderMap = (): void => {
  doWhenGoogleMapsIsReady(() => {
    render();
  });
};

const setupSearch = (): void => {
  const el = document.getElementById(TransitNearMeSearch.SELECTORS.container);
  if (el) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    search = new TransitNearMeSearch();
  }
};

export interface GeolocationData extends CustomEvent {
  data: {
    url: string;
  };
}

export const onLoad = (): void => {
  renderMap();
  setupSearch();
};

export default onLoad;
