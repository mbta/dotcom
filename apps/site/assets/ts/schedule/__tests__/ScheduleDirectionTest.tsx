import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import { createReactRoot } from "../../app/helpers/testUtils";
import ScheduleDirection from "../components/ScheduleDirection";
import { EnhancedRoute } from "../../__v3api";
import { RoutePatternsByDirection, ShapesById } from "../components/__schedule";

const body = '<div id="body-wrapper"><div id="react-root"></div></div>';

const route = {
  type: 3,
  name: "route 1",
  long_name: "route 1 long name",
  id: "route-1",
  direction_names: {
    0: "Outbound",
    1: "Inbound"
  },
  direction_destinations: {
    0: "Begin",
    1: "End"
  },
  description: "key_bus_route",
  "custom_route?": false,
  header: "",
  alert_count: 0
} as EnhancedRoute;
const directionId = 1;
const routePatternsByDirection = {
  "0": [
    {
      typicality: 1,
      time_desc: null,
      shape_id: "shape-1",
      route_id: "route-1",
      representative_trip_id: "trip-1",
      name: "Pattern 1",
      id: "pattern-1",
      direction_id: 0
    },
    {
      typicality: 1,
      time_desc: null,
      shape_id: "shape-3",
      route_id: "route-1",
      representative_trip_id: "trip-3",
      name: "Pattern 3",
      id: "pattern-3",
      direction_id: 0
    }
  ],
  "1": [
    {
      typicality: 1,
      time_desc: null,
      shape_id: "shape-2",
      route_id: "route-1",
      representative_trip_id: "trip-1",
      name: "Pattern 2",
      id: "pattern-2",
      direction_id: 1
    }
  ]
} as RoutePatternsByDirection;
const shapesById = {
  "shape-1": {
    stop_ids: ["stop"],
    priority: 3,
    polyline: "xyz",
    name: "Shape 1",
    id: "shape-1",
    direction_id: 0
  },
  "shape-2": {
    stop_ids: ["stop"],
    priority: 3,
    polyline: "xyz",
    name: "Shape 2",
    id: "shape-2",
    direction_id: 1
  },
  "shape-3": {
    stop_ids: ["stop"],
    priority: 3,
    polyline: "xyz",
    name: "Shape 3",
    id: "shape-3",
    direction_id: 0
  }
} as ShapesById;

const getComponent = () => (
  <ScheduleDirection
    route={route}
    directionId={directionId}
    routePatternsByDirection={routePatternsByDirection}
    shapesById={shapesById}
  />
);

it("it renders", () => {
  createReactRoot();
  const tree = renderer.create(getComponent()).toJSON();
  expect(tree).toMatchSnapshot();
});

it("can change direction", () => {
  document.body.innerHTML = body;
  const component = getComponent();
  const wrapper = mount(component);
  expect(wrapper.find("#direction-name").text()).toBe("Inbound");
  wrapper.find("button").simulate("click");
  expect(wrapper.find("#direction-name").text()).toBe("Outbound");
});

it("can change route pattern", () => {
  document.body.innerHTML = body;
  const component = getComponent();
  const wrapper = mount(component);
  wrapper.find("button").simulate("click");
  expect(wrapper.find("#active-shape").text()).toBe("Shape 1");
  //console.log(wrapper.find("select").html());
  wrapper.find("select").simulate("change", { target: { value: "pattern-3" } });
  expect(wrapper.find("#active-shape").text()).toBe("Shape 3");
});
