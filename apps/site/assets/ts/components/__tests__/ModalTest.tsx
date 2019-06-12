import React from "react";
import { mount } from "enzyme";
import Modal from "../Modal";
import { enzymeToJsonWithoutProps } from "../../app/helpers/testUtils";

const body = '<div id="body-wrapper"><div id="react-root"></div></div>';

const ariaLabel = { label: "Title for modal content" };
const content = () => (
  <div id="content">
    <p>South Station is accessible. It has the following features:</p>
    <p>This is a test</p>
  </div>
);
const button = <button type="button" id="my-button" />;

test("Modal visibility changes when triggerElement is clicked", () => {
  document.body.innerHTML = body;

  const modal = (
    <Modal triggerElement={button} ariaLabel={ariaLabel}>
      {content}
    </Modal>
  );

  const wrapper = mount(modal);

  expect(wrapper.exists("#content")).toBeFalsy();

  wrapper.find("#my-button").simulate("click");

  expect(wrapper.exists("#content")).toBeTruthy();

  wrapper.find("#my-button").simulate("click");

  expect(wrapper.exists("#content")).toBeFalsy();
});

test("Modal closes when close button is clicked", () => {
  document.body.innerHTML = body;

  const modal = (
    <Modal triggerElement={button} ariaLabel={{ elementId: "modal-header" }}>
      {() => <h2 id="modal-header">A heading</h2>}
    </Modal>
  );

  const wrapper = mount(modal);

  wrapper.find("#my-button").simulate("click");

  expect(wrapper.exists("#modal-header")).toBeTruthy();

  wrapper.find("#modal-close").simulate("click");

  expect(wrapper.exists("#content")).toBeFalsy();
});

test("Modal closes with Esc key", () => {
  document.body.innerHTML = body;

  const modal = (
    <Modal triggerElement={button} ariaLabel={ariaLabel}>
      {content}
    </Modal>
  );

  const wrapper = mount(modal);

  wrapper.find("#my-button").simulate("click");

  expect(wrapper.exists("#content")).toBeTruthy();

  wrapper.find("#content").simulate("keyDown", { key: "Escape" });

  expect(wrapper.exists("#content")).toBeFalsy();
});

test("Modal closes when click is outside of the modal", () => {
  document.body.innerHTML = body;

  const modal = (
    <Modal triggerElement={button} ariaLabel={ariaLabel}>
      {content}
    </Modal>
  );

  const wrapper = mount(modal);

  wrapper.find("#my-button").simulate("click");

  expect(wrapper.exists("#content")).toBeTruthy();

  wrapper.find("#modal-cover").simulate("click");

  expect(wrapper.exists("#content")).toBeFalsy();
});

test("Modal adds padding to body-wrapper to account for disabling the scroll bar", () => {
  document.body.innerHTML = body;

  const modal = (
    <Modal triggerElement={button} ariaLabel={ariaLabel}>
      {content}
    </Modal>
  );

  const wrapper = mount(modal);

  expect(document.getElementById("body-wrapper")!.style.paddingRight).toBe("");

  // Close and open to reflect padding changes from useEffect
  wrapper.find("#my-button").simulate("click");

  wrapper.find("#modal-cover").simulate("click");

  expect(document.getElementById("body-wrapper")!.style.paddingRight).toBe(
    "0px"
  );
});

test("it renders", () => {
  document.body.innerHTML = body;
  const modal = (
    <Modal triggerElement={button} ariaLabel={ariaLabel}>
      {content}
    </Modal>
  );

  const wrapper = mount(modal);

  wrapper.find("#my-button").simulate("click");

  expect(enzymeToJsonWithoutProps(wrapper)).toMatchSnapshot();
});
