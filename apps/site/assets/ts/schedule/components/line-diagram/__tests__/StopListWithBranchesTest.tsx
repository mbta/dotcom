import React from "react";
import * as redux from "react-redux";
import { mount, ReactWrapper } from "enzyme";
import { cloneDeep, merge } from "lodash";
import { RouteType } from "../../../../__v3api";
import { LineDiagramStop } from "../../__schedule";
import simpleLineDiagram from "./lineDiagramData/simple.json"; // not a full line diagram
import outwardLineDiagram from "./lineDiagramData/outward.json"; // not a full line diagram
import { createLineDiagramCoordStore } from "../graphics/graphic-helpers";
import StopListWithBranches from "../StopListWithBranches";
import StopCard from "../StopCard";
import ExpandableBranch from "../ExpandableBranch";

const lineDiagram = (simpleLineDiagram as unknown) as LineDiagramStop[];
let lineDiagramBranchingOut = (outwardLineDiagram as unknown) as LineDiagramStop[];

const route = {
  type: 2 as RouteType,
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
const liveData = {};
const store = createLineDiagramCoordStore(lineDiagram);

describe("StopListWithBranches", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(
      <redux.Provider store={store}>
        <StopListWithBranches
          stops={lineDiagramBranchingIn}
          handleStopClick={handleStopClick}
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

  it("renders branches as well as individual stops", () => {
    expect(wrapper.find(ExpandableBranch)).toHaveLength(1);
    expect(wrapper.find(StopCard)).toHaveLength(10);
  });

  describe("where branching inward", () => {
    it.each`
      index | expectedBranchNaming
      ${0}  | ${"Destination Line"}
      ${1}  | ${null}
      ${2}  | ${null}
      ${3}  | ${null}
      ${4}  | ${"Twig Destination Line"}
      ${5}  | ${null}
      ${6}  | ${"Branch Destination Line"}
      ${7}  | ${null}
      ${8}  | ${null}
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
  });
});
