import React from "react";
import { mount, ReactWrapper } from "enzyme";
import CrowdingPill from "../CrowdingPill";

describe("CrowdingPill", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<CrowdingPill crowding="not_crowded" />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renders and matches snapshot", () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("shows icon and text", () => {
    expect(wrapper.exists(".c-icon__crowding--not_crowded")).toBeTruthy();
    expect(
      wrapper.find("div").containsMatchingElement(<span>Not crowded</span>)
    ).toBeTruthy();
  });

  it("returns null if crowding does not have a value", () => {
    wrapper = mount(<CrowdingPill crowding={null} />);

    expect(wrapper.html()).toEqual(null);
  });
});
