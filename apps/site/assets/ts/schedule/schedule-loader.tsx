import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { isEmpty } from "lodash";
import { updateInLocation } from "use-query-params";
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

const renderMap = ({
  route_patterns: routePatternsByDirection,
  direction_id: directionId,
  route: route
}: SchedulePageData): void => {
  const routePatterns = routePatternsByDirection[directionId];
  const shapeIds = routePatterns.map(routePattern => routePattern.shape_id);
  const defaultRoutePattern = routePatterns.slice(0, 1)[0];
  const currentShapeId = defaultRoutePattern.shape_id;
  const branchPatterns = route.type != 3 ?
      routePatterns.filter(
        pattern => pattern.typicality === defaultRoutePattern.typicality
      ) : null
  const branchShapeIds = branchPatterns ? branchPatterns.map(pattern => pattern.shape_id) : null
  const currentStops = defaultRoutePattern.stop_ids;
  const mapDataEl = document.getElementById("js-map-data");
  if (!mapDataEl) return;
  const channel = mapDataEl.getAttribute("data-channel-id");
  if (!channel) throw new Error("data-channel-id attribute not set");
  const mapEl = document.getElementById("map-root");
  if (!mapEl) throw new Error("cannot find #map-root");
  const mapData: MapData = JSON.parse(mapDataEl.innerHTML);
  ReactDOM.render(
    <Map data={mapData} channel={channel} shapeIds={shapeIds} currentShapeId={currentShapeId} branchShapeIds={branchShapeIds} currentStops={currentStops} />,
    mapEl
  );
};

const updateURL = (origin: SelectedOrigin, direction?: DirectionId): void => {
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

export const renderSchedulePage = (
  schedulePageData: SchedulePageData
): void => {
  const { schedule_note: scheduleNote } = schedulePageData;

  ReactDOM.render(
    <Provider store={store}>
      <ScheduleLoader
        component="MAIN"
        schedulePageData={schedulePageData}
        updateURL={updateURL}
      />
    </Provider>,
    document.getElementById("react-root")
  );
  // Now we (conditionally) render "secondary" widgets:
  // (only one will be shown at a time, depending on whether mobile or desktop)
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

  if (!isEmpty(routePatterns)) {
    renderSchedulePage(schedulePageData);
    renderDirectionOrMap(schedulePageData);
  }
};

const onLoad = (): void => {
  render();
};

export default onLoad;
