import React from "react";
import * as redux from "react-redux";
import { mount, ReactWrapper } from "enzyme";
import { cloneDeep, merge } from "lodash";
import { RouteType } from "../../../../__v3api";
import { LineDiagramStop } from "../../__schedule";
import simpleLineDiagram from "./lineDiagramData/simple.json"; // not a full line diagram
import outwardLineDiagram from "./lineDiagramData/outward.json"; // not a full line diagram
import { createLineDiagramCoordStore } from "../graphics/graphic-helpers";
import Diagram from "../graphics/Diagram";
import { LiveDataByStop } from "../__line-diagram";
import VehicleIcons from "../VehicleIcons";

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

const liveData = {};
const store = createLineDiagramCoordStore(lineDiagramBranchingOut);
// mock the redux state
const mockState = [...lineDiagram, ...lineDiagramBranchingOut].reduce(
  (acc, stop, index) => ({
    ...acc,
    [stop.route_stop.id]: [10, index * 20 + 30]
  }),
  {}
);
jest
  .spyOn(redux, "useSelector")
  .mockImplementation(selector => selector(mockState));

test("<Diagram /> filters out incoming <VehicleIcons /> at first stop", () => {
  const liveDataVehiclesArrivingToOrigin: LiveDataByStop = {
    "line-origin": {
      headsigns: [],
      vehicles: [
        {
          id: "veh0",
          status: "stopped",
          crowding: null,
          tooltip: "tooltip for stopped vehicle at stop 1"
        },
        {
          id: "veh1",
          status: "incoming",
          crowding: null,
          tooltip: "tooltip for vehicle 1 incoming to stop 1"
        },
        {
          id: "veh2",
          status: "in_transit",
          crowding: null,
          tooltip: "tooltip for vehicle 2 in_transit at stop 1"
        }
      ]
    }
  };
  const wrapper = mount(
    <redux.Provider store={store}>
      <Diagram
        lineDiagram={lineDiagram}
        liveData={liveDataVehiclesArrivingToOrigin}
      />
    </redux.Provider>
  );
  expect(wrapper.find(VehicleIcons)).toHaveLength(1);
  const iconHtml = wrapper
    .find(VehicleIcons)
    .first()
    .html();
  expect(iconHtml).toContain("tooltip for stopped vehicle at stop 1");
  expect(iconHtml).not.toContain("tooltip for vehicle 1 incoming to stop 1");
  expect(iconHtml).not.toContain("tooltip for vehicle 2 in_transit at stop 1");
});

describe.each`
  source                     | situation                        | css
  ${lineDiagram}             | ${"for simple lines"}            | ${"bus"}
  ${lineDiagramBranchingOut} | ${"with branches going outward"} | ${"bus"}
  ${lineDiagramBranchingIn}  | ${"with branches going inward"}  | ${"commuter-rail"}
`("Diagram $situation", ({ source, css }) => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(
      <redux.Provider store={store}>
        <Diagram lineDiagram={source} liveData={liveData} />
      </redux.Provider>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renders and matches snapshot", () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("uses the route color CSS class", () => {
    expect(wrapper.exists(`.line-diagram-svg.${css}`)).toBeTruthy();
  });

  it("shows an SVG", () => {
    expect(wrapper.exists("svg.line-diagram-svg")).toBeTruthy();
    expect(wrapper.exists("line.line-diagram-svg__line")).toBeTruthy();
    expect(wrapper.exists("circle.line-diagram-svg__stop")).toBeTruthy();
    expect(wrapper.find("circle.line-diagram-svg__stop")).toHaveLength(
      source.length
    );
  });

  it("shows no merge if no branches", () => {
    if (source === lineDiagram) {
      // no branches expected
      expect(wrapper.exists("g.line-diagram-svg__merge")).toBeFalsy();
      expect(wrapper.exists("g.line-diagram-svg__merge path")).toBeFalsy();
    } else {
      // has branches
      expect(wrapper.exists("g.line-diagram-svg__merge")).toBeTruthy();
      expect(wrapper.exists("g.line-diagram-svg__merge path")).toBeTruthy();
    }
  });
});
