import React from "react";
import { ReactWrapper, mount } from "enzyme";
import SearchBox from "../SearchBox";

describe("SearchBox", () => {
  let wrapper: ReactWrapper;
  let spy: jest.Mock;
  beforeEach(() => {
    spy = jest.fn();
    wrapper = mount(
      <SearchBox
        id="test-search"
        labelText="Search for a thing"
        onChange={spy}
      />
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("calls onChange function on change event", () => {
    wrapper
      .find("input#test-search")
      .simulate("change", { target: { value: "foo" } });
    wrapper.setProps({}); // updates useEffect
    expect(spy).toHaveBeenLastCalledWith("foo");
  });

  it("doesn't show reset button initially", () => {
    expect(wrapper.find(".c-form__reset-btn").exists()).toBeFalsy();
  });

  it("shows reset button after text entered", () => {
    wrapper
      .find("input#test-search")
      .simulate("change", { target: { value: "foo" } });
    expect(wrapper.find(".c-form__reset-btn").exists()).toBeTruthy();
  });

  it("clears the contents of the SearchBox", () => {
    // add some text
    wrapper
      .find("input#test-search")
      .simulate("change", { target: { value: "foo" } });

    // click on button to delete contents
    wrapper
      .find("button")
      .at(0)
      .simulate("click");

    expect(wrapper.find("input#test-search").props().value).toEqual("");
  });
});
