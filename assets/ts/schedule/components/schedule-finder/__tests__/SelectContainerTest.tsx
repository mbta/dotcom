import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import * as KeyboardEvents from "../../../../helpers/keyboard-events-react";
import SelectContainer from "../SelectContainer";

jest.mock("../../../../helpers/keyboard-events-react", () => ({
  __esModule: true,
  handleReactEnterKeyPress: jest.fn()
}));

describe("SelectContainer", () => {
  it("renders", () => {
    const tree = renderer.create(
      <SelectContainer>
        <div>Children</div>
      </SelectContainer>
    );

    expect(tree).toMatchSnapshot();
  });

  it("highlights an error", () => {
    const wrapper = shallow(
      <SelectContainer error={true}>
        <div>Children</div>
      </SelectContainer>
    );

    expect(
      wrapper.find(".c-select-custom__container.error").exists
    ).toBeTruthy();
  });

  it("handles clicks", () => {
    const handleClick = jest.fn();

    const wrapper = shallow(
      <SelectContainer handleClick={handleClick}>
        <div>Children</div>
      </SelectContainer>
    );

    wrapper.find(".c-select-custom__container").simulate("click");

    expect(handleClick).toHaveBeenCalled();
  });

  it("accepts the Enter key as the same as a click", () => {
    const mockHandleReactEnterKeyPress: jest.Mock = KeyboardEvents.handleReactEnterKeyPress as jest.Mock;
    mockHandleReactEnterKeyPress.mockImplementation((_, func) => {
      func();
    });
    const handleClick = jest.fn();

    const wrapper = shallow(
      <SelectContainer handleClick={handleClick}>
        <div>Children</div>
      </SelectContainer>
    );

    wrapper
      .find(".c-select-custom__container")
      .simulate("keyUp", { key: "Enter" });

    expect(mockHandleReactEnterKeyPress).toHaveBeenCalled();
    expect(handleClick).toHaveBeenCalled();
  });
});
