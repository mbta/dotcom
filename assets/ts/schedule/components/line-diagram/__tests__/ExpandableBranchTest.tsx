import React from "react";
import * as redux from "react-redux";
import { mount, ReactWrapper } from "enzyme";
import { createStopTreeCoordStore } from "../graphics/useTreeStopPositions";
import { RouteStop, StopTree } from "../../__schedule";
import ExpandableBranch from "../ExpandableBranch";
import { RouteType } from "../../../../__v3api";

const stopTree: StopTree = {
  byId: {
    a1: {
      id: "a1",
      value: ({
        id: "a1",
        route: { id: "route-1", type: 3 },
        connections: [],
        stop_features: []
      } as unknown) as RouteStop
    },
    a2: {
      id: "a2",
      value: ({
        id: "a2",
        route: { id: "route-1", type: 3 },
        connections: [],
        stop_features: []
      } as unknown) as RouteStop
    },
    b1: {
      id: "b1",
      value: ({
        id: "b1",
        route: { id: "route-1", type: 3 },
        connections: [],
        stop_features: []
      } as unknown) as RouteStop
    },
    b2: {
      id: "b2",
      value: ({
        id: "b2",
        route: { id: "route-1", type: 3 },
        connections: [],
        stop_features: []
      } as unknown) as RouteStop
    },
    b3: {
      id: "b3",
      value: ({
        id: "b3",
        route: { id: "route-1", type: 3 },
        connections: [],
        stop_features: []
      } as unknown) as RouteStop
    },
    c1: {
      id: "c1",
      value: ({
        id: "c1",
        route: { id: "route-1", type: 3 },
        connections: [],
        stop_features: []
      } as unknown) as RouteStop
    },
    c2: {
      id: "c2",
      value: ({
        id: "c2",
        route: { id: "route-1", type: 3 },
        connections: [],
        stop_features: []
      } as unknown) as RouteStop
    },
    m1: {
      id: "m1",
      value: ({
        id: "m1",
        route: { id: "route-1", type: 3 },
        connections: [],
        stop_features: []
      } as unknown) as RouteStop
    },
    m2: {
      id: "m2",
      value: ({
        id: "m2",
        route: { id: "route-1", type: 3 },
        connections: [],
        stop_features: []
      } as unknown) as RouteStop
    },
    m3: {
      id: "m3",
      value: ({
        id: "m3",
        route: { id: "route-1", type: 3 },
        connections: [],
        stop_features: []
      } as unknown) as RouteStop
    },
    x1: {
      id: "x1",
      value: ({
        id: "x1",
        route: { id: "route-1", type: 3 },
        connections: [],
        stop_features: []
      } as unknown) as RouteStop
    },
    x2: {
      id: "x2",
      value: ({
        id: "x2",
        route: { id: "route-1", type: 3 },
        connections: [],
        stop_features: []
      } as unknown) as RouteStop
    },
    y1: {
      id: "y1",
      value: ({
        id: "y1",
        route: { id: "route-1", type: 3 },
        connections: [],
        stop_features: []
      } as unknown) as RouteStop
    }
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

const handleStopClick = () => {};

describe("ExpandableBranch", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <redux.Provider store={store}>
        <ExpandableBranch
          stopTree={stopTree}
          stopIds={["x1", "x2"]}
          alerts={[]}
          handleStopClick={handleStopClick}
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
