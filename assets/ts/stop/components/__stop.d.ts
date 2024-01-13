import { Direction, DirectionId, EnhancedRoute } from "../../__v3api";

export interface TypedRoutes {
  group_name: string;
  routes: RouteWithDirections[];
}

export interface RouteWithDirection {
  direction_id: DirectionId | null;
  route: EnhancedRoute;
}

export interface RouteWithDirections {
  route: EnhancedRoute;
  directions: Direction[];
}
