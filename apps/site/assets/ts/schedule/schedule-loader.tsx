import React from "react";
import ReactDOM from "react-dom";
import SchedulePage from "./components/SchedulePage";
import ScheduleNote from "./components/ScheduleNote";
import ScheduleDirection from "./components/ScheduleDirection";
import Map from "./components/Map";
import { SchedulePageData } from "./components/__schedule";
import { MapData, StaticMapData } from "../leaflet/components/__mapdata";
import ScheduleFinder from "./components/ScheduleFinder";

const renderMap = (): void => {
  const mapDataEl = document.getElementById("js-map-data");
  if (!mapDataEl) return;
  const channel = mapDataEl.getAttribute("data-channel-id");
  if (!channel) throw new Error("data-channel-id attribute not set");
  const mapEl = document.getElementById("map-root");
  if (!mapEl) throw new Error("cannot find #map-root");
  const mapData: MapData = JSON.parse(mapDataEl.innerHTML);
  ReactDOM.render(<Map data={mapData} channel={channel} />, mapEl);
};

const renderSchedulePage = (schedulePageData: SchedulePageData): void => {
  ReactDOM.render(
    <SchedulePage schedulePageData={schedulePageData} />,
    document.getElementById("react-root")
  );
  if (schedulePageData.schedule_note) {
    ReactDOM.render(
      <ScheduleNote
        className="m-schedule-page__schedule-notes--mobile"
        scheduleNote={schedulePageData.schedule_note}
      />,
      document.getElementById("react-schedule-note-root")
    );
  }
  const {
    direction_id: directionId,
    route,
    stops,
    services,
    route_patterns: routePatternsByDirection,
    schedule_note: scheduleNote,
    today
  } = schedulePageData;
  if (!scheduleNote) {
    ReactDOM.render(
      <ScheduleFinder
        directionId={directionId}
        route={route}
        stops={stops}
        services={services}
        routePatternsByDirection={routePatternsByDirection}
        today={today}
        scheduleNote={null}
      />,
      document.getElementById("react-schedule-finder-root")
    );
  }
};

const renderDirectionAndMap = (
  schedulePageData: SchedulePageData,
  root: HTMLElement
): void => {
  const {
    direction_id: directionId,
    route_patterns: routePatternsByDirection,
    shape_map: shapesById,
    route,
    line_diagram: lineDiagram,
    services,
    stops,
    today,
    schedule_note: scheduleNote
  } = schedulePageData;

  let mapData: MapData | undefined;
  const mapDataEl = document.getElementById("js-map-data");
  if (mapDataEl) {
    mapData = JSON.parse(mapDataEl.innerHTML);
  }

  let staticMapData: StaticMapData | undefined;
  const staticDataEl = document.getElementById("static-map-data");
  if (staticDataEl) {
    staticMapData = JSON.parse(staticDataEl.innerHTML);
  }

  ReactDOM.render(
    <ScheduleDirection
      directionId={directionId}
      route={route}
      routePatternsByDirection={routePatternsByDirection}
      shapesById={shapesById}
      mapData={mapData}
      staticMapData={staticMapData}
      lineDiagram={lineDiagram}
      services={services}
      stops={stops}
      today={today}
      scheduleNote={scheduleNote}
    />,
    root
  );
};

const renderDirectionOrMap = (schedulePageData: SchedulePageData): void => {
  const root = document.getElementById("react-schedule-direction-root");
  if (!root) {
    renderMap();
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
  renderSchedulePage(schedulePageData);
  renderDirectionOrMap(schedulePageData);
};

export const onLoad = (): void => {
  render();
};

export default onLoad;
