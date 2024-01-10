import React from "react";
import renderer from "react-test-renderer";
import StopMap from "../components/StopMap";
import { createReactRoot } from "../../app/helpers/testUtils";
import { StopMapData } from "../components/__stop";
import { Stop } from "../../__v3api";
/* eslint-disable camelcase */

const initialData: StopMapData = {
  map_data: {
    default_center: {
      latitude: 0,
      longitude: 0
    },
    height: 630,
    markers: [
      {
        id: "current-stop",
        latitude: 25,
        longitude: 25,
        icon: null,
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
  },
  map_srcset: "",
  map_url: ""
};

const stop: Stop = {
  type: "station",
  "station?": true,
  parking_lots: [],
  note: null,
  name: "South Station",
  longitude: -71.055242,
  latitude: 42.352271,
  "is_child?": false,
  id: "place-sstat",
  "has_fare_machine?": true,
  "has_charlie_card_vendor?": false,
  closed_stop_info: null,
  address: "700 Atlantic Ave, Boston, MA 02110",
  municipality: "Boston",
  bike_storage: [],
  fare_facilities: [
    "fare_vending_machine",
    "fare_media_assistant",
    "ticket_window"
  ],
  accessibility: [
    "accessible",
    "escalator_both",
    "elevator",
    "fully_elevated_platform"
  ]
};

it("it renders with initial markers", () => {
  createReactRoot();
  const tree = renderer
    .create(<StopMap initialData={initialData} routes={[]} stop={stop} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("it doesn't render if it can't find it's mapElement div", () => {
  createReactRoot();
  const tree = renderer
    .create(<StopMap initialData={initialData} routes={[]} stop={stop} />)
    .toJSON();
  expect(tree).toEqual(null);
});
