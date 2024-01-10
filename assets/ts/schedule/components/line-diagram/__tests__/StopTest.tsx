import React from "react";
import * as redux from "react-redux";
import { mount, ReactWrapper } from "enzyme";
import { RouteStop, StopTree } from "../../__schedule";
import { CIRC_RADIUS } from "../graphics/graphic-helpers";
import Stop from "../graphics/Stop";
import { createStopTreeCoordStore } from "../graphics/useTreeStopPositions";

const [testX, testY] = [7, 17];
const stopTree: StopTree = {
  byId: {
    a: {
      id: "a",
      value: ({
        id: "a",
        connections: [{ id: "Orange", name: "Orange Line" }],
        stop_features: ["parking_lot"]
      } as unknown) as RouteStop
    },
    b: {
      id: "b",
      value: ({
        id: "b",
        connections: [],
        stop_features: []
      } as unknown) as RouteStop
    },
    c: {
      id: "c",
      value: ({
        id: "c",
        connections: [],
        stop_features: []
      } as unknown) as RouteStop
    }
  },
  edges: {
    a: { next: ["b"], previous: [] },
    b: { next: ["c"], previous: ["a"] },
    c: { next: [], previous: ["b"] }
  },
  startingNodes: ["a"]
};
const store = createStopTreeCoordStore(stopTree);

const stopId = "a";
// mock the redux state
const mockState = {
  [stopId]: [testX, testY]
};
jest
  .spyOn(redux, "useSelector")
  .mockImplementation(selector => selector(mockState));

describe("Stop component", () => {
  let wrapper: ReactWrapper;
  beforeAll(() => {
    wrapper = mount(
      <redux.Provider store={store}>
        <svg>
          <Stop stopId={stopId} />
        </svg>
      </redux.Provider>
    );
  });

  it("renders and matches snapshot", () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("shows an SVG circle for the stop", () => {
    expect(wrapper.exists("circle.line-diagram-svg__stop")).toBeTruthy();
  });

  it("circle has expected props", () => {
    const { r, cx, cy } = wrapper.find("circle.line-diagram-svg__stop").props();
    expect(r).toEqual(`${CIRC_RADIUS}px`);
    expect(cx).toEqual(`${testX}px`);
    expect(cy).toEqual(`${testY}px`);
  });
});
