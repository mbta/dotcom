import React from "react";
import * as redux from "react-redux";
import { mount, ReactWrapper } from "enzyme";
import { cloneDeep, merge } from "lodash";
import { RouteType } from "../../../../__v3api";
import { LineDiagramStop, CrowdingType } from "../../__schedule";
import simpleLineDiagram from "./lineDiagramData/simple.json"; // not a full line diagram
import outwardLineDiagram from "./lineDiagramData/outward.json"; // not a full line diagram
import LineDiagramWithStops from "../LineDiagramWithStops";
import { createLineDiagramCoordStore } from "../graphics/graphic-helpers";
import StopListWithBranches from "../StopListWithBranches";
import * as UseStopPositions from "../graphics/useStopPositions";
import * as simpleLiveData from "./lineDiagramData/live-data.json";
import { LiveDataByStop } from "../__line-diagram";

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
const liveData = (simpleLiveData as unknown) as LiveDataByStop;
const liveDataWithCrowding = (cloneDeep(
  simpleLiveData
) as unknown) as LiveDataByStop;
(liveDataWithCrowding["line-stop2"].headsigns[0].time_data_with_crowding_list[0]
  .crowding as CrowdingType) = "not_crowded";
const store = createLineDiagramCoordStore(lineDiagram);
const spy = jest.spyOn(UseStopPositions, "default");

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

  it("toggles u-no-crowding-data class if crowding present", () => {
    expect(wrapper.exists(".u-no-crowding-data")).toBeTruthy();
    const wrapperWithCrowding = mount(
      <redux.Provider store={store}>
        <LineDiagramWithStops
          stops={lineDiagram}
          handleStopClick={handleStopClick}
          liveData={liveDataWithCrowding}
        />
      </redux.Provider>
    );
    expect(wrapperWithCrowding.exists(".u-no-crowding-data")).toBeFalsy();
  });
});
