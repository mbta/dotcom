import React from "react";
import ReactDOM from "react-dom";
import { SchedulePageData } from "./components/__schedule";
import { MapData } from "../leaflet/components/__mapdata";
import { createScheduleStore } from "./store/ScheduleStore";
import { SchedulePage } from "./components/SchedulePage";
import { Provider } from "react-redux";

const getPageData = (): {
  schedulePageData: SchedulePageData;
  branchesAreEmpty: boolean;
  mapData: MapData;
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

  return {
    schedulePageData,
    branchesAreEmpty,
    mapData
  };
};

const render = (): void => {
  const { schedulePageData, branchesAreEmpty, mapData } = getPageData();

  const { direction_id: directionId } = schedulePageData;

  ReactDOM.render(
    <Provider store={createScheduleStore(directionId)}>
      <SchedulePage
        schedulePageData={schedulePageData}
        noBranches={branchesAreEmpty}
        mapData={mapData}
      />
    </Provider>,
    document.getElementById("react-root-schedule-page")
  );
};

const onLoad = (): void => {
  render();
};

export default onLoad;
