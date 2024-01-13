import { isBusRouteStop, routesWithDirectionsAreAllBusStops } from "../routes";

test("isBusRouteStop returns false when no route", () => {
  expect(isBusRouteStop({} as any)).toBe(false);
});

describe("routesWithDirectionsAreAllBusStops", () => {
  test("empty list returns false", () => {
    expect(routesWithDirectionsAreAllBusStops([])).toBe(false);
  });

  test("all routes must be bus", () => {
    expect(
      routesWithDirectionsAreAllBusStops([
        { route: { type: 3 } },
        { route: { type: 3 } }
      ] as any[])
    ).toBe(true);

    expect(
      routesWithDirectionsAreAllBusStops([
        { route: { type: 3 } },
        { route: { type: 0 } }
      ] as any[])
    ).toBe(false);
  });
});
