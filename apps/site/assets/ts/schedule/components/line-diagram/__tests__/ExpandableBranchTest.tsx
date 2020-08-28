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
import ExpandableBranch from "../ExpandableBranch";

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
const liveData = {};
const store = createLineDiagramCoordStore(lineDiagram);

describe("ExpandableBranch", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(
      <redux.Provider store={store}>
        <ExpandableBranch
          stops={lineDiagram}
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

  it("expands a branch", () => {
    let moreStops = wrapper.find(
      ".c-expandable-block__panel .m-schedule-diagram__stop"
    );
    expect(moreStops.exists()).toBeFalsy();
    wrapper
      .find(
        ".m-schedule-diagram__expander .c-expandable-block__header[role='button']"
      )
      .first()
      .simulate("click");
    moreStops = wrapper.find(
      ".c-expandable-block__panel .m-schedule-diagram__stop"
    ); // update the reference so the test finds it
    expect(moreStops.exists()).toBeTruthy();
  });
});
