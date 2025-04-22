import React from "react";
import * as redux from "react-redux";
import { mount, ReactWrapper } from "enzyme";
import { RouteStop, StopTree } from "../../__schedule";
import { createStopTreeCoordStore } from "../graphics/useTreeStopPositions";
import { Diagram } from "../graphics/Diagram";
import { Route, RouteType } from "../../../../__v3api";
import Stop from "../graphics/Stop";
import { LiveDataByStop } from "../__line-diagram";

const stopTree: StopTree = {
  byId: {
    a1: { id: "a1", value: { id: "a1" } as RouteStop },
    a2: { id: "a2", value: { id: "a2" } as RouteStop },
    b1: { id: "b1", value: { id: "b1" } as RouteStop },
    b2: { id: "b2", value: { id: "b2" } as RouteStop },
    b3: { id: "b3", value: { id: "b3" } as RouteStop },
    c1: { id: "c1", value: { id: "c1" } as RouteStop },
    c2: { id: "c2", value: { id: "c2" } as RouteStop },
    m1: { id: "m1", value: { id: "m1" } as RouteStop },
    m2: { id: "m2", value: { id: "m2" } as RouteStop },
    m3: { id: "m3", value: { id: "m3" } as RouteStop },
    x1: { id: "x1", value: { id: "x1" } as RouteStop },
    x2: { id: "x2", value: { id: "x2" } as RouteStop },
    y1: { id: "y1", value: { id: "y1" } as RouteStop }
  },
  edges: {
    a1: { next: ["a2"], previous: [] },
    a2: { next: ["m1"], previous: ["a1"] },
    b1: { next: ["b2"], previous: [] },
    b2: { next: ["b3"], previous: ["b1"] },
    b3: { next: ["m1"], previous: ["b2"] },
    c1: { next: ["c2"], previous: [] },
    c2: { next: ["m2"], previous: ["c1"] },
    m1: { next: ["m2"], previous: ["a2", "b3"] },
    m2: { next: ["m3"], previous: ["c2", "m1"] },
    m3: { next: ["x1", "y1"], previous: ["m2"] },
    x1: { next: ["x2"], previous: ["m3"] },
    x2: { next: [], previous: ["x1"] },
    y1: { next: [], previous: ["m3"] }
  },
  startingNodes: ["a1", "b1", "c1"]
};
const store = createStopTreeCoordStore(stopTree);

const route: Route = {
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
  description: "frequent_bus_route",
  line_id: null
};

describe("Diagram", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(
      <redux.Provider store={store}>
        <Diagram
          stopTree={stopTree}
          route={route}
          directionId={1}
          alerts={[]}
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

  it("uses the route color CSS class", () => {
    expect(wrapper.exists(".line-diagram-svg.bus")).toBeTruthy();
  });

  it("shows an SVG", () => {
    expect(wrapper.exists("svg.line-diagram-svg")).toBeTruthy();
    expect(wrapper.exists("line.line-diagram-svg__line")).toBeTruthy();
  });

  it("should draw each stop", () => {
    expect(wrapper.exists(Stop)).toBeTruthy();
    expect(wrapper.find(Stop)).toHaveLength(13);
  });

  it("shows merges for branches", () => {
    expect(wrapper.exists("g.line-diagram-svg__merge")).toBeTruthy();
  });
});
