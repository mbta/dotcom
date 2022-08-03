import React from "react";
import * as redux from "react-redux";
import { mount, ReactWrapper } from "enzyme";
import { LineDiagramStop } from "../../__schedule";
import simpleLineDiagram from "./lineDiagramData/simple.json"; // not a full line diagram
import outwardLineDiagram from "./lineDiagramData/outward.json"; // not a full line diagram
import bidiLineDiagram_ from "./lineDiagramData/northStationBidiTest.json";
import { createLineDiagramCoordStore } from "../graphics/graphic-helpers";
import Merges from "../graphics/Merge";
const lineDiagram = (simpleLineDiagram as unknown) as LineDiagramStop[];
const lineDiagramWithBranching = (outwardLineDiagram as unknown) as LineDiagramStop[];
const bidiLineDiagram = bidiLineDiagram_ as LineDiagramStop[];

const store = createLineDiagramCoordStore(lineDiagramWithBranching);
// mock the redux state so that snapshot has positioned stops
const mockState = [...lineDiagram, ...lineDiagramWithBranching].reduce(
  (acc, stop, index) => ({
    ...acc,
    [stop.route_stop.id]: [10, index * 20 + 30]
  }),
  {}
);

jest
  .spyOn(redux, "useSelector")
  .mockImplementation(selector => selector(mockState));

describe("Merge component", () => {
  let wrapper: ReactWrapper;
  beforeAll(() => {
    wrapper = mount(
      <redux.Provider store={store}>
        <svg>
          <Merges lineDiagram={lineDiagramWithBranching} />
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
    const wrapperNoBranches = mount(
      <redux.Provider store={store}>
        <svg>
          <Merges lineDiagram={lineDiagram} />
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

  it("handles bidirectional branching", () => {
    const withBidi = mount(<Merges lineDiagram={bidiLineDiagram} />);
    expect(
      withBidi.findWhere(el => el.key() == "test station c-test station b-line")
    ).toBeTruthy();
    expect(
      withBidi.findWhere(el => el.key() == "place-coecl-place-hymnl-line")
    ).toBeTruthy();
  });
});
