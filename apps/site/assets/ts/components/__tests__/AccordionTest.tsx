import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import Accordion from "../Accordion";
import { createReactRoot } from "../../app/helpers/testUtils";

describe("Accordion component", () => {
  it("renders", () => {
    createReactRoot();
    const tree = renderer
      .create(
        <Accordion
          id="test-accordion"
          title={{
            collapsed: "Open me for a surprise",
            expanded: "Close me, surprise seen"
          }}
        >
          <p>The surprise</p>
        </Accordion>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("shows title in heading and children in content", () => {
    const wrapper = shallow(
      <Accordion
        id="test-accordion"
        title={{
          collapsed: "Open me for a surprise",
          expanded: "Close me, surprise seen"
        }}
      >
        <p>The surprise</p>
      </Accordion>
    );
    const heading = wrapper.find(".c-accordion-ui__heading");
    expect(heading.text()).toContain("Open me for a surprise");
    expect(wrapper.find(".c-accordion-ui__content").exists()).toBeFalsy();
    wrapper.find(".c-accordion-ui__trigger").simulate("click");
    expect(wrapper.find(".c-accordion-ui__content").exists()).toBeTruthy();
    expect(wrapper.find(".c-accordion-ui__content").text()).toContain(
      "The surprise"
    );
  });
});
