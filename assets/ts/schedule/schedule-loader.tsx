import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { updateInLocation } from "use-query-params";
import { SchedulePageData, SelectedOrigin } from "./components/__schedule";
import { MapData } from "../leaflet/components/__mapdata";
import { DirectionId, Route } from "../__v3api";
import ScheduleLoader from "./components/ScheduleLoader";
import {
  store,
  createScheduleStore,
  getCurrentState
} from "./store/ScheduleStore";
import { isFerryRoute, isSubwayRoute } from "../models/route";

const updateURL = (origin: SelectedOrigin, direction?: DirectionId): void => {
  /* istanbul ignore else  */
  if (window) {
    // eslint-disable-next-line camelcase
    const newQuery = {
      "schedule_finder[direction_id]":
        direction !== undefined ? direction.toString() : "",
      "schedule_finder[origin]": origin
    };
    const newLoc = updateInLocation(newQuery, window.location);
    // newLoc is not a true Location, so toString doesn't work
    window.history.replaceState({}, "", `${newLoc.pathname}${newLoc.search}`);
  }
};

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

  createScheduleStore(directionId);
  ReactDOM.render(
    doRender(schedulePageData, branchesAreEmpty, mapData),
    document.getElementById("react-root-schedule-page")
  );
};

const getDirectionAndMap = (
  schedulePageData: SchedulePageData,
  mapData: MapData
): JSX.Element => {
  const currentState = getCurrentState();
  if (!!currentState && Object.keys(currentState).length !== 0) {
    return (
      <ScheduleLoader
        component="SCHEDULE_DIRECTION"
        schedulePageData={schedulePageData}
        updateURL={updateURL}
        mapData={mapData}
      />
    );
  } else {
    return <></>;
  }
};

const getScheduleFinder = (
  schedulePageData: SchedulePageData
): JSX.Element | undefined => {
  return (
    <ScheduleLoader
      component="SCHEDULE_FINDER"
      schedulePageData={schedulePageData}
      updateURL={updateURL}
    />
  );
};

const getScheduleNote = (schedulePageData: SchedulePageData): JSX.Element => {
  return (
    <ScheduleLoader
      component="SCHEDULE_NOTE"
      schedulePageData={schedulePageData}
      updateURL={updateURL}
    />
  );
};

const getAdditionalLineInfo = (
  schedulePageData: SchedulePageData
): JSX.Element => {
  return (
    <ScheduleLoader
      component="ADDITIONAL_LINE_INFORMATION"
      schedulePageData={schedulePageData}
      updateURL={updateURL}
    />
  );
};

const getPageTitle = (route: Route): string | null => {
  switch (route.type) {
    case 0:
    case 1:
      return "Stations & Departures";
    case 4:
      return null;
    case 2:
    default:
      return "Schedules & Maps";
  }
};

export const doRender = (
  schedulePageData: SchedulePageData,
  noBranches: boolean,
  dynamicMapData: MapData
): JSX.Element => {
  const route = schedulePageData.route;

  const offset = noBranches
    ? "col-md-offset-7 col-lg-offset-8"
    : "col-lg-offset-1";
  const ferry = isFerryRoute(route) ? "ferry" : "";
  const title = getPageTitle(route);
  return (
    <Provider store={store}>
      {!noBranches && (
        <div className="col-md-7 m-schedule-page__main-content">
          <div className={"m-schedule-line__main-content " + ferry}>
            {title && <h2>{title}</h2>}
            <div>
              {getDirectionAndMap(schedulePageData, dynamicMapData)}
              {isFerryRoute(route) && getScheduleFinder(schedulePageData)}
            </div>
          </div>
        </div>
      )}
      <div
        className={`col-md-5 col-lg-4 ${offset} m-schedule-page__schedule-finder-or-note`}
      >
        {isSubwayRoute(route) && getScheduleNote(schedulePageData)}
        {schedulePageData.schedule_note === null &&
          !isFerryRoute(route) &&
          getScheduleFinder(schedulePageData)}
      </div>
      <div
        className={`col-md-5 col-lg-4 ${offset} m-schedule-page__side-content`}
      >
        <div className="m-schedule-line__side-content">
          {getAdditionalLineInfo(schedulePageData)}
        </div>
      </div>
    </Provider>
  );
};

const onLoad = (): void => {
  render();
};

export default onLoad;
