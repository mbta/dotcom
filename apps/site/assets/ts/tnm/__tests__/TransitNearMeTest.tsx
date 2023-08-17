import React from "react";
import "whatwg-fetch";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import TransitNearMe, {
  fetchRealtimeSchedules,
  modesFromQuery
} from "../components/TransitNearMe";
import { createReactRoot } from "../../app/helpers/testUtils";
import { importData, importRealtimeResponse } from "./helpers/testUtils";
import { MapData } from "../../leaflet/components/__mapdata";
import {
  transformRoutes,
  transformStops
} from "../helpers/process-realtime-data";

/* eslint-disable camelcase */
const mapData: MapData = {
  zoom: 14,
  width: 630,
  polylines: [],
  markers: [],
  default_center: { latitude: 0, longitude: 0 },
  height: 500,
  tile_server_url: ""
};
const mapId = "test";
const realtimeData = importRealtimeResponse();
const stopsWithDistances = importData();
const routesWithRealtimeSchedules = transformRoutes(
  stopsWithDistances.distances,
  [],
  realtimeData
);
const stopsWithRoutes = transformStops(
  stopsWithDistances.distances,
  [],
  realtimeData
);

it("it renders", () => {
  createReactRoot();
  const tree = renderer
    .create(
      <TransitNearMe
        query={{}}
        mapData={mapData}
        mapId={mapId}
        stopsWithDistances={stopsWithDistances}
        routesWithRealtimeSchedules={[]}
        stopsWithRoutes={[]}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("it filters by selected stop id", () => {
  createReactRoot();
  const tree = renderer
    .create(
      <TransitNearMe
        query={{}}
        mapData={mapData}
        mapId={mapId}
        stopsWithDistances={stopsWithDistances}
        routesWithRealtimeSchedules={[]}
        stopsWithRoutes={stopsWithRoutes}
        selectedStopId={"place-mlmnl"}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("it switches view on click", () => {
  createReactRoot();
  const wrapper = mount(
    <TransitNearMe
      query={{}}
      mapData={mapData}
      mapId={mapId}
      stopsWithDistances={stopsWithDistances}
      routesWithRealtimeSchedules={routesWithRealtimeSchedules}
      stopsWithRoutes={stopsWithRoutes}
    />
  );
  wrapper.find(".m-tnm-sidebar__view-change").simulate("click");
  expect(wrapper.exists("#tnm-sidebar-by-stops")).toBeTruthy();
});

it("sets mode filters based on query", () => {
  createReactRoot();
  const noFilter = mount(
    <TransitNearMe
      query={{}}
      mapData={mapData}
      mapId={mapId}
      stopsWithDistances={stopsWithDistances}
      routesWithRealtimeSchedules={routesWithRealtimeSchedules}
      stopsWithRoutes={stopsWithRoutes}
    />
  );
  const allModes = noFilter
    .find(".m-tnm-sidebar__route")
    .map(card => card.prop("data-mode"));
  expect(allModes).toHaveLength(15);
  expect(allModes).toEqual([
    "subway",
    "commuter_rail",
    "bus",
    "bus",
    "bus",
    "bus",
    "bus",
    "bus",
    "bus",
    "bus",
    "bus",
    "bus",
    "bus",
    "bus",
    "bus"
  ]);

  const withFilter = mount(
    <TransitNearMe
      query={{ filter: "commuter_rail" }}
      mapData={mapData}
      mapId={mapId}
      stopsWithDistances={stopsWithDistances}
      routesWithRealtimeSchedules={routesWithRealtimeSchedules}
      stopsWithRoutes={stopsWithRoutes}
    />
  );

  const rail = withFilter
    .find(".m-tnm-sidebar__route")
    .map(card => card.prop("data-mode"));

  expect(rail).toEqual(["commuter_rail"]);
});

it("ignores modes that aren't specified", () => {
  expect(modesFromQuery({ filter: "madeup" })).toEqual([]);
});

describe("fetchRealtimeSchedules", () => {
  it("fetches data", () => {
    window.fetch = jest.fn().mockImplementation(
      () =>
        new Promise((resolve: Function) =>
          resolve({
            json: () => ({ payload: realtimeData }),
            ok: true,
            status: 200,
            statusText: "OK"
          })
        )
    );

    const spy = jest.fn();
    return fetchRealtimeSchedules(["place-mlmnl"], spy).then(() => {
      expect(window.fetch).toHaveBeenCalledWith(
        "/api/realtime/stops/?stops=place-mlmnl"
      );
      expect(spy).toHaveBeenCalledWith({
        payload: { data: realtimeData },
        type: "UPDATE_REALTIME_SCHEDULE_DATA"
      });
    });
  });

  it("fails gracefully when request fails", () => {
    window.fetch = jest.fn().mockImplementation(
      () =>
        new Promise((resolve: Function) =>
          resolve({
            json: () => "Internal Server Error",
            ok: false,
            status: 500,
            statusText: "INTERNAL SERVER ERROR"
          })
        )
    );

    const spy = jest.fn();
    return fetchRealtimeSchedules(["place-mlmnl"], spy).then(() => {
      expect(spy).toHaveBeenCalledWith({
        payload: {},
        type: "FIRST_DATA_LOADED"
      });
    });
  });
});
