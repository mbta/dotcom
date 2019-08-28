import React from "react";
import FeaturedProjectsTitle from "../components/FeaturedProjectsTitle";
import { mount } from "enzyme";

it("renders a blank div if no banner present", () => {
  const wrapper = mount(
    <FeaturedProjectsTitle banner={null} />
  );
  expect(wrapper.html()).toEqual("<div></div>");
});
