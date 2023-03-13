import React from "react";
import { createRoot } from "react-dom/client";
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
  const root = createRoot(mapEl);
  root.render(
    <Map
      data={mapData}
      channel={channel}
      currentShapes={currentShapes}
      currentStops={currentStops}
    />
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
  const root = createRoot(document.getElementById("react-root")!);
  root.render(
    <Provider store={store}>
      <ScheduleLoader
        component="ADDITIONAL_LINE_INFORMATION"
        schedulePageData={schedulePageData}
        updateURL={updateURL}
      />
    </Provider>
  );
  // don't show Schedule Finder for subway
  if (scheduleNote) {
    const scheduleNoteRoot = createRoot(
      document.getElementById("react-schedule-note-root")!
    );
    scheduleNoteRoot.render(
      <Provider store={store}>
        <ScheduleLoader
          component="SCHEDULE_NOTE"
          schedulePageData={schedulePageData}
          updateURL={updateURL}
        />
      </Provider>
    );
  } else {
    const scheduleFinderEl = document.getElementById(
      "react-schedule-finder-root"
    );
    if (scheduleFinderEl) {
      const scheduleFinderRoot = createRoot(scheduleFinderEl);
      scheduleFinderRoot.render(
        <Provider store={store}>
          <ScheduleLoader
            component="SCHEDULE_FINDER"
            schedulePageData={schedulePageData}
            updateURL={updateURL}
          />
        </Provider>
      );
    }
  }
};

const renderDirectionAndMap = (
  schedulePageData: SchedulePageData,
  rootEl: HTMLElement
): void => {
  const currentState = getCurrentState();
  if (!!currentState && Object.keys(currentState).length !== 0) {
    const root = createRoot(rootEl);
    root.render(
      <Provider store={store}>
        <ScheduleLoader
          component="SCHEDULE_DIRECTION"
          schedulePageData={schedulePageData}
          updateURL={updateURL}
        />
      </Provider>
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
