import {
  Direction,
  DirectionId,
  EnhancedRoute,
  Stop,
  Alert
} from "../../__v3api";
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

export interface SuggestedTransfer {
  stop: Stop;
  distance: number;
  routes_with_direction: RouteWithDirection[];
}

export interface StopPageData {
  stop: Stop;
  street_view_url: string | null;
  routes: TypedRoutes[];
  routes_with_direction?: RouteWithDirection[];
  tabs: Tab[];
  zone_number: string;
  alerts: Alert[];
  suggested_transfers: SuggestedTransfer[];
  retail_locations: RetailLocationWithDistance[];
  tab: string;
  alerts_tab: AlertsTab;
  routes_and_alerts: { [key: string]: Alert[] };
}

interface AlertData {
  alerts: Alert[];
  empty_message: string;
}

export interface AlertsTab {
  [key: string]: AlertData | string;
  upcoming: AlertData;
  current: AlertData;
  all: AlertData;
  initial_selected: string;
}

export interface Tab {
  badge?: TabBadge;
  class: string;
  href: string;
  id: string;
  name: string;
  selected: string;
}

export interface TabBadge {
  content: string;
  aria_label: string;
  class?: string;
}

export interface RetailLocation {
  address: string;
  latitude: number;
  longitude: number;
  name: string;
  payment: string[];
  phone: string;
}

export interface RetailLocationWithDistance {
  distance: string;
  location: RetailLocation;
}

export interface RouteWithDirections {
  route: EnhancedRoute;
  directions: Direction[];
}
