import React from "react";
import ReactDOM from "react-dom";
import StopPage from "./components/StopPage";
import { StopPageData, StopMapData } from "./components/__stop";

const render = (): void => {
  const stopPageDataEl = document.getElementById("js-stop-page-data");
  const mapDataEl = document.getElementById("js-stop-map-data");
  if (!stopPageDataEl || !mapDataEl) return;
  const stopPageData = JSON.parse(stopPageDataEl.innerHTML) as StopPageData;
  const mapId = stopPageDataEl.getAttribute("data-for") as string;
  const mapData = JSON.parse(mapDataEl.innerHTML) as StopMapData;
  ReactDOM.render(
    <StopPage stopPageData={stopPageData} mapId={mapId} mapData={mapData} />,
    document.getElementById("react-root")
  );
};

export const onLoad = (): void => {
  render();
};

export default onLoad;
