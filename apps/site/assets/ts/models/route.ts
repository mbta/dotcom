import { Route } from "../__v3api";

export const isABusRoute = ({ type }: Route): boolean => type === 3;

export const isACommuterRailRoute = ({ type }: Route): boolean => type === 2;

export const isAGreenLineRoute = ({ id }: Route): boolean =>
  id.startsWith("Green");

export const isASilverLineRoute = (routeOrRouteId: Route | string): boolean => {
  const id =
    typeof routeOrRouteId === "string" ? routeOrRouteId : routeOrRouteId.id;
  return ["741", "742", "743", "746", "749", "751"].includes(id);
};
