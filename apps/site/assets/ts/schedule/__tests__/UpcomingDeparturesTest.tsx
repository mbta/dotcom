import React from "react";
import renderer, { act } from "react-test-renderer";
import { createReactRoot } from "../../app/helpers/testUtils";
import UpcomingDepartures from "../components/schedule-finder/UpcomingDepartures";
import { payload } from "./ScheduleModalTest";
import { RouteType } from "../../__v3api";

const stopPrediction = payload;

const crRouteType: RouteType = 2;

const crPrediction = [
  {
    train_number: "",
    route: {
      type: crRouteType,
      name: "Framingham/Worcester Line",
      long_name: "Framingham/Worcester Line",
      id: "CR-Worcester",
      direction_names: { "1": "Inbound", "0": "Outbound" },
      direction_destinations: { "1": "South Station", "0": "Worcester" },
      description: "commuter_rail",
      "custom_route?": false
    },
    prediction: {
      scheduled_time: ["4:51", " ", "PM"],
      prediction: {
        track: null,
        time: ["4:51", " ", "PM"],
        status: null,
        seconds: 1854
      },
      delay: 0
    },
    headsign: "Framingham"
  },
  {
    train_number: "591",
    route: {
      type: crRouteType,
      name: "Framingham/Worcester Line",
      long_name: "Framingham/Worcester Line",
      id: "CR-Worcester",
      direction_names: { "1": "Inbound", "0": "Outbound" },
      direction_destinations: { "1": "South Station", "0": "Worcester" },
      description: "commuter_rail",
      "custom_route?": false
    },
    prediction: {
      scheduled_time: ["4:51", " ", "PM"],
      prediction: {
        track: "3",
        time: ["4:51", " ", "PM"],
        status: null,
        seconds: 1854
      },
      delay: 0
    },
    headsign: "Framingham"
  },
  {
    train_number: "591",
    route: {
      type: crRouteType,
      name: "Framingham/Worcester Line",
      long_name: "Framingham/Worcester Line",
      id: "CR-Worcester",
      direction_names: { "1": "Inbound", "0": "Outbound" },
      direction_destinations: { "1": "South Station", "0": "Worcester" },
      description: "commuter_rail",
      "custom_route?": false
    },
    prediction: {
      scheduled_time: ["4:51", " ", "PM"],
      prediction: {
        track: "3",
        time: ["4:51", " ", "PM"],
        status: null,
        seconds: 1854
      },
      delay: 0
    },
    headsign: "Framingham"
  },
  {
    train_number: "593",
    route: {
      type: crRouteType,
      name: "Framingham/Worcester Line",
      long_name: "Framingham/Worcester Line",
      id: "CR-Worcester",
      direction_names: { "1": "Inbound", "0": "Outbound" },
      direction_destinations: { "1": "South Station", "0": "Worcester" },
      description: "commuter_rail",
      "custom_route?": false
    },
    prediction: {
      scheduled_time: ["5:31", " ", "PM"],
      prediction: null,
      delay: 0
    },
    headsign: "Framingham"
  }
];
describe("UpcomingDepartures", () => {
  it("doesn't render if there are not predictions", () => {
    createReactRoot();
    const tree = renderer.create(
      <UpcomingDepartures
        state={{
          data: [
            {
              ...stopPrediction[0],
              prediction: {
                prediction: null,
                delay: 0,
                scheduled_time: ["3", ":25", "PM"]
              }
            }
          ],
          error: false,
          isLoading: false
        }}
      />
    );
    expect(tree.toJSON()).toBeNull();
  });

  it("doesn't render if there was an error", () => {
    createReactRoot();
    const tree = renderer.create(
      <UpcomingDepartures
        state={{
          data: [
            {
              ...stopPrediction[0],
              prediction: {
                prediction: null,
                delay: 0,
                scheduled_time: ["3", ":25", "PM"]
              }
            }
          ],
          error: true,
          isLoading: false
        }}
      />
    );
    expect(tree.toJSON()).toBeNull();
  });

  it("renders bus predictions", () => {
    createReactRoot();
    const tree = renderer.create(
      <UpcomingDepartures
        state={{
          data: stopPrediction,
          error: false,
          isLoading: false
        }}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("renders SL bus predictions", () => {
    createReactRoot();
    const tree = renderer.create(
      <UpcomingDepartures
        state={{
          data: [
            {
              ...stopPrediction[0],
              route: { ...stopPrediction[0].route, name: "SL-2", id: "741" }
            }
          ],
          error: false,
          isLoading: false
        }}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("renders cr predictions", () => {
    createReactRoot();
    const tree = renderer.create(
      <UpcomingDepartures
        state={{
          data: crPrediction,
          error: false,
          isLoading: false
        }}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
