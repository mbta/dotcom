import React from "react";
import renderer from "react-test-renderer";
import RouteCard, { routeBgColor, busClass } from "../components/RouteCard";
import { createReactRoot } from "../../app/helpers/testUtils";
import {
  Direction,
  Headsign,
  PredictedOrScheduledTime,
  Stop,
  RouteWithStopsWithDirections
} from "../../__v3api";

/* eslint-disable @typescript-eslint/camelcase */

const time: PredictedOrScheduledTime = {
  scheduled_time: ["4:30", " ", "PM"],
  prediction: null,
  delay: 0
};

const headsign: Headsign = {
  name: "Headsign",
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
  "is_child?": false,
  latitude: 41.0,
  longitude: -71.0,
  name: "Stop Name",
  note: null,
  parking_lots: [],
  "station?": true,
  href: "/stops/stop-id",
  type: "station"
};

const route: RouteWithStopsWithDirections = {
  route: {
    alert_count: 1,
    direction_destinations: ["Outbound Destination", "Inbound Destination"],
    direction_names: ["Outbound", "Inbound"],
    id: "route-id",
    name: "Route Name",
    header: "Route Header",
    long_name: "Route Long Name",
    description: "Route Description",
    type: 3
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

describe("routeBgColor", () => {
  it("determines the background color by route", () => {
    const cr: RouteWithStopsWithDirections = {
      route: { ...route.route, type: 2 },
      stops_with_directions: route.stops_with_directions
    };
    expect(routeBgColor(cr)).toBe("commuter-rail");

    const ferry: RouteWithStopsWithDirections = {
      route: { ...route.route, type: 4 },
      stops_with_directions: route.stops_with_directions
    };
    expect(routeBgColor(ferry)).toBe("ferry");

    ["Red", "Orange", "Blue"].forEach(id => {
      const subway: RouteWithStopsWithDirections = {
        route: { ...route.route, type: 1, id },
        stops_with_directions: route.stops_with_directions
      };
      expect(routeBgColor(subway)).toBe(`${id.toLowerCase()}-line`);
    });

    const greenLine: RouteWithStopsWithDirections = {
      route: { ...route.route, type: 0, id: "Green-B" },
      stops_with_directions: route.stops_with_directions
    };
    expect(routeBgColor(greenLine)).toBe("green-line");

    const bus: RouteWithStopsWithDirections = {
      route: { ...route.route, type: 3, id: "1" },
      stops_with_directions: route.stops_with_directions
    };
    expect(routeBgColor(bus)).toBe("bus");

    const fake: RouteWithStopsWithDirections = {
      route: { ...route.route, type: 0, id: "fakeID" },
      stops_with_directions: route.stops_with_directions
    };
    expect(routeBgColor(fake)).toBe("unknown");
  });
});

describe("busClass", () => {
  it("determines a route is a bus route", () => {
    const bus: RouteWithStopsWithDirections = {
      route: { ...route.route, type: 3, id: "1" },
      stops_with_directions: route.stops_with_directions
    };
    expect(busClass(bus)).toBe("bus-route-sign");

    const notBus: RouteWithStopsWithDirections = {
      route: { ...route.route, type: 1, id: "Red" },
      stops_with_directions: route.stops_with_directions
    };
    expect(busClass(notBus)).toBe("");
  });
});
