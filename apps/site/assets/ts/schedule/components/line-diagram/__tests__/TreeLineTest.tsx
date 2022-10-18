import { mount, ReactWrapper } from "enzyme";
import React from "react";
import * as redux from "react-redux";
import { aroundNow } from "../../../../models/__tests__/alert-test";
import { Alert, InformedEntitySet } from "../../../../__v3api";
import { RouteStop, StopTree } from "../../__schedule";
import { BASE_LINE_WIDTH } from "../graphics/graphic-helpers";
import TreeLine from "../graphics/TreeLine";
import { createStopTreeCoordStore } from "../graphics/useTreeStopPositions";

const routeStopA: RouteStop = { id: "a" } as RouteStop;
const routeStopB: RouteStop = { id: "b" } as RouteStop;
const routeStopC: RouteStop = { id: "c" } as RouteStop;
const routeStopD: RouteStop = { id: "d" } as RouteStop;
const routeStopE: RouteStop = { id: "e" } as RouteStop;

const stopTree: StopTree = {
  byId: {
    a: { id: "a", value: routeStopA },
    b: { id: "b", value: routeStopB },
    c: { id: "c", value: routeStopC },
    d: { id: "d", value: routeStopD },
    e: { id: "e", value: routeStopE }
  },
  edges: {
    a: { next: ["b"], previous: [] },
    b: { next: ["c", "d"], previous: ["a"] },
    c: { next: ["e"], previous: ["b"] },
    d: { next: [], previous: ["b"] },
    e: { next: [], previous: ["c"] }
  },
  startingNodes: ["a"]
};
const store = createStopTreeCoordStore(stopTree);

const [testX, testY] = [7, 17];
// mock the redux state
const mockState = {
  ["a"]: [testX, testY],
  ["b"]: [testX, testY + 7],
  ["c"]: [testX, testY + 14],
  ["d"]: [testX, testY + 14]
};

const alertA: Alert = {
  id: "MOCK-ALERT-A",
  severity: 7,
  priority: "high",
  lifecycle: "new",
  effect: "stop_closure",
  informed_entity: { stop: ["a"] } as InformedEntitySet,
  active_period: aroundNow()
} as Alert;
const alertB: Alert = {
  id: "MOCK-ALERT-B",
  severity: 7,
  priority: "high",
  lifecycle: "new",
  effect: "stop_closure",
  informed_entity: { stop: ["b"] } as InformedEntitySet,
  active_period: aroundNow()
} as Alert;

jest
  .spyOn(redux, "useSelector")
  .mockImplementation(selector => selector(mockState));

describe("TreeLine component", () => {
  let wrapper: ReactWrapper;
  beforeAll(() => {
    wrapper = mount(
      <redux.Provider store={store}>
        <svg>
          <TreeLine stopTree={stopTree} fromId={"a"} toId={"b"} alerts={[]} />
        </svg>
      </redux.Provider>
    );
  });

  it("renders and matches snapshot", () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("shows an SVG line between the stops", () => {
    expect(wrapper.exists("line.line-diagram-svg__line")).toBeTruthy();
  });

  it("standard line has expected props", () => {
    const { x1, y1, x2, y2, strokeWidth } = wrapper
      .find("line.line-diagram-svg__line")
      .first()
      .props();
    expect(strokeWidth).toEqual(`${BASE_LINE_WIDTH}px`);
    expect(x1).toEqual(`${BASE_LINE_WIDTH + 1}px`);
    expect(x2).toEqual(`${BASE_LINE_WIDTH + 1}px`);
    expect(y1).toEqual(`${testY}px`);
    expect(y2).toEqual(`${testY + 7}px`);
  });
});

describe("TreeLine component between stops with branches", () => {
  let wrapper: ReactWrapper;
  beforeAll(() => {
    wrapper = mount(
      <redux.Provider store={store}>
        <TreeLine stopTree={stopTree} fromId={"b"} toId={"d"} alerts={[]} />
      </redux.Provider>
    );
  });

  it("renders and matches snapshot", () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("shows an SVG line between the stops", () => {
    expect(wrapper.exists("line.line-diagram-svg__line")).toBeTruthy();
  });

  it("line on branch has expected props", () => {
    const { x1, y1, x2, y2, strokeWidth } = wrapper
      .find("line.line-diagram-svg__line")
      .last()
      .props();
    expect(strokeWidth).toEqual(`${BASE_LINE_WIDTH}px`);
    expect(x1).toEqual(`${BASE_LINE_WIDTH + 1}px`);
    expect(x2).toEqual(`${BASE_LINE_WIDTH + 1}px`);
    expect(y1).toEqual(`${testY + 7}px`);
    expect(y2).toEqual(`${testY + 14}px`);
  });
});

describe("TreeLine component between stops with disruptions", () => {
  let wrapper: ReactWrapper;
  beforeAll(() => {
    wrapper = mount(
      <redux.Provider store={store}>
        <TreeLine
          stopTree={stopTree}
          fromId={"a"}
          toId={"b"}
          alerts={[alertA, alertB]}
        />
      </redux.Provider>
    );
  });

  it("renders and matches snapshot", () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("shows an SVG line between the stops", () => {
    expect(wrapper.exists("line.line-diagram-svg__line")).toBeTruthy();
  });

  it("has expected props, including stroke pattern", () => {
    const { x1, y1, x2, y2, strokeWidth, stroke } = wrapper
      .find("line.line-diagram-svg__line")
      .last()
      .props();
    expect(strokeWidth).toEqual(`${BASE_LINE_WIDTH}px`);
    expect(x1).toEqual(`${BASE_LINE_WIDTH + 1}px`);
    expect(x2).toEqual(`${BASE_LINE_WIDTH + 1}px`);
    expect(y1).toEqual(`${testY}px`);
    expect(y2).toEqual(`${testY + 7}px`);
    expect(stroke).toContain("url(#diagonalHatch)");
  });
});
