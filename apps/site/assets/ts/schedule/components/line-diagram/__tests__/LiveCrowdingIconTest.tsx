import React from "react";
import { mount, ReactWrapper } from "enzyme";
import LiveCrowdingIcon from "./../LiveCrowdingIcon";

const tooltipText = (wrapper: ReactWrapper) =>
  wrapper.find("[tooltipText]").prop("tooltipText");

describe.each`
  crowding           | description
  ${"not_crowded"}   | ${"not crowded"}
  ${"some_crowding"} | ${"some crowding"}
  ${"crowded"}       | ${"crowded"}
`("LiveCrowdingIcon with $crowding", ({ crowding, description }) => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<LiveCrowdingIcon crowding={crowding} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renders and matches snapshot", () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("displays correct text", () => {
    const node = wrapper.find(".m-schedule-diagram__prediction-crowding").at(0);
    expect(tooltipText(node)).toContain(description);
  });
});
