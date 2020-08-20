import React from "react";
import * as redux from "react-redux";
import { mount, ReactWrapper } from "enzyme";
import { cloneDeep, merge } from "lodash";
import { RouteType } from "../../../../__v3api";
import { LineDiagramStop } from "../../__schedule";
import simpleLineDiagram from "./lineDiagramData/simple.json"; // not a full line diagram
import outwardLineDiagram from "./lineDiagramData/outward.json"; // not a full line diagram
import { createLineDiagramCoordStore } from "../state-helpers";
import StopCard from "../StopCard";

const lineDiagram = (simpleLineDiagram as unknown) as LineDiagramStop[];
let lineDiagramBranchingOut = (outwardLineDiagram as unknown) as LineDiagramStop[];

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
  alerts: []
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

const handleStopClick = () => {};
const liveData = { headsigns: [], vehicles: [] };
const store = createLineDiagramCoordStore(lineDiagram);

describe("StopCard", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(
      <redux.Provider store={store}>
        <StopCard
          stop={lineDiagram[0]}
          onClick={handleStopClick}
          liveData={liveData}
        />
      </redux.Provider>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renders and matches snapshot", () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("includes a button to open Schedule Finder on each stop", () => {
    expect(wrapper.exists(".m-schedule-diagram__footer > button")).toBeTruthy();
    expect(
      wrapper.find(".m-schedule-diagram__footer > button").text()
    ).toContain("View schedule");
  });

  it("has a tooltip for a transit connection", () => {
    const stopConnections = wrapper.find(".m-schedule-diagram__connections a");
    stopConnections.forEach(connectionLink => {
      const props = connectionLink.props();
      expect(props.title).toBeTruthy();
      expect(Object.entries(props)).toContainEqual(["data-toggle", "tooltip"]);
    });
  });
});

it.each`
  index | expectedAlerts
  ${0}  | ${0}
  ${1}  | ${1}
  ${2}  | ${1}
  ${3}  | ${0}
`(
  "shows $expectedAlerts high priority or high severity alerts for stop $index",
  ({ index, expectedAlerts }) => {
    const wrapperWithAlerts = mount(
      <redux.Provider store={store}>
        <StopCard
          stop={lineDiagram[index]}
          onClick={handleStopClick}
          liveData={liveData}
        />
      </redux.Provider>
    );
    const alerts = wrapperWithAlerts.find(
      ".m-schedule-diagram__stop-link .c-svg__icon-alerts-triangle"
    );
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
    const wrapper = mount(
      <redux.Provider store={store}>
        <StopCard
          stop={lineDiagram[index]}
          onClick={handleStopClick}
          liveData={liveData}
        />
      </redux.Provider>
    );

    const connections = wrapper.find(".m-schedule-diagram__connections");

    const names = connections.find("a").map(c => c.props().title);
    expect(names).toEqual(expectedNames);

    const features = wrapper.find(".m-schedule-diagram__features");

    const featureNames = features
      .find("span[data-toggle='tooltip']")
      .map(c => c.props().title);
    expect(featureNames).toEqual(expectedFeatures);
  }
);
