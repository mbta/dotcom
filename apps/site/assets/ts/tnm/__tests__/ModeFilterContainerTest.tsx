import React from "react";
import { mount } from "enzyme";
import { createReactRoot } from "../../app/helpers/testUtils";
import ModeFilterContainer from "../components/ModeFilterContainer";

it("clicking a mode button dispatches the correct action", () => {
  createReactRoot();

  const mockDispatch = jest.fn();

  const wrapper = mount(
    <ModeFilterContainer selectedModes={[]} dispatch={mockDispatch} />
  );

  wrapper
    .find("button")
    .at(0)
    .simulate("click");

  expect(mockDispatch).toBeCalledWith({
    payload: {
      modes: ["subway"]
    },
    type: "CLICK_MODE_FILTER"
  });
});

it("clicking a mode button dispatches the correct data when there are presets", () => {
  createReactRoot();

  const mockDispatch = jest.fn();

  const wrapper = mount(
    <ModeFilterContainer selectedModes={["subway"]} dispatch={mockDispatch} />
  );

  wrapper
    .find("button")
    .at(0)
    .simulate("click");

  expect(mockDispatch).toBeCalledWith({
    payload: {
      modes: []
    },
    type: "CLICK_MODE_FILTER"
  });
});
