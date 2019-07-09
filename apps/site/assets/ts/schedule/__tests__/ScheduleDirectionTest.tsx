import React from "react";
import renderer from "react-test-renderer";
import { createReactRoot } from "../../app/helpers/testUtils";
import ScheduleDirection from "../components/ScheduleDirection";
import { EnhancedRoute } from "../../__v3api";
import { RoutePatternsByDirection, ShapesById } from "../components/__schedule";

const route = {
  type: 3,
  name: "SL2",
  long_name: "Design Center - South Station",
  id: "742",
  direction_names: {
    0: "Outbound",
    1: "Inbound"
  },
  direction_destinations: {
    0: "Design Center",
    1: "South Station"
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
      shape_id: "7420039",
      route_id: "742",
      representative_trip_id: "40606000",
      name: "Drydock",
      id: "742-1-0",
      direction_id: 0
    }
  ],
  "1": [
    {
      typicality: 1,
      time_desc: null,
      shape_id: "7420037",
      route_id: "742",
      representative_trip_id: "40606147",
      name: "South Station",
      id: "742-_-1",
      direction_id: 1
    }
  ]
} as RoutePatternsByDirection;
const shapesById = {
  "7420037": {
    stop_ids: ["31255"],
    priority: 3,
    polyline: "xyz",
    name: "South Station",
    id: "7420037",
    direction_id: 1
  }
} as ShapesById;

it("it renders", () => {
  createReactRoot();
  const tree = renderer
    .create(
      <ScheduleDirection
        route={route}
        directionId={directionId}
        routePatternsByDirection={routePatternsByDirection}
        shapesById={shapesById}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
