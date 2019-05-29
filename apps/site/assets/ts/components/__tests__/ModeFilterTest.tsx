import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import { ModeFilter } from "../ModeFilter";
import { createReactRoot } from "../../app/helpers/testUtils";

describe("render", () => {
  it("renders", () => {
    createReactRoot();
    const tree = renderer
      .create(
        <ModeFilter isModeSelected={() => true} onModeClickAction={() => {}} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("calls clickModeAction when subway filter button is clicked", () => {
    createReactRoot();

    const mockOnModeClickAction = jest.fn();

    const wrapper = mount(
      <ModeFilter
        isModeSelected={() => true}
        onModeClickAction={mockOnModeClickAction}
      />
    );

    wrapper
      .find(".m-tnm-sidebar__filter-btn")
      .first()
      .simulate("click");

    expect(mockOnModeClickAction).toHaveBeenCalledWith("subway");
  });

  it("calls clickModeAction when bus filter button is clicked", () => {
    createReactRoot();

    const mockOnModeClickAction = jest.fn();

    const wrapper = mount(
      <ModeFilter
        isModeSelected={() => true}
        onModeClickAction={mockOnModeClickAction}
      />
    );

    wrapper
      .find(".m-tnm-sidebar__filter-btn")
      .at(1)
      .simulate("click");

    expect(mockOnModeClickAction).toHaveBeenCalledWith("bus");
  });

  it("calls clickModeAction when commuter_rail filter button is clicked", () => {
    createReactRoot();

    const mockOnModeClickAction = jest.fn();

    const wrapper = mount(
      <ModeFilter
        isModeSelected={() => true}
        onModeClickAction={mockOnModeClickAction}
      />
    );

    wrapper
      .find(".m-tnm-sidebar__filter-btn")
      .at(2)
      .simulate("click");

    expect(mockOnModeClickAction).toHaveBeenCalledWith("commuter_rail");
  });
});
