import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import { createReactRoot } from "../../app/helpers/testUtils";
import ScheduleFinder from "../components/ScheduleFinder";
import { Route } from "../../__v3api";

// the enzyme test was done as one test because there was
// an issue mounting it more than once due to the focus-trap
// dependency that the Modal component depends on

/* eslint-disable @typescript-eslint/camelcase */
const body = '<div id="react-root"></div>';
const route: Route = {
  alert_count: 0,
  description: "",
  direction_destinations: { 0: "Oak Grove", 1: "Forest Hills" },
  direction_names: { 0: "Inbound", 1: "Outbound" },
  header: "",
  id: "Orange",
  long_name: "Orange Line",
  name: "Orange",
  type: 1
};
const stops = [
  {
    name: "SL",
    id: "741",
    is_closed: false,
    zone: "1"
  },
  {
    name: "Abc",
    id: "123",
    is_closed: false,
    zone: null
  },
  {
    name: "Wellington",
    id: "place-welln",
    is_closed: true,
    zone: null
  }
];

it("renders", () => {
  createReactRoot();
  const tree = renderer
    .create(<ScheduleFinder route={route} stops={stops} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("opens modal after displaying error", () => {
  document.body.innerHTML = body;

  const wrapper = mount(<ScheduleFinder route={route} stops={stops} />);

  // there should be no errors
  expect(wrapper.exists(".error-container")).toBeFalsy();

  wrapper.find("input").simulate("click");

  // now there are errors, no values were set
  expect(wrapper.exists(".error-container")).toBeTruthy();

  // the route modal should not be showing
  expect(wrapper.exists(".schedule-finder__modal-header")).toBeFalsy();

  wrapper
    .find("#sf_direction_select")
    .simulate("change", { target: { value: "0" } });

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
    .simulate("change", { target: { value: "0" } });

  wrapper.find("input").simulate("click");

  // now the route modal should appear
  expect(wrapper.exists(".schedule-finder__modal-header")).toBeTruthy();

  // and the errors should be gone
  expect(wrapper.exists(".error-container")).toBeFalsy();

  // for code cov
  wrapper.find("#sf_origin_select").simulate("keyUp", { key: "Enter" });
  wrapper.find("#sf_direction_select").simulate("keyUp", { key: "Enter" });
  wrapper.find("#sf_origin_select").simulate("click");

  // show origin modal
  wrapper.find("#modal-close").simulate("click");
  wrapper
    .find("#sf_origin_select_container")
    .hostNodes()
    .simulate("click");
  expect(wrapper.find(".schedule-finder__origin-list-item").length).toBe(3);

  // click origin modal line item
  wrapper
    .find(".schedule-finder__origin-list-item")
    .at(0)
    .simulate("click");

  // keyup on origin modal line item
  wrapper
    .find("#sf_origin_select_container")
    .hostNodes()
    .simulate("click");

  wrapper
    .find(".schedule-finder__origin-list-item")
    .at(2)
    .simulate("keyUp", { key: "Enter" });

  // prevent opening origin modal when direction not set
  wrapper
    .find("#sf_direction_select")
    .simulate("change", { target: { value: "" } });

  wrapper
    .find("#sf_origin_select_container")
    .hostNodes()
    .simulate("click");

  expect(wrapper.exists(".error-container")).toBeTruthy();
});

it("modal renders route pill for bus lines", () => {
  const subwayWrapper = mount(<ScheduleFinder stops={stops} route={route} />);
  subwayWrapper
    .find("#sf_direction_select")
    .simulate("change", { target: { value: "1" } });

  subwayWrapper
    .find("#sf_origin_select")
    .simulate("change", { target: { value: "place-welln" } });

  subwayWrapper.find("input").simulate("click");

  expect(subwayWrapper.exists(".m-route-pills")).toBeFalsy();

  const busRoute: Route = { ...route, id: "66", name: "66", type: 3 };
  const busWrapper = mount(<ScheduleFinder stops={stops} route={busRoute} />);
  busWrapper
    .find("#sf_direction_select")
    .simulate("change", { target: { value: "0" } });

  busWrapper
    .find("#sf_origin_select")
    .simulate("change", { target: { value: "place-welln" } });

  busWrapper.find("input").simulate("click");

  expect(busWrapper.exists(".m-route-pills")).toBeTruthy();
  expect(busWrapper.exists(".u-bg--bus")).toBeTruthy();
});

it("modal renders route pill for silver line", () => {
  const subwayWrapper = mount(<ScheduleFinder stops={stops} route={route} />);
  subwayWrapper
    .find("#sf_direction_select")
    .simulate("change", { target: { value: "1" } });

  subwayWrapper
    .find("#sf_origin_select")
    .simulate("change", { target: { value: "place-welln" } });

  subwayWrapper.find("input").simulate("click");

  expect(subwayWrapper.exists(".m-route-pills")).toBeFalsy();

  const busRoute: Route = { ...route, id: "741", name: "SL", type: 3 };
  const busWrapper = mount(<ScheduleFinder stops={stops} route={busRoute} />);
  busWrapper
    .find("#sf_direction_select")
    .simulate("change", { target: { value: "0" } });

  busWrapper
    .find("#sf_origin_select")
    .simulate("change", { target: { value: "place-welln" } });

  busWrapper.find("input").simulate("click");

  expect(busWrapper.exists(".m-route-pills")).toBeTruthy();
  expect(busWrapper.exists(".u-bg--silver-line")).toBeTruthy();
});
