import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { SchedulePageData } from "./components/__schedule";
import { MapData, StaticMapData } from "../leaflet/components/__mapdata";
import { createScheduleStore } from "./store/ScheduleStore";
import { SchedulePage } from "./components/SchedulePage";

const getPageData = (): {
  schedulePageData: SchedulePageData;
  branchesAreEmpty: boolean;
  mapData: MapData;
  staticMapData: StaticMapData | undefined;
} => {
  const schedulePageDataEl = document.getElementById("js-schedule-page-data");
  const mapDataEl = document.getElementById("js-map-data");
  if (!schedulePageDataEl || !mapDataEl) {
    throw new Error(
      `Page Elements are Missing schedulePageDataEl:${schedulePageDataEl} mapDataEl:${mapDataEl}`
    );
  }
  const schedulePageData = JSON.parse(
    schedulePageDataEl.innerHTML
  ) as SchedulePageData;
  const branchesAreEmpty =
    schedulePageDataEl.getAttribute("data-branches-are-empty") === "true";
  const mapData: MapData = JSON.parse(mapDataEl.innerHTML);

  let staticMapData: StaticMapData | undefined;
  const staticDataEl = document.getElementById("static-map-data");
  if (staticDataEl) {
    staticMapData = JSON.parse(staticDataEl.innerHTML);
  }

  return {
    schedulePageData,
    branchesAreEmpty,
    mapData,
    staticMapData
  };
};

const render = (): void => {
  const {
    schedulePageData,
    branchesAreEmpty,
    mapData,
    staticMapData
  } = getPageData();

  const { direction_id: directionId } = schedulePageData;

  ReactDOM.render(
    <Provider store={createScheduleStore(directionId)}>
      <SchedulePage
        schedulePageData={schedulePageData}
        noBranches={branchesAreEmpty}
        mapData={mapData}
        staticMapData={staticMapData}
      />
    </Provider>,
    document.getElementById("react-root-schedule-page")
  );
};

const onLoad = (): void => {
  render();
};

export default onLoad;
