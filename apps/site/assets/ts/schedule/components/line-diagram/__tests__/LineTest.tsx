import React from "react";
import * as redux from "react-redux";
import { cloneDeep, last } from "lodash";
import { mount, ReactWrapper } from "enzyme";
import { LineDiagramStop } from "../../__schedule";
import simpleLineDiagram from "./lineDiagramData/simple.json"; // not a full line diagram
import outwardLineDiagram from "./lineDiagramData/outward.json"; // not a full line diagram
import {
  createLineDiagramCoordStore,
  BASE_LINE_WIDTH,
  BRANCH_SPACING,
  BRANCH_LINE_WIDTH
} from "../graphics/graphic-helpers";
import Line from "../graphics/Line";
const lineDiagram = (simpleLineDiagram as unknown) as LineDiagramStop[];
const lineDiagramWithBranching = (outwardLineDiagram as unknown) as LineDiagramStop[];

const [from, to] = lineDiagram.slice(0, 2);
const [fromWithBranching, toWithBranching] = lineDiagramWithBranching.slice(
  4,
  6
);
const [testX, testY] = [7, 17];
const store = createLineDiagramCoordStore([
  ...lineDiagram.slice(0, 2),
  ...lineDiagramWithBranching.slice(4, 6)
]);
// mock the redux state
const mockState = {
  [from.route_stop.id]: [testX, testY],
  [to.route_stop.id]: [testX, testY + 7],
  [fromWithBranching.route_stop.id]: [testX, testY],
  [toWithBranching.route_stop.id]: [testX, testY + 7]
};

jest
  .spyOn(redux, "useSelector")
  .mockImplementation(selector => selector(mockState));

describe("Line component", () => {
  let wrapper: ReactWrapper;
  beforeAll(() => {
    wrapper = mount(
      <redux.Provider store={store}>
        <svg>
          <Line from={from} to={to} />
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

describe("Line component between stops with branches", () => {
  let wrapper: ReactWrapper;
  beforeAll(() => {
    wrapper = mount(
      <redux.Provider store={store}>
        <Line from={fromWithBranching} to={toWithBranching} />
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
    expect(strokeWidth).toEqual(`${BRANCH_LINE_WIDTH}px`);
    expect(x1).toEqual(`${BRANCH_SPACING * 2 + BASE_LINE_WIDTH + 1}px`);
    expect(x2).toEqual(`${BRANCH_SPACING * 2 + BASE_LINE_WIDTH + 1}px`);
    expect(y1).toEqual(`${testY}px`);
    expect(y2).toEqual(`${testY + 7}px`);
  });
});

describe("Line component between stops with disruptions", () => {
  let wrapper: ReactWrapper;
  beforeAll(() => {
    const fromWithDetour = cloneDeep(from);
    last(fromWithDetour.stop_data)!["has_disruption?"] = true;

    wrapper = mount(
      <redux.Provider store={store}>
        <Line from={fromWithDetour} to={to} />
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
    expect(stroke).toContain("url(#shuttle)");
  });
});
