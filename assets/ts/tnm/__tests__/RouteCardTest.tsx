import React from "react";
import renderer from "react-test-renderer";
import RouteCard from "../components/RouteCard";
import { createReactRoot } from "../../app/helpers/testUtils";
import {
  Direction,
  Headsign,
  PredictedOrScheduledTime,
  Stop,
  RouteWithStopsWithDirections,
  Alert
} from "../../__v3api";

/* eslint-disable camelcase */

const time: PredictedOrScheduledTime = {
  scheduled_time: ["4:30", " ", "PM"],
  prediction: null,
  delay: 0
};

const headsign: Headsign = {
  headsign: "Headsign",
  name: "Headsign - Extra info",
  times: [time],
  train_number: null
};

const directions: Direction[] = [
  {
    direction_id: 0,
    headsigns: [headsign]
  }
];

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

const alert = {} as Alert;

const route: RouteWithStopsWithDirections = {
  route: {
    alerts: [alert],
    direction_destinations: ["Outbound Destination", "Inbound Destination"],
    direction_names: ["Outbound", "Inbound"],
    id: "route-id",
    name: "Route Name",
    header: "Route Header",
    long_name: "Route Long Name",
    description: "Route Description",
    type: 3,
    line_id: null
  },
  stops_with_directions: [{ stop, directions, distance: "238 ft" }]
};

it("it renders a stop card", () => {
  createReactRoot();
  const tree = renderer
    .create(<RouteCard route={route} dispatch={() => {}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("returns null if route has no schedules", () => {
  const routeWithoutSchedules: RouteWithStopsWithDirections = {
    ...route,
    stops_with_directions: [
      {
        stop,
        directions: [],
        distance: "1 mi"
      }
    ]
  };
  createReactRoot();
  const tree = renderer
    .create(<RouteCard route={routeWithoutSchedules} dispatch={() => {}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("it renders a stop card for the silver line", () => {
  createReactRoot();
  const sl: RouteWithStopsWithDirections = {
    route: { ...route.route, id: "751" },
    stops_with_directions: route.stops_with_directions
  };
  const tree = renderer
    .create(<RouteCard route={sl} dispatch={() => {}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
