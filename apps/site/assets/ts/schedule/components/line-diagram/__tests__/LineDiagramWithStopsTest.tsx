import React, { MutableRefObject } from "react";
import * as redux from "react-redux";
import { mount, ReactWrapper } from "enzyme";
import { cloneDeep, merge } from "lodash";
import { RouteType } from "../../../../__v3api";
import { LineDiagramStop } from "../../__schedule";
import simpleLineDiagram from "./lineDiagramData/simple.json"; // not a full line diagram
import outwardLineDiagram from "./lineDiagramData/outward.json"; // not a full line diagram
import LineDiagramWithStops from "../LineDiagramWithStops";
import { createLineDiagramCoordStore } from "../graphics/graphic-helpers";
import StopListWithBranches from "../StopListWithBranches";
import * as UseStopPositions from "../graphics/useStopPositions";

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
const spy = jest.spyOn(UseStopPositions, 'default');

// mock the redux state so that snapshot has positioned stops
const mockState = lineDiagram.reduce(
  (acc, stop, index) => ({
    ...acc,
    [stop.route_stop.id]: [10, index * 20 + 30]
  }),
  {}
);
jest
  .spyOn(redux, "useSelector")
  .mockImplementation(selector => selector(mockState));

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

  it("uses the useStopPositions hook", () => {
    expect(spy).toHaveBeenCalled();
  })

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
