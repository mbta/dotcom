import React from "react";
import renderer from "react-test-renderer";
import Direction from "../Direction";
import { createReactRoot } from "../../app/helpers/testUtils";
import {
  Direction as DirectionType,
  Headsign,
  PredictedOrScheduledTime,
  EnhancedRoute
} from "../../__v3api";

/* eslint-disable camelcase */
const time: PredictedOrScheduledTime = {
  scheduled_time: ["4:30", " ", "PM"],
  prediction: null,
  delay: 0
};

const headsign: Headsign = {
  headsign: "Headsign",
  name: "Headsign - Extra infos",
  times: [time],
  train_number: null
};

const direction: DirectionType = {
  direction_id: 0,
  headsigns: [headsign]
};

const route: EnhancedRoute = {
  alerts: [],
  direction_destinations: ["Outbound Destination", "Inbound Destination"],
  direction_names: ["Outbound", "Inbound"],
  id: "route-id",
  name: "Route Name",
  header: "Route Header",
  long_name: "Route Long Name",
  description: "Route Description",
  type: 1,
  line_id: null
};

it("it renders", () => {
  createReactRoot();
  const tree = renderer
    .create(
      <Direction
        direction={{
          ...direction,
          headsigns: [1, 2].map(i => ({
            ...headsign,
            name: `Headsign ${i}`,
            headsign: `Headsign ${i}`
          }))
        }}
        route={route}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("returns null if direction has no schedules", () => {
  createReactRoot();
  const tree = renderer
    .create(
      <Direction direction={{ ...direction, headsigns: [] }} route={route} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("it does not display the route direction for commuter rail", () => {
  createReactRoot();
  const headsigns = [1, 2].map(i => ({
    ...headsign,
    headsign: `Headsign ${i}`,
    name: `Headsign ${i}`,
    train_number: `59${i}`
  }));
  const tree = renderer
    .create(
      <Direction
        direction={{ ...direction, headsigns }}
        route={{ ...route, type: 2 }}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("it does not display the direction destination when there is only one headsign", () => {
  createReactRoot();
  const tree = renderer
    .create(<Direction direction={direction} route={route} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
