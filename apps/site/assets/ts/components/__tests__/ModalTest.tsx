import React, { useState } from "react";
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

interface State {
  modalOpen: boolean;
}

const StatefulModalConsumer = () => {
  const [state, setState] = useState<State>({
    modalOpen: true
  });

  const closeModal = () => {
    setState({ modalOpen: false });
  };

  return (
    <Modal
      ariaLabel={ariaLabel}
      closeModal={closeModal}
      openState={state.modalOpen}
    >
      {content}
    </Modal>
  );
};

test("Modal is hidden when openState is false", () => {
  document.body.innerHTML = body;
  const modal = (
    <Modal ariaLabel={ariaLabel} closeModal={() => {}} openState={false}>
      {content}
    </Modal>
  );
  const wrapper = mount(modal);
  expect(wrapper.exists("#content")).toBeFalsy();
});

test("Modal is visible when openState is true", () => {
  document.body.innerHTML = body;
  const modal = (
    <Modal ariaLabel={ariaLabel} closeModal={() => {}} openState>
      {content}
    </Modal>
  );
  const wrapper = mount(modal);
  expect(wrapper.exists("#content")).toBeTruthy();
});

test("Modal close function is called when clicked", () => {
  document.body.innerHTML = body;
  const spy = jest.fn();
  const modal = (
    <Modal ariaLabel={{ elementId: "modal-header" }} closeModal={spy} openState>
      {() => <h2 id="modal-header">A heading</h2>}
    </Modal>
  );
  const wrapper = mount(modal);
  wrapper.find("#modal-close").simulate("click");
  expect(spy).toHaveBeenCalled();
});

test("Modal closes function called with Esc key", () => {
  document.body.innerHTML = body;
  const spy = jest.fn();
  const modal = (
    <Modal ariaLabel={ariaLabel} closeModal={spy} openState>
      {content}
    </Modal>
  );
  const wrapper = mount(modal);
  wrapper.find("#content").simulate("keyDown", { key: "Escape" });
  expect(spy).toHaveBeenCalled();
});

test("Modal closes function called when click is outside of the modal", () => {
  document.body.innerHTML = body;
  const spy = jest.fn();
  const modal = (
    <Modal ariaLabel={ariaLabel} closeModal={spy} openState>
      {content}
    </Modal>
  );
  const wrapper = mount(modal);
  wrapper.find("#modal-cover").simulate("click");
  expect(spy).toHaveBeenCalled();
});

test("Modal does not add padding when closed", () => {
  document.body.innerHTML = body;
  const modal = (
    <Modal ariaLabel={ariaLabel} closeModal={() => {}} openState={false}>
      {content}
    </Modal>
  );
  mount(modal);
  expect(document.getElementById("body-wrapper")!.style.paddingRight).toBe("");
});

test("Modal adds padding to body-wrapper to account for disabling the scroll bar", () => {
  document.body.innerHTML = body;
  const modal = <StatefulModalConsumer />;
  const wrapper = mount(modal);
  expect(document.getElementById("body-wrapper")!.style.paddingRight).toBe(
    "1024px"
  );
  // Close modal
  wrapper.find("#modal-close").simulate("click");
  expect(document.getElementById("body-wrapper")!.style.paddingRight).toBe(
    "0px"
  );
});

test("it renders", () => {
  document.body.innerHTML = body;
  const modal = (
    <Modal ariaLabel={ariaLabel} closeModal={() => {}} openState>
      {content}
    </Modal>
  );
  const wrapper = mount(modal);
  expect(enzymeToJsonWithoutProps(wrapper)).toMatchSnapshot();
});
