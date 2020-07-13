import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { cloneDeep, merge } from "lodash";
import LineDiagram from "../components/line-diagram/LineDiagram";
import { EnhancedRoute, RouteType } from "../../__v3api";
import {
  LineDiagramStop,
  RoutePatternsByDirection,
  SimpleStop
} from "../components/__schedule";
import * as routePatternsByDirection from "./routePatternsByDirectionData.json";
import simpleLineDiagram from "./lineDiagramData/simple.json"; // not a full line diagram
import outwardLineDiagram from "./lineDiagramData/outward.json"; // not a full line diagram
import simpleLiveData from "./lineDiagramData/live-data.json";

const lineDiagram = (simpleLineDiagram as unknown) as LineDiagramStop[];
let lineDiagramBranchingOut = (outwardLineDiagram as unknown) as LineDiagramStop[];

// Mock useSWR to return fixture data
jest.mock("swr", () => {
  return jest.fn(() => ({ data: simpleLiveData }));
});

const route = {
  type: 3 as RouteType,
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
};

lineDiagram.forEach(({ route_stop }) => {
  route_stop.route = cloneDeep(route);
});

lineDiagramBranchingOut.forEach(({ route_stop }) => {
  route_stop.route = cloneDeep(route);
});

let lineDiagramBranchingIn = cloneDeep(lineDiagramBranchingOut).reverse();
const CRroute = merge(cloneDeep(route), { type: 2 as RouteType });
lineDiagramBranchingIn.forEach(({ route_stop }) => {
  route_stop.route = CRroute;
  if (route_stop["is_terminus?"]) {
    route_stop["is_beginning?"] = !route_stop["is_beginning?"];
  }
});

const stops = lineDiagram.map(({ route_stop }) => ({
  name: route_stop.name,
  id: route_stop.id,
  is_closed: false,
  zone: route_stop.zone || null
})) as SimpleStop[];

const directionId = 1;

describe("LineDiagram without branches", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(
      <LineDiagram
        lineDiagram={lineDiagram}
        route={route as EnhancedRoute}
        directionId={directionId}
        routePatternsByDirection={
          routePatternsByDirection as RoutePatternsByDirection
        }
        services={[]}
        stops={{ 0: stops, 1: stops }}
        today="2019-12-05"
        scheduleNote={null}
      />
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renders and matches snapshot", () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("includes a button to open Schedule Finder on each stop", () => {
    expect(wrapper.exists(".schedule-finder--modal")).toBeFalsy();

    wrapper
      .find(".m-schedule-diagram__footer > button")
      .first()
      .simulate("click");
    expect(wrapper.exists(".schedule-finder--modal")).toBeTruthy();
    expect(wrapper.exists("#modal-close")).toBeTruthy();

    wrapper.find("#modal-close").simulate("click");
    expect(wrapper.exists(".schedule-finder--modal")).toBeFalsy();
    expect(wrapper.exists("#modal-close")).toBeFalsy();
  });

  it("has a tooltip for a transit connection", () => {
    const stopConnections = wrapper.find(".m-schedule-diagram__connections a");
    stopConnections.forEach(connectionLink => {
      const props = connectionLink.props();
      expect(props.title).toBeTruthy();
      expect(Object.entries(props)).toContainEqual(["data-toggle", "tooltip"]);
    });
  });

  it.each`
    index | expectedAlerts
    ${0}  | ${0}
    ${1}  | ${0}
    ${2}  | ${1}
    ${3}  | ${0}
  `(
    "shows $expectedAlerts high priority alerts for stop $index",
    ({ index, expectedAlerts }) => {
      const alerts = wrapper
        .find(".m-schedule-diagram__stop")
        .at(index)
        .find(".c-svg__icon-alerts-triangle");
      expect(alerts.length).toEqual(expectedAlerts);
    }
  );

  it.each`
    index | expectedNames                      | expectedFeatures
    ${0}  | ${[]}                              | ${["Parking"]}
    ${1}  | ${["Orange Line", "Green Line C"]} | ${[]}
    ${2}  | ${["Route 62", "Route 67"]}        | ${["Accessible"]}
    ${3}  | ${["Atlantis"]}                    | ${["Parking", "Accessible"]}
  `(
    "has appropriate tooltip content for stop $index",
    ({ index, expectedNames, expectedFeatures }) => {
      const connections = wrapper
        .find(".m-schedule-diagram__connections")
        .at(index);

      const names = connections.find("a").map(c => c.props().title);
      expect(names).toEqual(expectedNames);

      const features = wrapper.find(".m-schedule-diagram__features").at(index);

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

describe("LineDiagram with branches going outward", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(
      <LineDiagram
        lineDiagram={lineDiagramBranchingOut}
        route={route as EnhancedRoute}
        directionId={directionId}
        routePatternsByDirection={
          routePatternsByDirection as RoutePatternsByDirection
        }
        services={[]}
        stops={{ 0: stops, 1: stops }}
        today="2019-12-05"
        scheduleNote={null}
      />
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renders and matches snapshot", () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("identifies stops rather than stations", () => {
    expect(wrapper.find(".m-schedule-diagram__heading").text()).toEqual(
      "Stops"
    );
  });

  it("identifies the tree direction as outward", () => {
    expect(wrapper.find(".m-schedule-diagram--outward").exists()).toBeTruthy();
  });

  it.each`
    index | expectedBranchNaming
    ${0}  | ${null}
    ${1}  | ${null}
    ${2}  | ${null}
    ${3}  | ${null}
    ${4}  | ${"Branch Destination Branch"}
    ${5}  | ${null}
    ${6}  | ${"Twig Destination Branch"}
    ${7}  | ${null}
    ${8}  | ${"Destination Branch"}
  `(
    "shows branch name $expectedBranchNaming at stop $index",
    ({ index, expectedBranchNaming }) => {
      const branchNameNode = wrapper
        .find(".m-schedule-diagram__stop")
        .at(index)
        .find(".u-small-caps");

      if (expectedBranchNaming) {
        expect(branchNameNode.text()).toEqual(expectedBranchNaming);
      } else {
        expect(branchNameNode.exists()).toBeFalsy();
      }
    }
  );

  it("renders different parts of branches with different markup", () => {
    const terminus = wrapper
      .find(".m-schedule-diagram__line--terminus")
      .first()
      .html();
    const stop = wrapper
      .find(".m-schedule-diagram__line--stop")
      .first()
      .html();
    const line = wrapper
      .find(".m-schedule-diagram__line--line")
      .first()
      .html();

    expect(terminus).not.toEqual(stop);
    expect(terminus).not.toEqual(line);
    expect(stop).not.toEqual(line);
  });
});

describe("LineDiagram for CR with branches going inward", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <LineDiagram
        lineDiagram={lineDiagramBranchingIn}
        route={CRroute as EnhancedRoute}
        directionId={directionId}
        routePatternsByDirection={
          routePatternsByDirection as RoutePatternsByDirection
        }
        services={[]}
        stops={{ 0: stops, 1: stops }}
        today="2019-12-05"
        scheduleNote={null}
      />
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renders and matches snapshot", () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("identifies stations rather than stops", () => {
    expect(wrapper.find(".m-schedule-diagram__heading").text()).toEqual(
      "Stations"
    );
  });

  it("identifies the tree direction as inward", () => {
    expect(wrapper.find(".m-schedule-diagram--inward").exists()).toBeTruthy();
  });

  it.each`
    index | expectedBranchNaming
    ${8}  | ${null}
    ${7}  | ${null}
    ${6}  | ${null}
    ${5}  | ${null}
    ${4}  | ${"Branch Destination Line"}
    ${3}  | ${null}
    ${2}  | ${"Twig Destination Line"}
    ${1}  | ${null}
    ${0}  | ${"Destination Line"}
  `(
    "shows branch name $expectedBranchNaming at stop $index",
    ({ index, expectedBranchNaming }) => {
      const branchNameNode = wrapper
        .find(".m-schedule-diagram__stop")
        .at(index)
        .find(".u-small-caps");

      if (expectedBranchNaming) {
        expect(branchNameNode.text()).toEqual(expectedBranchNaming);
      } else {
        expect(branchNameNode.exists()).toBeFalsy();
      }
    }
  );

  it("expands a branch", () => {
    expect(
      wrapper
        .find(".c-expandable-block__panel .m-schedule-diagram__stop")
        .exists()
    ).toBeFalsy();
    wrapper
      .find(
        ".m-schedule-diagram__expander .c-expandable-block__header[role='button']"
      )
      .first()
      .simulate("click");
    const moreStops = wrapper.find(
      ".c-expandable-block__panel .m-schedule-diagram__stop"
    );
    expect(moreStops.exists()).toBeTruthy();
  });
});
