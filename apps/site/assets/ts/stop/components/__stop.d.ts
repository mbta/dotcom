import { Direction, DirectionId, EnhancedRoute, Stop } from "../../__v3api";
import { MapData } from "../../leaflet/components/__mapdata";

export interface TypedRoutes {
  group_name: string;
  routes: RouteWithDirections[];
}

export interface StopMapData {
  map_data: MapData;
  map_srcset: string;
  map_url: string;
}

export interface RouteWithDirection {
  direction_id: DirectionId | null;
  route: EnhancedRoute;
}

export interface StopPageData {
  stop: Stop;
  routes: TypedRoutes[];
  routes_with_direction?: RouteWithDirection[];
}

export interface RouteWithDirections {
  route: EnhancedRoute;
  directions: Direction[];
}
