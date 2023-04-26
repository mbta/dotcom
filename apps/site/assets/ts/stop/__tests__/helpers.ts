import { faker } from "@faker-js/faker";
import { uniqueId } from "lodash";
import { Polyline } from "../../leaflet/components/__mapdata";
import { Route, RouteType } from "../../__v3api";
import { RouteWithPolylines } from "../../hooks/useRoute";

export const newLatOrLon = (): number => +faker.random.numeric(2);
const newPosition = (): [number, number] => [newLatOrLon(), newLatOrLon()];
export const newPolyline = (): Polyline => ({
  color: faker.color.rgb({ prefix: "#" }),
  "dotted?": false,
  id: uniqueId(),
  positions: [newPosition(), newPosition(), newPosition()],
  weight: 4
});

export const baseRoute = (name: string, type: RouteType): Route =>
  ({
    id: name,
    direction_destinations: { 0: "Somewhere there", 1: "Over yonder" },
    name: `${name} Route`,
    type
  } as Route);

export const routeWithPolylines = (
  name: string,
  type: RouteType,
  numPolylines: number = 1
): RouteWithPolylines => {
  const route = baseRoute(name, type);
  const polylines = Array.from({ length: numPolylines }, (x, i) =>
    newPolyline()
  );
  return {
    ...route,
    polylines
  };
};
