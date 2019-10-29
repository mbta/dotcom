import React from "react";
import renderer, { act } from "react-test-renderer";
import { EnhancedRoute, RouteType } from "../../__v3api";
import ScheduleModalContent from "../components/schedule-finder/ScheduleModalContent";
import { SimpleStop } from "../components/__schedule";

const route: EnhancedRoute = {
  alert_count: 0,
  description: "",
  direction_destinations: { 0: "Oak Grove", 1: "Forest Hills" },
  direction_names: { 0: "Inbound", 1: "Outbound" },
  header: "",
  id: "Orange",
  name: "Orange",
  long_name: "Orange Line",
  type: 1
};

const stops: SimpleStop[] = [
  { name: "Malden Center", id: "place-mlmnl", is_closed: false, zone: "1" },
  { name: "Wellington", id: "place-welln", is_closed: false, zone: "2" }
];

const routeType: RouteType = 3;
export const payload = [
  {
    train_number: "",
    route: {
      type: routeType,
      name: "1",
      long_name: "Harvard - Dudley via Massachusetts Avenue",
      id: "1",
      direction_names: { "1": "Inbound", "0": "Outbound" },
      direction_destinations: { "1": "Dudley", "0": "Harvard" },
      description: "key_bus_route",
      "custom_route?": false
    },
    prediction: {
      scheduled_time: ["3:44", " ", "PM"],
      prediction: {
        track: null,
        time: ["15", " ", "min"],
        status: null,
        seconds: 905
      },
      delay: 9
    },
    headsign: "Harvard"
  },
  {
    train_number: "",
    route: {
      type: routeType,
      name: "1",
      long_name: "Harvard - Dudley via Massachusetts Avenue",
      id: "1",
      direction_names: { "1": "Inbound", "0": "Outbound" },
      direction_destinations: { "1": "Dudley", "0": "Harvard" },
      description: "key_bus_route",
      "custom_route?": false
    },
    prediction: {
      scheduled_time: ["3:54", " ", "PM"],
      prediction: {
        track: null,
        time: ["11", " ", "min"],
        status: null,
        seconds: 707
      },
      delay: -4
    },
    headsign: "Harvard"
  }
];

export const busSchedulesPayload = {};

describe("ScheduleModal", () => {
  it("it renders", () => {
    let tree;
    act(() => {
      tree = renderer.create(
        <ScheduleModalContent
          route={route}
          stops={stops}
          selectedOrigin={stops[0].id}
          selectedDirection={0}
          services={[]}
          routePatternsByDirection={{}}
        />
      );
    });

    expect(tree).toMatchSnapshot();
  });

  it("it doesn't render if selectedOrigin is null", () => {
    let tree;
    act(() => {
      tree = renderer.create(
        <ScheduleModalContent
          route={route}
          stops={stops}
          selectedOrigin={null}
          selectedDirection={0}
          services={[]}
          routePatternsByDirection={{}}
        />
      );
      expect(tree!.toJSON()).toBeNull();
    });
  });

  it("it doesn't render if selectedDirection is null", () => {
    let tree;
    act(() => {
      tree = renderer.create(
        <ScheduleModalContent
          route={route}
          stops={stops}
          selectedOrigin={stops[0].id}
          selectedDirection={null}
          services={[]}
          routePatternsByDirection={{}}
        />
      );
      expect(tree!.toJSON()).toBeNull();
    });
  });
});
