import { mount, ReactWrapper } from "enzyme";
import React from "react";
import * as redux from "react-redux";
import { stopIds } from "../../../../helpers/stop-tree";
import { RouteStop, StopTree } from "../../__schedule";
import Merges from "../graphics/Merges";
import { createStopTreeCoordStore } from "../graphics/useTreeStopPositions";

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

const [testX, testY] = [7, 17];
// mock the redux state so that snapshot has positioned stops
const mockState = stopIds(stopTree).reduce(
  (acc, stopId, index) => ({
    ...acc,
    [stopId]: [10, index * 20 + 30]
  }),
  {}
);

jest
  .spyOn(redux, "useSelector")
  .mockImplementation(selector => selector(mockState));

describe("Merges", () => {
  let wrapper: ReactWrapper;
  beforeAll(() => {
    wrapper = mount(
      <redux.Provider store={store}>
        <svg>
          <Merges stopTree={stopTree} alerts={[]} />
        </svg>
      </redux.Provider>
    );
  });

  it("renders and matches snapshot", () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("shows an SVG group for the merge point", () => {
    expect(wrapper.exists("g.line-diagram-svg__merge")).toBeTruthy();
    expect(
      wrapper.exists("g.line-diagram-svg__merge line.line-diagram-svg__line")
    ).toBeTruthy();
    expect(wrapper.exists("g.line-diagram-svg__merge path")).toBeTruthy();
  });

  it("shows nothing when there are no branches", () => {
    const simpleStopTree: StopTree = {
      byId: {
        a: { id: "a", value: { id: "a" } as RouteStop },
        b: { id: "b", value: { id: "b" } as RouteStop },
        c: { id: "c", value: { id: "c" } as RouteStop }
      },
      edges: {
        a: { next: ["b"], previous: [] },
        b: { next: ["c"], previous: ["a"] },
        c: { next: [], previous: ["b"] }
      },
      startingNodes: ["a"]
    };

    const wrapperNoBranches = mount(
      <redux.Provider store={store}>
        <svg>
          <Merges stopTree={simpleStopTree} alerts={[]} />
        </svg>
      </redux.Provider>
    );

    expect(
      wrapperNoBranches.exists("g.line-diagram-svg__merge")
    ).not.toBeTruthy();
    expect(
      wrapperNoBranches.exists(
        "g.line-diagram-svg__merge line.line-diagram-svg__line"
      )
    ).not.toBeTruthy();
    expect(
      wrapperNoBranches.exists("g.line-diagram-svg__merge path")
    ).not.toBeTruthy();
  });
});
