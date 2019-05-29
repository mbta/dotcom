import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import TransitNearMe, {
  getSelectedStop,
  fetchData,
  modesFromQuery
} from "../components/TransitNearMe";
import { createReactRoot } from "../../app/helpers/testUtils";
import { importData, importStopData } from "./helpers/testUtils";
import { MapData } from "../../leaflet/components/__mapdata";

it("it renders", () => {
  /* eslint-disable @typescript-eslint/camelcase */
  const mapData: MapData = {
    zoom: 14,
    width: 630,
    polylines: [],
    markers: [],
    default_center: { latitude: 0, longitude: 0 },
    height: 500,
    tile_server_url: ""
  };
  /* eslint-enable typescript/camelcase */

  const mapId = "test";
  const routeSidebarData = importData().slice(0, 3);
  const stopSidebarData = importStopData();

  createReactRoot();

  const tree = renderer
    .create(
      <TransitNearMe
        query={{}}
        mapData={mapData}
        mapId={mapId}
        routeSidebarData={routeSidebarData}
        stopSidebarData={stopSidebarData}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("it switches view on click", () => {
  /* eslint-disable @typescript-eslint/camelcase */
  const mapData: MapData = {
    zoom: 14,
    width: 630,
    polylines: [],
    markers: [],
    default_center: { latitude: 0, longitude: 0 },
    height: 500,
    tile_server_url: ""
  };
  /* eslint-enable typescript/camelcase */

  const mapId = "test";
  const routeSidebarData = importData().slice(0, 3);
  const stopSidebarData = importStopData();

  createReactRoot();

  const wrapper = mount(
    <TransitNearMe
      query={{}}
      mapData={mapData}
      mapId={mapId}
      routeSidebarData={routeSidebarData}
      stopSidebarData={stopSidebarData}
    />
  );
  wrapper.find(".m-tnm-sidebar__view-change").simulate("click");
  expect(wrapper.exists("#tnm-sidebar-by-stops")).toBeTruthy();
});

it("sets mode filters based on query", () => {
  /* eslint-disable @typescript-eslint/camelcase */
  const mapData: MapData = {
    zoom: 14,
    width: 630,
    polylines: [],
    markers: [],
    default_center: { latitude: 0, longitude: 0 },
    height: 500,
    tile_server_url: ""
  };
  /* eslint-enable typescript/camelcase */

  const mapId = "test";
  const routeSidebarData = importData();
  const stopSidebarData = importStopData();

  createReactRoot();

  const noFilter = mount(
    <TransitNearMe
      query={{}}
      mapData={mapData}
      mapId={mapId}
      routeSidebarData={routeSidebarData}
      stopSidebarData={stopSidebarData}
    />
  );
  const allModes = noFilter
    .find(".m-tnm-sidebar__route")
    .map(card => card.prop("data-mode"));
  expect(allModes).toHaveLength(22);
  expect(allModes).toEqual([
    "bus",
    "bus",
    "bus",
    "bus",
    "subway",
    "subway",
    "subway",
    "subway",
    "bus",
    "bus",
    "bus",
    "bus",
    "bus",
    "subway",
    "subway",
    "bus",
    "bus",
    "bus",
    "commuter_rail",
    "commuter_rail",
    "commuter_rail",
    "commuter_rail"
  ]);

  const withFilter = mount(
    <TransitNearMe
      query={{ filter: "commuter_rail" }}
      mapData={mapData}
      mapId={mapId}
      routeSidebarData={routeSidebarData}
      stopSidebarData={stopSidebarData}
    />
  );

  const rail = withFilter
    .find(".m-tnm-sidebar__route")
    .map(card => card.prop("data-mode"));

  expect(rail).toEqual([
    "commuter_rail",
    "commuter_rail",
    "commuter_rail",
    "commuter_rail"
  ]);
});

it("ignores modes that aren't specified", () => {
  expect(modesFromQuery({ filter: "madeup" })).toEqual([]);
});

it("getSelectedStop returns the stop if found", () => {
  const data = importStopData();
  expect(getSelectedStop(data, data[0].stop.stop.id)).toEqual(
    data[0].stop.stop
  );
});

it("getSelectedStop returns undefined if not found", () => {
  const data = importStopData();
  expect(getSelectedStop(data, "unknown")).toEqual(undefined);
});

describe("fetchData", () => {
  it("fetches data", () => {
    window.fetch = jest.fn().mockImplementation(
      () =>
        new Promise((resolve: Function) =>
          resolve({
            json: () => [],
            ok: true,
            status: 200,
            statusText: "OK"
          })
        )
    );

    const spy = jest.fn();
    return fetchData({ latitude: "41.0", longitude: "-71.0" }, spy).then(() => {
      expect(window.fetch).toHaveBeenCalledWith(
        "/transit-near-me/api?latitude=41.0&longitude=-71.0"
      );
      expect(spy).toHaveBeenCalledWith({
        payload: { data: [] },
        type: "UPDATE_ROUTE_SIDEBAR_DATA"
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
    return fetchData({ latitude: "41.0", longitude: "-71.0" }, spy).then(() => {
      expect(spy).not.toHaveBeenCalled();
    });
  });
  it("fetches data with Phoenix form param structure", () => {
    window.fetch = jest.fn().mockImplementation(
      () =>
        new Promise((resolve: Function) =>
          resolve({
            json: () => [],
            ok: true,
            status: 200,
            statusText: "OK"
          })
        )
    );
    const spy = jest.fn();
    return fetchData(
      { "location[latitude]": "41.0", "location[longitude]": "-71.0" },
      spy
    ).then(() => {
      expect(window.fetch).toHaveBeenCalledWith(
        "/transit-near-me/api?location[latitude]=41.0&location[longitude]=-71.0"
      );
      expect(spy).toHaveBeenCalledWith({
        payload: { data: [] },
        type: "UPDATE_ROUTE_SIDEBAR_DATA"
      });
    });
  });

  it("does not fetch data if query doesn't have lat/lng", () => {
    const spy = jest.fn();
    return fetchData({}, spy).then(() => {
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
