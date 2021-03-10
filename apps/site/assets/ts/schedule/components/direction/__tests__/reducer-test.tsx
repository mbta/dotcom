import { menuReducer, MenuAction, State } from "../reducer";
import { EnhancedRoutePattern } from "../../__schedule";
import { Shape } from "../../../../__v3api";

const routePatternsForInbound: EnhancedRoutePattern[] = [
  {
    direction_id: 1,
    headsign: "Haymarket",
    id: "111-5-1",
    name: "Woodlawn - Haymarket Station",
    representative_trip_id: "46824427",
    route_id: "111",
    shape_id: "1110177",
    time_desc: null,
    typicality: 1
  },
  {
    direction_id: 1,
    headsign: "Haymarket",
    id: "111-6-1",
    name: "Washington Ave & Revere Beach Pkwy - Haymarket Station",
    representative_trip_id: "46824445",
    route_id: "111",
    shape_id: "1110157",
    time_desc: "Weekdays only",
    typicality: 2
  }
];

const shape: Shape = {
  direction_id: 1,
  id: "1110177",
  name: "Woodlawn - Haymarket Station",
  priority: 3,
  polyline: "polyline",
  stop_ids: []
};

const initialState: State = {
  routePattern: {
    direction_id: 0,
    headsign: "Woodlawn",
    id: "111-5-0",
    name: "Haymarket Station - Woodlawn",
    representative_trip_id: "46824432",
    route_id: "111",
    shape_id: "1110180",
    time_desc: null,
    typicality: 1
  },
  shape: {
    direction_id: 0,
    id: "1110180",
    name: "Haymarket Station - Woodlawn",
    polyline: "polyline",
    priority: 3,
    stop_ids: []
  },
  directionId: 0,
  shapesById: {
    1110177: shape
  },
  routePatternsByDirection: {
    0: [],
    1: routePatternsForInbound
  },
  routePatternMenuOpen: true,
  routePatternMenuAll: true,
  itemFocus: null
};

it("menuReducer handles 'toggleDirection'", () => {
  const action: MenuAction = { type: "toggleDirection" };

  const expected = {
    ...initialState,
    itemFocus: "first",
    shape,
    directionId: 1,
    routePattern: {
      direction_id: 1,
      headsign: "Haymarket",
      id: "111-5-1",
      name: "Woodlawn - Haymarket Station",
      representative_trip_id: "46824427",
      route_id: "111",
      shape_id: "1110177",
      time_desc: null,
      typicality: 1
    }
  };

  expect(menuReducer(initialState, action)).toEqual(expected);
});
