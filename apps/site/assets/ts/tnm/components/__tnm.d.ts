import { Route, Mode, StopWithDirections } from "../../__v3api";

export interface StopWithRoutes {
  stop: StopWithDirections;
  routes: RouteGroup[];
  distance: string;
}

export interface RouteGroup {
  group_name: Mode;
  routes: Route[];
}
