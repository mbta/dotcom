import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import StopCard from "../StopCard";
import { createReactRoot } from "../../app/helpers/testUtils";
import {
  Direction,
  Headsign,
  PredictedOrScheduledTime,
  Stop,
  EnhancedRoute
} from "../../__v3api";

/* eslint-disable camelcase */

const time: PredictedOrScheduledTime = {
  scheduled_time: ["4:30", " ", "PM"],
  prediction: null,
  delay: 0
};

const headsign: Headsign = {
  name: "Headsign",
  headsign: "Headsign",
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

it("it renders a stop card", () => {
  createReactRoot();
  const tree = renderer
    .create(
      <StopCard
        stop={stop}
        directions={directions}
        route={route}
        distance=".1 mi"
        dispatch={() => {}}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("it selects stop when the card is clicked", () => {
  createReactRoot();

  const mockDispatch = jest.fn();

  const wrapper = shallow(
    <StopCard
      stop={stop}
      directions={directions}
      route={route}
      distance=".1 mi"
      dispatch={mockDispatch}
    />
  );

  wrapper.find(".m-tnm-sidebar__route-stop").simulate("click");
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "CLICK_STOP_CARD",
    payload: { stopId: "stop-id" }
  });
});

it("it selects stop when the card is selected via keyboard", () => {
  createReactRoot();

  const mockDispatch = jest.fn();

  const wrapper = shallow(
    <StopCard
      stop={stop}
      directions={directions}
      route={route}
      distance=".1 mi"
      dispatch={mockDispatch}
    />
  );

  wrapper
    .find(".m-tnm-sidebar__route-stop")
    .simulate("keyPress", { key: "Enter" });
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "CLICK_STOP_CARD",
    payload: { stopId: "stop-id" }
  });
});

it("it does nothing when the keyboard event is not enter", () => {
  createReactRoot();

  const mockDispatch = jest.fn();

  const wrapper = shallow(
    <StopCard
      stop={stop}
      directions={directions}
      route={route}
      distance=".1 mi"
      dispatch={mockDispatch}
    />
  );

  wrapper
    .find(".m-tnm-sidebar__route-stop")
    .simulate("keyPress", { key: "Tab" });
  expect(mockDispatch).not.toHaveBeenCalled();
});
