import React from "react";
import { mount } from "enzyme";
import renderer from "react-test-renderer";
import ExpandableBlock from "../ExpandableBlock";
import accessibleIcon from "../../../static/images/icon-accessible-default.svg";

const body = '<div id="react-root"></div>';

test("render expandable block expanded by default", () => {
  document.body.innerHTML = body;

  const expandableComponent = (
    <ExpandableBlock
      initiallyExpanded
      id="accessibility"
      header={{
        text: "Accessibility",
        iconSvgText: accessibleIcon
      }}
    >
      <div>
        <p>South Station is accessible. It has the following features:</p>
        <p>This is a test</p>
      </div>
    </ExpandableBlock>
  );

  const tree = renderer.create(expandableComponent).toJSON();
  expect(tree).toMatchSnapshot();
});

test("handle click to expand and enter to collapse", () => {
  document.body.innerHTML = body;

  const id = "#header-accessibility";

  const wrapper = mount(
    <ExpandableBlock
      initiallyExpanded={false}
      id="accessibility"
      header={{
        text: "Accessibility",
        iconSvgText: accessibleIcon
      }}
    >
      <div>
        <p>South Station is accessible. It has the following features:</p>
        <p>This is a test</p>
      </div>
    </ExpandableBlock>
  );

  expect(wrapper.find(id).prop("aria-expanded")).toEqual(false);

  wrapper.find(id).simulate("click");

  expect(wrapper.find(id).prop("aria-expanded")).toEqual(true);

  wrapper.find(id).simulate("keypress", { key: "Enter" });

  expect(wrapper.find(id).prop("aria-expanded")).toEqual(false);
});

test("calls notifyExpanded when expanded state changes", () => {
  document.body.innerHTML = body;

  const spy = jest.fn();
  const id = "#header-accessibility";

  const wrapper = mount(
    <ExpandableBlock
      notifyExpanded={spy}
      initiallyExpanded={false}
      id="accessibility"
      header={{ text: "Accessibility", iconSvgText: accessibleIcon }}
    >
      <p>This is a test</p>
    </ExpandableBlock>
  );

  wrapper.find(id).simulate("click");
  expect(spy).toHaveBeenCalledWith(true);

  wrapper.find(id).simulate("click");
  expect(spy).toHaveBeenCalledWith(false);
});

test("dispatches click when dispatch is provided", () => {
  document.body.innerHTML = body;
  const spy = jest.fn();
  const wrapper = mount(
    <ExpandableBlock
      dispatch={spy}
      initiallyExpanded={false}
      initiallyFocused={false}
      id="test"
      header={{
        text: "Test",
        iconSvgText: null
      }}
    >
      <div>Hello!</div>
    </ExpandableBlock>
  );

  const id = "#header-test";
  expect(wrapper.find(id).prop("aria-expanded")).toEqual(false);
  wrapper.find(id).simulate("click");
  expect(spy).toHaveBeenCalledWith({
    type: "CLICK_EXPANDABLE_BLOCK",
    payload: {
      id: "test",
      expanded: false,
      focused: false
    }
  });
  expect(wrapper.find(id).prop("aria-expanded")).toEqual(false);
});
