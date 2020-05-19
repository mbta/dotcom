import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import Accordion from "../Accordion";
import { createReactRoot } from "../../app/helpers/testUtils";

describe("Accordion component", () => {
  it("renders", () => {
    createReactRoot();
    const tree = renderer.create(
      <Accordion id="test-accordion" title="Open me for a surprise">
        <p>The surprise</p>
      </Accordion>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("shows title in heading and children in content", () => {
    const wrapper = shallow(
      <Accordion id="test-accordion" title="Open me for a surprise">
        <p>The surprise</p>
      </Accordion>
    );
    const heading = wrapper.find(".c-accordion-ui__heading");
    const content = wrapper.find(".c-accordion-ui__content");
    expect(heading.text()).toContain("Open me for a surprise")
    expect(content.text()).toContain("The surprise")
  });
});