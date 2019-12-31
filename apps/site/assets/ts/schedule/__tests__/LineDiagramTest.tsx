import React from "react";
import { mount, ReactWrapper } from "enzyme";
import LineDiagram from "../components/LineDiagram";
import { EnhancedRoute } from "../../__v3api";
import {
  LineDiagramStop,
  RoutePatternsByDirection,
  SimpleStop
} from "../components/__schedule";
import * as routePatternsByDirection from "./routePatternsByDirectionData.json";
import lineDiagramData from "./lineDiagramData.json"; // Not a full line diagram
import lineDiagramWithBranchesData from "./lineDiagramWithBranchesData.json"; // Not a full line diagram

const route = {
  type: 3,
  name: "route 1",
  long_name: "route 1 long name",
  color: "F00B42",
  id: "route-1",
  direction_names: {
    0: "Outbound",
    1: "Inbound"
  },
  direction_destinations: {
    0: "Begin",
    1: "End"
  },
  description: "key_bus_route",
  "custom_route?": false,
  header: "",
  alert_count: 0
} as EnhancedRoute;

const lineDiagram = lineDiagramData as LineDiagramStop[];

const stops = lineDiagram.map(({ route_stop }) => ({
  name: route_stop.name,
  id: route_stop.id,
  is_closed: false,
  zone: route_stop.zone || null
})) as SimpleStop[];

const directionId = 1;

describe("LineDiagram", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(
      <LineDiagram
        lineDiagram={lineDiagram}
        route={route}
        directionId={directionId}
        routePatternsByDirection={
          routePatternsByDirection as RoutePatternsByDirection
        }
        services={[]}
        ratingEndDate="2020-03-14"
        stops={{ 0: stops, 1: stops }}
      />
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renders and matches snapshot", () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("has buttons to view schedules for each stop", () => {
    const stopCards = wrapper.find(".m-schedule-line-diagram__stop");
    const buttons = stopCards.map(card =>
      card.find(".m-schedule-line-diagram__footer button")
    );
    expect(buttons.map(node => node.text())).toEqual(
      Array.from({ length: buttons.length }, () => "View schedule")
    );
  });

  it("opens a closeable modal after clicking button", () => {
    expect(wrapper.exists(".schedule-finder__modal-header")).toBeFalsy();
    wrapper
      .find(".m-schedule-line-diagram__footer > button")
      .last()
      .simulate("click");
    expect(wrapper.exists(".schedule-finder__modal-header")).toBeTruthy();
    expect(wrapper.exists("#modal-close")).toBeTruthy();
    wrapper.find("#modal-close").simulate("click");
    expect(wrapper.exists(".schedule-finder__modal-header")).toBeFalsy();
    expect(wrapper.exists("#modal-close")).toBeFalsy();
  });

  it("has a tooltip for a transit connection", () => {
    const stopConnections = wrapper.find(
      ".m-schedule-line-diagram__connections a"
    );
    stopConnections.forEach(connectionLink => {
      const props = connectionLink.props();
      expect(props.title).toBeTruthy();
      expect(Object.entries(props)).toContainEqual(["data-toggle", "tooltip"]);
    });
  });

  it.each`
    index | expectedNames                                                                             | expectedFeatures
    ${0}  | ${["Route 110"]}                                                                          | ${[]}
    ${1}  | ${["Silver Line SL1"]}                                                                    | ${[]}
    ${2}  | ${["Orange Line", "Green Line C", "Green Line E", "Commuter Rail"]}                       | ${["Parking", "Accessible"]}
    ${3}  | ${["Route 62", "Route 67", "Route 76", "Route 79", "Route 84", "Route 350", "Route 351"]} | ${["Parking", "Accessible"]}
  `(
    "has appropriate tooltip content for stop $index",
    ({ index, expectedNames, expectedFeatures }) => {
      const connections = wrapper
        .find(".m-schedule-line-diagram__connections")
        .at(index);

      const names = connections.find("a").map(c => c.props().title);
      expect(names).toEqual(expectedNames);

      const features = wrapper
        .find(".m-schedule-line-diagram__features")
        .at(index);

      const featureNames = features
        .find("span[data-toggle='tooltip']")
        .map(c => c.props().title);
      expect(featureNames).toEqual(expectedFeatures);
    }
  );

  it("uses the route color", () => {
    const line = wrapper.find(".m-schedule-diagram__lines").first();
    expect(line.prop("style")!.color).toBe("#F00B42");
  });
});

describe("LineDiagram with branches", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(
      <LineDiagram
        lineDiagram={lineDiagramWithBranchesData as LineDiagramStop[]}
        route={route}
        directionId={directionId}
        routePatternsByDirection={
          routePatternsByDirection as RoutePatternsByDirection
        }
        services={[]}
        ratingEndDate="2020-03-14"
        stops={{ 0: stops, 1: stops }}
      />
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renders and matches snapshot", () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("shows branch name", () => {
    expect(wrapper.find(".u-small-caps").text()).toEqual("Lowell Two Line");
  });

  it("renders different parts of branches", () => {
    const terminus = wrapper
      .find(".m-schedule-diagram__line--terminus")
      .first().html();
    const merge = wrapper
      .find(".m-schedule-diagram__line--merge")
      .first().html();
    const stop = wrapper
      .find(".m-schedule-diagram__line--stop")
      .first().html();
    const line = wrapper
      .find(".m-schedule-diagram__line--line")
      .first().html();

    expect(terminus).not.toEqual(stop);
    expect(terminus).not.toEqual(line);
    expect(terminus).not.toEqual(merge);
    expect(stop).not.toEqual(merge);
    expect(stop).not.toEqual(line);
    expect(line).not.toEqual(merge);
  });
});
