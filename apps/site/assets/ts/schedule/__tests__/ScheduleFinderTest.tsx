import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import { createReactRoot } from "../../app/helpers/testUtils";
import ScheduleFinder from "../components/ScheduleFinder";

// the enzyme test was done as one test because there was
// an issue mounting it more than once due to the focus-trap
// dependency that the Modal component depends on

/* eslint-disable @typescript-eslint/camelcase */
const body = '<div id="react-root"></div>';
const directionDestinations = { 0: "Oak Grove", 1: "Forest Hills" };
const directionNames = { 0: "Inbound", 1: "Outbound" };
const stops = [
  { name: "Malden Center", id: "place-mlmnl" },
  { name: "Wellington", id: "place-welln" }
];

it("renders", () => {
  createReactRoot();
  const tree = renderer
    .create(
      <ScheduleFinder
        directionDestinations={directionDestinations}
        directionNames={directionNames}
        stops={stops}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("opens modal after displaying error", () => {
  document.body.innerHTML = body;

  const wrapper = mount(
    <ScheduleFinder
      directionDestinations={directionDestinations}
      directionNames={directionNames}
      stops={stops}
    />
  );

  // there should be no errors
  expect(wrapper.exists(".error-container")).toBeFalsy();

  wrapper.find("input").simulate("click");

  // now there are errors, no values were set
  expect(wrapper.exists(".error-container")).toBeTruthy();

  // the modal should not be showing
  expect(wrapper.exists(".c-modal__content")).toBeFalsy();

  wrapper
    .find("#sf_direction_select")
    .simulate("change", { target: { value: 1 } });

  wrapper.find("input").simulate("click");

  // now there are errors, only one value is set
  expect(wrapper.exists(".error-container")).toBeTruthy();

  wrapper
    .find("#sf_direction_select")
    .simulate("change", { target: { value: "" } });

  wrapper
    .find("#sf_origin_select")
    .simulate("change", { target: { value: "place-welln" } });

  wrapper.find("input").simulate("click");

  // now there are errors, only one value is set
  expect(wrapper.exists(".error-container")).toBeTruthy();

  wrapper
    .find("#sf_direction_select")
    .simulate("change", { target: { value: 1 } });

  wrapper.find("input").simulate("click");

  // now the modal should appear
  expect(wrapper.exists(".c-modal__content")).toBeTruthy();

  // and the errors should be gone
  expect(wrapper.exists(".error-container")).toBeFalsy();

  // for code cov
  wrapper.find("#sf_origin_select").simulate("keyUp", { key: "Enter" });
  wrapper.find("#sf_direction_select").simulate("keyUp", { key: "Enter" });
});
