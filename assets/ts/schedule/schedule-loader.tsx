import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { isEmpty } from "lodash";
import { updateInLocation } from "use-query-params";
import Map from "./components/Map";
import { SchedulePageData, SelectedOrigin } from "./components/__schedule";
import { MapData } from "../leaflet/components/__mapdata";
import { DirectionId, Route } from "../__v3api";
import ScheduleLoader from "./components/ScheduleLoader";
import {
  store,
  createScheduleStore,
  getCurrentState
} from "./store/ScheduleStore";
import { isABusRoute, isFerryRoute } from "../models/route";
import EmptySchedule from "./components/EmptySchedule";

const renderMap = ({
  route_patterns: routePatternsByDirection,
  direction_id: directionId,
  route
}: SchedulePageData): void => {
  const routePatterns = routePatternsByDirection[directionId];
  const defaultRoutePattern = routePatterns.slice(0, 1)[0];
  const currentShapes = isABusRoute(route)
    ? [defaultRoutePattern.shape_id]
    : routePatterns.map(pattern => pattern.shape_id);
  const currentStops = defaultRoutePattern.stop_ids;
  const mapDataEl = document.getElementById("js-map-data");
  if (!mapDataEl) return;
  const channel = mapDataEl.getAttribute("data-channel-id");
  if (!channel) throw new Error("data-channel-id attribute not set");
  const mapEl = document.getElementById("map-root");
  if (!mapEl) throw new Error("cannot find #map-root");
  const mapData: MapData = JSON.parse(mapDataEl.innerHTML);
  ReactDOM.render(
    <Map
      data={mapData}
      channel={channel}
      currentShapes={currentShapes}
      currentStops={currentStops}
    />,
    mapEl
  );
};

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

export const renderAdditionalLineInformation = (
  schedulePageData: SchedulePageData
): void => {
  const { schedule_note: scheduleNote } = schedulePageData;

  ReactDOM.render(
    <Provider store={store}>
      <ScheduleLoader
        component="ADDITIONAL_LINE_INFORMATION"
        schedulePageData={schedulePageData}
        updateURL={updateURL}
      />
    </Provider>,
    document.getElementById("react-root")
  );
  // don't show Schedule Finder for subway
  if (scheduleNote) {
    ReactDOM.render(
      <Provider store={store}>
        <ScheduleLoader
          component="SCHEDULE_NOTE"
          schedulePageData={schedulePageData}
          updateURL={updateURL}
        />
      </Provider>,
      document.getElementById("react-schedule-note-root")
    );
  } else {
    const scheduleFinderRoot = document.getElementById(
      "react-schedule-finder-root"
    );
    if (scheduleFinderRoot) {
      ReactDOM.render(
        <Provider store={store}>
          <ScheduleLoader
            component="SCHEDULE_FINDER"
            schedulePageData={schedulePageData}
            updateURL={updateURL}
          />
        </Provider>,
        scheduleFinderRoot
      );
    }
  }
};

const renderDirectionAndMap = (
  schedulePageData: SchedulePageData,
  root: HTMLElement
): void => {
  const currentState = getCurrentState();
  if (!!currentState && Object.keys(currentState).length !== 0) {
    ReactDOM.render(
      <Provider store={store}>
        <ScheduleLoader
          component="SCHEDULE_DIRECTION"
          schedulePageData={schedulePageData}
          updateURL={updateURL}
        />
      </Provider>,
      root
    );
  }
};

export const renderDirectionOrMap = (
  schedulePageData: SchedulePageData
): void => {
  const root = document.getElementById("react-schedule-direction-root");
  if (!root) {
    renderMap(schedulePageData);
    return;
  }
  renderDirectionAndMap(schedulePageData, root);
};

const getPageData = (): {
  schedulePageData: SchedulePageData;
  branchesAreEmpty: boolean;
  mapData: MapData;
  mapChannel: string;
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
  const mapChannel = mapDataEl.getAttribute("data-channel-id");

  if (!schedulePageData || !mapData || !mapChannel) {
    throw new Error(
      `Page Data Missing mapChannel:${mapChannel}, mapData:${mapData}, schedulePageData:${schedulePageData}`
    );
  }

  return {
    schedulePageData,
    branchesAreEmpty,
    mapData,
    mapChannel
  };
};

const render = (): void => {
  const {
    schedulePageData,
    branchesAreEmpty,
    mapData,
    mapChannel
  } = getPageData();

  const { direction_id: directionId } = schedulePageData;

  createScheduleStore(directionId);
  ReactDOM.render(
    fun(schedulePageData, branchesAreEmpty, mapData, mapChannel),
    document.getElementById("react-root-schedule-page")
  );
  // renderAdditionalLineInformation(schedulePageData);

  // if (!isEmpty(routePatterns)) {
  //   renderDirectionOrMap(schedulePageData);
  // }
};

// TODO figure out return type
const getDirectionAndMap = (
  schedulePageData: SchedulePageData,
  mapData: MapData
): JSX.Element | undefined => {
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
    <></>;
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

const getLineMap = (
  channel: string,
  dynamicMapData: MapData,
  schedulePageData: SchedulePageData
): JSX.Element => {
  const directionId = schedulePageData.direction_id;
  const routePatterns = schedulePageData.route_patterns[directionId];
  const defaultRoutePattern = routePatterns.slice(0, 1)[0];
  const currentShapes = isABusRoute(schedulePageData.route)
    ? [defaultRoutePattern.shape_id]
    : routePatterns.map(pattern => pattern.shape_id);
  const currentStops = defaultRoutePattern.stop_ids;
  if (!channel) throw new Error("data-channel-id attribute not set");
  return (
    <Map
      data={dynamicMapData}
      channel={channel}
      currentShapes={currentShapes}
      currentStops={currentStops}
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

const fun = (
  schedulePageData: SchedulePageData,
  noBranches: boolean,
  dynamicMapData: MapData,
  mapChannel: string
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
            {/* <div className="line-map-container">
              {!isFerryRoute(route) &&
                mapChannel &&
                getLineMap(
                  mapChannel,
                  dynamicMapData,
                  schedulePageData
                  )}
            </div> */}
            {/* END branchs not empty rendering 8*/}
          </div>
        </div>
      )}
      <div
        className={`col-md-5 col-lg-4 ${offset} m-schedule-page__schedule-finder-or-note`}
      >
        {/* IF branches not empty continue rendering */}
        {getScheduleNote(schedulePageData)}
        {schedulePageData.schedule_note === null &&
          !isFerryRoute(route) &&
          getScheduleFinder(schedulePageData)}
        {/* END branches not empty continue rendering */}
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
