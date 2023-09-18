import { faker } from "@faker-js/faker";
import { uniqueId } from "lodash";
import { Polyline } from "../../leaflet/components/__mapdata";
import {
  AccessibilityType,
  BikeStorageType,
  FareFacilityType,
  ParkingLot,
  Route,
  RouteType,
  Stop
} from "../../__v3api";
import { RouteWithPolylines } from "../../hooks/useRoute";

export const newLatOrLon = (): number => +faker.string.numeric(2);
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

const defaultStop: Stop = {
  accessibility: [] as AccessibilityType[],
  address: faker.location.streetAddress(),
  bike_storage: [] as BikeStorageType[],
  closed_stop_info: null,
  "has_charlie_card_vendor?": false,
  "has_fare_machine?": false,
  fare_facilities: [] as FareFacilityType[],
  id: "stopId",
  "is_child?": false,
  latitude: 42.460574,
  longitude: -71.457804,
  municipality: "Boston",
  name: "Stop Name",
  note: null,
  parking_lots: [] as ParkingLot[],
  "station?": false,
  type: "stop"
};
export const customStop = (args: Partial<Stop>): Stop =>
  Object.assign({}, defaultStop, args);
