import { faker } from "@faker-js/faker";
import { uniqueId } from "lodash";
import { Polyline } from "../../leaflet/components/__mapdata";
import { Route, RouteType } from "../../__v3api";

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
