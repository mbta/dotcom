import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import { stops } from "./diversionData.json";
import StopDropdown from "../components/StopDropdown";
import { Stop } from "../components/__shuttles";

it("the stop dropdown renders", () => {
  const onSelect = jest.fn();
  const tree = renderer
    .create(<StopDropdown stops={stops as Stop[]} onSelect={onSelect} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("the stop dropdown by default is set to the first stop", () => {
  const onSelect = jest.fn();
  const wrapper = mount(
    <StopDropdown stops={stops as Stop[]} onSelect={onSelect} />
  );

  const firstStop = stops[0];
  expect(wrapper.find("select").prop("value")).toEqual(firstStop.id);

  wrapper.setProps({}); // updates the onSelect mock
  expect(onSelect).toHaveBeenCalledWith(firstStop);
});

it("the stop dropdown calls onSelect() when the dropdown value changes", () => {
  const onSelect = jest.fn();
  const wrapper = mount(
    <StopDropdown stops={stops as Stop[]} onSelect={onSelect} />
  );
  const stopId = stops[7].id; // just a "random" stop

  wrapper.find("select").simulate("change", { target: { value: stopId } });
  expect(wrapper.find("select").prop("value")).toEqual(stopId);

  wrapper.setProps({}); // updates the onSelect mock
  expect(onSelect).toHaveBeenLastCalledWith(stops[7]);
});
