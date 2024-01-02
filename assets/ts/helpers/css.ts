import {
  isABusRoute,
  isACommuterRailRoute,
  isAGreenLineRoute,
  isASilverLineRoute
} from "../models/route";
import { Route } from "../__v3api";

export const routeToCSSClass = (route: string): string =>
  route.toLowerCase().replace(/[ _]/g, "-");

export const busClass = (route: Route): string =>
  isABusRoute(route) && !isASilverLineRoute(route) ? "bus-route-sign" : "";

export const routeToModeName = (route: Route): string => {
  if (isACommuterRailRoute(route)) return "commuter-rail";
  if (route.type === 4) return "ferry";
  if (route.id === "Red" || route.id === "Mattapan") return "red-line";
  if (route.id === "Orange") return "orange-line";
  if (route.id === "Blue") return "blue-line";
  if (isAGreenLineRoute(route)) return "green-line";
  if (isASilverLineRoute(route)) return "silver-line";
  if (isABusRoute(route)) return "bus";
  return "unknown";
};

export const routeBgClass = (route: Route): string =>
  `u-bg--${routeToModeName(route)}`;
