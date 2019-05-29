import React from "react";
import ReactDOM from "react-dom";
import "whatwg-fetch";
import { MapData } from "../leaflet/components/__mapdata";
import { doWhenGoogleMapsIsReady } from "../../js/google-maps-loaded";
import TransitNearMeSearch from "./search";
import TransitNearMe from "./components/TransitNearMe";
import { parseQuery } from "../helpers/query";

let search = null; // eslint-disable-line

const showLoadingIndicators = (bool: boolean): void => {
  const method = bool ? "remove" : "add";
  const loadingIndicators = document.getElementsByClassName(
    "js-loc-loading-indicator"
  );
  Array.from(loadingIndicators).forEach(icon =>
    icon.classList[method]("hidden-xs-up")
  );
};

export const onError = (error: PositionError): void => {
  showLoadingIndicators(false);

  if (error.message && error.message.includes("denied")) {
    return;
  }

  const msgEl = document.getElementById("address-search-message");
  if (msgEl) {
    msgEl.innerHTML = `There was an error retrieving your current location;
                       please enter an address to see transit near you.`;
  }
};

const render = (): void => {
  const dataEl = document.getElementById("js-tnm-map-dynamic-data");
  const routeSidebarDataEl = document.getElementById("js-tnm-sidebar-data");
  const stopSidebarDataEl = document.getElementById("js-tnm-stop-sidebar-data");
  if (!dataEl || !routeSidebarDataEl || !stopSidebarDataEl) return;
  const mapId = dataEl.getAttribute("data-for") as string;
  const mapData = JSON.parse(dataEl.innerHTML) as MapData;
  const routeSidebarData = JSON.parse(routeSidebarDataEl.innerHTML);
  const stopSidebarData = JSON.parse(stopSidebarDataEl.innerHTML);
  const query = parseQuery(window.location.search, window.decodeURIComponent);
  ReactDOM.render(
    <TransitNearMe
      mapData={mapData}
      mapId={mapId}
      query={query}
      routeSidebarData={routeSidebarData}
      stopSidebarData={stopSidebarData}
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
