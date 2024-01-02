import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import StopPage, { fetchData } from "../components/StopPage";
import stopData from "./stopData.json";
import { Alert, InformedEntitySet } from "../../__v3api";
import { StopPageData, AlertsTab, StopMapData } from "../components/__stop";
import { MapData } from "../../leaflet/components/__mapdata";
import { createReactRoot } from "../../app/helpers/testUtils";

/* eslint-disable camelcase */
const mapData: MapData = {
  default_center: { latitude: 0, longitude: 0 },
  height: 500,
  markers: [
    {
      icon: null,
      id: "current-stop",
      latitude: 25,
      longitude: 25,
      rotation_angle: 0,
      size: [25, 25],
      tooltip: null,
      tooltip_text: null
    }
  ],
  polylines: [],
  tile_server_url: "",
  width: 630,
  zoom: 14
};

const initialData: StopMapData = {
  map_data: mapData,
  map_srcset: "",
  map_url: ""
};

const lowAlert: Alert = {
  updated_at: "Updated: 4/11/2019 09:33A",
  severity: 7,
  priority: "low",
  lifecycle: "upcoming",
  active_period: [],
  informed_entity: {} as InformedEntitySet,
  id: "00005",
  header: "There is construction at this station.",
  effect: "other",
  description: "",
  url: "https://www.mbta.com",
  banner: null
};
/* eslint-enable camelcase */

it("it renders", () => {
  const data = JSON.parse(JSON.stringify(stopData)) as StopPageData;

  createReactRoot();
  const tree = renderer
    .create(
      <StopPage
        stopPageData={{ ...data, alerts: [lowAlert] }}
        mapId="test"
        mapData={initialData}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("it renders the alert tab", () => {
  const data = JSON.parse(JSON.stringify(stopData)) as StopPageData;

  /* eslint-disable camelcase */
  const alertsTab: AlertsTab = {
    current: {
      alerts: [],
      empty_message: "No current alerts"
    },
    upcoming: {
      alerts: [],
      empty_message: "No upcoming alerts"
    },
    all: {
      alerts: [lowAlert],
      empty_message: "No alerts"
    },
    initial_selected: "all"
  };

  createReactRoot();
  const wrapper = mount(
    <StopPage
      stopPageData={{ ...data, tab: "alerts", alerts_tab: alertsTab }}
      mapId="test"
      mapData={initialData}
    />
  );
  expect(wrapper.find(".m-alerts__time-filters").exists()).toBeTruthy();
  /* eslint-enable camelcase */
});

describe("fetchData", () => {
  it("fetches data", () => {
    const spy = jest.fn();
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

    return fetchData("place-sstat", spy).then(() => {
      expect(window.fetch).toHaveBeenCalledWith("/stops/api?id=place-sstat");
      expect(spy).toHaveBeenCalledWith({
        payload: { routes: [] },
        type: "UPDATE_ROUTES"
      });
    });
  });

  it("fails gracefully if fetch is unsuccessful", () => {
    const spy = jest.fn();
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

    return fetchData("place-sstat", spy).then(() => {
      expect(window.fetch).toHaveBeenCalledWith("/stops/api?id=place-sstat");
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
