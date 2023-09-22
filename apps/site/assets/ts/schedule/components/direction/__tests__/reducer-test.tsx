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
    representative_trip_polyline: "qwerty123@777njhgb",
    stop_ids: ["123", "456", "789"],
    route_id: "111",
    shape_id: "1110177",
    shape_priority: 1,
    time_desc: null,
    typicality: 1,
    sort_order: 1
  },
  {
    direction_id: 1,
    headsign: "Haymarket",
    id: "111-6-1",
    name: "Washington Ave & Revere Beach Pkwy - Haymarket Station",
    representative_trip_id: "46824445",
    representative_trip_polyline: "lkjhg987bvcxz88!",
    stop_ids: ["123", "555", "789"],
    route_id: "111",
    shape_id: "1110157",
    shape_priority: 1,
    time_desc: "Weekdays only",
    typicality: 2,
    sort_order: 2
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
    representative_trip_polyline: "asdf444$hhhhmnb",
    stop_ids: ["123", "555", "777"],
    route_id: "111",
    shape_priority: 1,
    shape_id: "1110180",
    time_desc: null,
    typicality: 1,
    sort_order: 3
  },
  directionId: 0,
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
    directionId: 1,
    routePattern: {
      direction_id: 1,
      headsign: "Haymarket",
      id: "111-5-1",
      name: "Woodlawn - Haymarket Station",
      representative_trip_id: "46824427",
      representative_trip_polyline: "qwerty123@777njhgb",
      stop_ids: ["123", "456", "789"],
      route_id: "111",
      shape_id: "1110177",
      shape_priority: 1,
      time_desc: null,
      typicality: 1,
      sort_order: 1
    }
  };

  expect(menuReducer(initialState, action)).toEqual(expected);
});
