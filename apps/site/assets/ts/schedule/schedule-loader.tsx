import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { isEmpty } from "lodash";
import { updateParams } from "../helpers/use-params";
import Map from "./components/Map";
import { SchedulePageData, SelectedOrigin } from "./components/__schedule";
import { MapData } from "../leaflet/components/__mapdata";
import { DirectionId } from "../__v3api";
import ScheduleLoader from "./components/ScheduleLoader";
import {
  store,
  createScheduleStore,
  getCurrentState
} from "./store/ScheduleStore";
import { isABusRoute } from "../models/route";

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

export const updateURL = (
  origin: SelectedOrigin,
  direction?: DirectionId
): void => {
  // eslint-disable-next-line camelcase
  const newQuery = {
    "schedule_finder[direction_id]":
      direction !== undefined ? direction.toString() : null,
    "schedule_finder[origin]": origin ?? null
  };
  updateParams(newQuery);
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

const render = (): void => {
  const schedulePageDataEl = document.getElementById("js-schedule-page-data");
  if (!schedulePageDataEl) return;
  const schedulePageData = JSON.parse(
    schedulePageDataEl.innerHTML
  ) as SchedulePageData;
  const {
    direction_id: directionId,
    route_patterns: routePatterns
  } = schedulePageData;

  createScheduleStore(directionId);
  renderAdditionalLineInformation(schedulePageData);

  if (!isEmpty(routePatterns)) {
    renderDirectionOrMap(schedulePageData);
  }
};

const onLoad = (): void => {
  render();
};

export default onLoad;
