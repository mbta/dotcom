import React from "react";
import { mount, ReactWrapper } from "enzyme";
import DirectionButtons from "../components/DirectionButtons";

const onClick = jest.fn();
const places = { 0: "Alewife", 1: "Ashmont / Braintree" };
let wrapper: ReactWrapper;
beforeEach(() => {
  wrapper = mount(<DirectionButtons places={places} onClick={onClick} />);
});

afterEach(() => {
  wrapper!.unmount();
});

it.each`
  index | direction | name
  ${0}  | ${null}   | ${"All Directions"}
  ${1}  | ${0}      | ${places["0"]}
  ${2}  | ${1}      | ${places["1"]}
`(
  "the directions button for direction $direction has name $name",
  ({ index, name }) => {
    expect(
      wrapper
        .find("button")
        .at(index)
        .text()
    ).toEqual(name);
  }
);

it.each`
  index | direction | name
  ${0}  | ${null}   | ${"All Directions"}
  ${1}  | ${0}      | ${places["0"]}
  ${2}  | ${1}      | ${places["1"]}
`(
  "the $name button calls onClick with $direction direction",
  ({ index, direction }) => {
    const button = wrapper.find("button").at(index);
    button.simulate("click");
    wrapper.setProps({}); // updates the onClick mock
    expect(onClick).toHaveBeenLastCalledWith(direction);
  }
);
