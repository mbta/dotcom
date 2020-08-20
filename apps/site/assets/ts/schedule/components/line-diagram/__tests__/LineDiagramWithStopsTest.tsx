import React from "react";
import * as redux from "react-redux";
import { mount, ReactWrapper } from "enzyme";
import { cloneDeep, merge } from "lodash";
import { RouteType } from "../../../../__v3api";
import { LineDiagramStop } from "../../__schedule";
import simpleLineDiagram from "./lineDiagramData/simple.json"; // not a full line diagram
import outwardLineDiagram from "./lineDiagramData/outward.json"; // not a full line diagram
import simpleLiveData from "./lineDiagramData/live-data.json";
import LineDiagramWithStops from "../LineDiagramWithStops";
import { createLineDiagramCoordStore } from "../state-helpers";
import StopListWithBranches from "../StopListWithBranches";

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

describe("LineDiagramWithStops", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(
      <redux.Provider store={store}>
        <LineDiagramWithStops
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

  it("shows <StopListWithBranches /> if the line has branches", () => {
    // wrapper's line diagram has no branches
    expect(wrapper.find(StopListWithBranches)).toHaveLength(0);
    const wrapperWithBranches = mount(
      <redux.Provider store={store}>
        <LineDiagramWithStops
          stops={lineDiagramBranchingOut}
          handleStopClick={handleStopClick}
          liveData={liveData}
        />
      </redux.Provider>
    );
    expect(wrapperWithBranches.find(StopListWithBranches)).toHaveLength(1);
  });
});
