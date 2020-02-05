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

  it("calls onChange function on search button click", () => {
    expect(spy).not.toHaveBeenCalled();
    wrapper.find(".c-form__submit-btn").simulate("click");
    expect(spy).toHaveBeenLastCalledWith("");
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

  it("calls onChange function on reset button click", () => {
    expect(spy).not.toHaveBeenCalled();
    wrapper
      .find("input#test-search")
      .simulate("change", { target: { value: "foo" } });
    expect(spy).toHaveBeenCalledTimes(1);
    wrapper.setProps({}); // updates useEffect
    expect(spy).toHaveBeenLastCalledWith("foo");
    expect(spy).toHaveBeenCalledTimes(2);
    wrapper.find(".c-form__reset-btn").simulate("click");
    wrapper.setProps({}); // updates useEffect
    expect(spy).toHaveBeenLastCalledWith("");
    expect(spy).toHaveBeenCalledTimes(3);
  });
});
