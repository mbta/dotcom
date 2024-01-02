import React from "react";
import { mount } from "enzyme";
import MatchHighlight from "../MatchHighlight";

describe("MatchHighlight", () => {
  it("renders without a match", () => {
    const wrapper = mount(
      <MatchHighlight
        text="As part of our $8 billion, 5-year capital investment plan, we're renovating stations, modernizing fare collection systems, upgrading services for our buses, subways, and ferries, and improving the accessibility of the entire system."
        matchQuery="zillion"
      />
    );
    wrapper.setProps({}); // actually updates the wrapper post-useEffect
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.find(".u-highlight").exists()).toBeFalsy();
  });

  it("renders with a match", () => {
    const wrapper = mount(
      <MatchHighlight
        text="As part of our $8 billion, 5-year capital investment plan, we're renovating stations, modernizing fare collection systems, upgrading services for our buses, subways, and ferries, and improving the accessibility of the entire system."
        matchQuery="capital"
      />
    );
    wrapper.setProps({}); // actually updates the wrapper post-useEffect
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.find(".u-highlight").exists()).toBeTruthy();
  });

  it("highlights only the first match if there are multiple matches", () => {
    const wrapper = mount(
      <MatchHighlight
        text="As part of our $8 billion, 5-year capital investment plan, we're renovating stations, modernizing fare collection systems, upgrading services for our buses, subways, and ferries, and improving the accessibility of the entire system."
        matchQuery="and"
      />
    );
    wrapper.setProps({}); // actually updates the wrapper post-useEffect
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.find(".u-highlight")).toHaveLength(1);
  });

  it("highlights a query", () => {
    const wrapper = mount(
      <MatchHighlight
        text="As part of our $8 billion, 5-year capital investment plan, we're renovating stations, modernizing fare collection systems, upgrading services for our buses, subways, and ferries, and improving the accessibility of the entire system."
        matchQuery="billion"
      />
    );
    wrapper.setProps({}); // actually updates the wrapper post-useEffect
    expect(wrapper.find(".u-highlight").text()).toEqual("billion");
  });
});
