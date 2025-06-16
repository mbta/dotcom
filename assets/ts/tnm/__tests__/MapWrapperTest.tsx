import React from "react";
import { mount } from "enzyme";
import MapWrapper, { Props } from "../components/leaflet/MapWrapper";
import { Stop, EnhancedRoute } from "../../__v3api";
import { MapMarker } from "../../leaflet/components/__mapdata";

/* eslint-disable camelcase */
const marker: MapMarker = {
  icon: "test",
  id: "stop-id",
  latitude: 41.0,
  longitude: -71.0,
  rotation_angle: 0,
  tooltip: null
};

const stop: Stop = {
  accessibility: ["wheelchair"],
  address: "123 Main St., Boston MA",
  bike_storage: [],
  closed_stop_info: null,
  fare_facilities: [],
  "has_charlie_card_vendor?": false,
  "has_fare_machine?": false,
  id: "stop-id",
  "child?": false,
  latitude: 41.0,
  longitude: -71.0,
  municipality: "Boston",
  name: "Stop Name",
  note: null,
  parking_lots: [],
  "station?": true,
  "ferry?": false,
  href: "/stops/stop-id",
  type: "station"
};

const routes: EnhancedRoute[] = [
  {
    type: 1,
    name: "Orange Line",
    long_name: "Orange Line", // eslint-disable-line camelcase
    id: "Orange",
    direction_names: { "0": "South", "1": "North" }, // eslint-disable-line camelcase
    direction_destinations: { "0": "Forest Hills", "1": "Oak Grove" }, // eslint-disable-line camelcase
    description: "rapid_transit",
    alerts: [], // eslint-disable-line camelcase
    header: "",
    line_id: null
  }
];

const mapWrapperProps: Props = {
  bounds: undefined, // something odd with rendering via enzyme and bounds?
  dispatch: () => {},
  markers: [marker],
  onClick: () => {},
  selectedStopId: null,
  shouldCenterMapOnSelectedStop: false,
  tileServerUrl: "",
  tooltipData: {
    id: {
      stop,
      routes,
      distanceFormatted: "0.5 miles"
    }
  },
  visibleMarkers: [marker],
  zoom: 15
};

it("it renders using the default center position", () => {
  const div = document.createElement("div");
  document.body.appendChild(div);
  const wrapper = mount(<MapWrapper {...mapWrapperProps} />, {
    attachTo: div
  });
  expect(
    wrapper
      .render()
      .find(".leaflet-tile")
      .prop("src")
  ).toBeUndefined();
});

it("it renders using the default center if not shouldCenter", () => {
  const dataWithoutMarkers: Props = {
    ...mapWrapperProps,
    selectedStopId: "stop-id",
    shouldCenterMapOnSelectedStop: false
  };
  const div = document.createElement("div");
  document.body.appendChild(div);
  const wrapper = mount(<MapWrapper {...dataWithoutMarkers} />, {
    attachTo: div
  });
  expect(
    wrapper
      .render()
      .find(".leaflet-tile")
      .prop("src")
  ).toBeUndefined();
});

it("it renders using the selected markers position if shouldCenter", () => {
  const dispatch = jest.fn();
  const mapData = {
    ...mapWrapperProps,
    tooltipData: {},
    marker: [{ ...marker, id: null }]
  };
  const dataWithoutMarkers: Props = {
    ...mapData,
    tooltipData: {},
    dispatch,
    selectedStopId: "stop-id",
    shouldCenterMapOnSelectedStop: true
  };
  const div = document.createElement("div");
  document.body.appendChild(div);
  const wrapper = mount(<MapWrapper {...dataWithoutMarkers} />, {
    attachTo: div
  });
  expect(
    wrapper
      .render()
      .find(".leaflet-tile")
      .prop("src")
  ).toBe(`/osm_tiles/15/9921/12285.png`);
  expect(dispatch).toHaveBeenCalledWith({
    payload: { data: "stop-id" },
    type: "RESET_SHOULD_CENTER_MAP"
  });
});
/* eslint-disable camelcase */
