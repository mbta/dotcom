import React from "react";
import * as redux from "react-redux";
import { mount, ReactWrapper } from "enzyme";
import { LineDiagramStop } from "../../__schedule";
import simpleLineDiagram from "./lineDiagramData/simple.json"; // not a full line diagram
import {
  createLineDiagramCoordStore,
  CIRC_RADIUS
} from "../graphics/graphic-helpers";
import Stop from "../graphics/Stop";
const lineDiagram = (simpleLineDiagram as unknown) as LineDiagramStop[];

const [testX, testY] = [7, 17];
const store = createLineDiagramCoordStore([lineDiagram[0]]);
// mock the redux state
const mockState = {
  [lineDiagram[0].route_stop.id]: [testX, testY]
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
          <Stop stopId={lineDiagram[0].route_stop.id} />
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
