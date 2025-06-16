import React, { isValidElement } from "react";
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
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import {
  GroupedRoutePatterns,
  RoutePatternWithPolyline
} from "../../models/route-patterns";

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

const defaultStop: Stop = {
  accessibility: [] as AccessibilityType[],
  address: faker.location.streetAddress(),
  bike_storage: [] as BikeStorageType[],
  closed_stop_info: null,
  "has_charlie_card_vendor?": false,
  "has_fare_machine?": false,
  fare_facilities: [] as FareFacilityType[],
  id: "stopId",
  "child?": false,
  latitude: 42.460574,
  longitude: -71.457804,
  municipality: "Boston",
  name: "Stop Name",
  note: null,
  parking_lots: [] as ParkingLot[],
  "station?": false,
  "ferry?": false,
  type: "stop"
};
export const customStop = (args: Partial<Stop>): Stop =>
  Object.assign({}, defaultStop, args);

const customRoutePattern = (
  route_id: string,
  headsign: string,
  index: number
): RoutePatternWithPolyline => {
  const routePatternId = `${route_id}-${faker.helpers.slugify(
    headsign
  )}-${faker.number.int()}`;
  return {
    headsign,
    route_id,
    id: routePatternId,
    name: `${faker.location.city()} - ${headsign}`,
    typicality: faker.number.int({ min: 1, max: 4 }),
    sort_order: index,
    direction_id: faker.number.int({ min: 0, max: 1 }),
    representative_trip_polyline: {
      ...newPolyline(),
      id: `${routePatternId}--shape`
    },
    canonical: route_id === "Red"
  } as RoutePatternWithPolyline;
};
const makeRoutePatternList = (
  route: string,
  headsign: string,
  index: number,
  count: number = 1
): RoutePatternWithPolyline[] =>
  faker.helpers.multiple<RoutePatternWithPolyline>(
    () => customRoutePattern(route, headsign, index),
    { count }
  );

const makeRoutePatternGroup = (route: string, headsign: string[]) => {
  const routePatternsByHeadsigns = Object.fromEntries(
    headsign.map((h, i) => {
      const route_patterns = makeRoutePatternList(
        route,
        h,
        i,
        faker.number.int({ min: 1, max: 4 })
      );
      const direction_id = route_patterns[0].direction_id;
      return [h, { route_patterns, direction_id }];
    })
  );
  return { [route]: routePatternsByHeadsigns };
};

const testLoader = () => {
  const testRoutePatterns = {
    ...makeRoutePatternGroup("Red", ["Braintree", "Ashmont", "Alewife"]),
    ...makeRoutePatternGroup("16", ["Harbor Point"]),
    ...makeRoutePatternGroup("CRRoute", ["South Station", "Kingston"]),
    ...makeRoutePatternGroup("741", ["South Station"])
  } as GroupedRoutePatterns;
  return testRoutePatterns;
};

export const TEST_LOADER_VALUE = testLoader();
// via https://webup.org/blog/how-to-avoid-mocking-in-react-router-v6-tests/
//@ts-ignore
export function renderWithRouter(children, routes = [], loaderData?) {
  const loaderMock = jest
    .fn()
    .mockReturnValue(loaderData ? loaderData : TEST_LOADER_VALUE);
  const options = isValidElement(children)
    ? { element: children, path: "/", loader: loaderMock }
    : children;

  const router = createMemoryRouter([{ ...options }, ...routes], {
    initialEntries: [options.path],
    initialIndex: 1
  });

  return render(<RouterProvider router={router} />);
}
