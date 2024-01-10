import { Mode, Route, RouteType } from "../../__v3api";
import {
  isABusRoute,
  isACommuterRailRoute,
  isAGreenLineRoute,
  isASilverLineRoute,
  modeForRoute
} from "../route";

describe("isABusRoute", () => {
  test("returns whether or not this is a bus route", () => {
    const busRoute: Route = {
      id: "1",
      type: 3
    } as Route;
    const subwayRoute: Route = {
      id: "Red",
      type: 1
    } as Route;

    expect(isABusRoute(busRoute)).toBeTruthy();
    expect(isABusRoute(subwayRoute)).toBeFalsy();
  });
});

describe("isACommuterRailRoute", () => {
  test("returns whether or not this is a commuter rail route", () => {
    const crRoutue: Route = {
      id: "CR-Haverhill",
      type: 2
    } as Route;
    const subwayRoute: Route = {
      id: "Red",
      type: 1
    } as Route;

    expect(isACommuterRailRoute(crRoutue)).toBeTruthy();
    expect(isACommuterRailRoute(subwayRoute)).toBeFalsy();
  });

  test("accepts a route type directly", () => {
    const crRouteType: RouteType = 2;
    const subwayRouteType: RouteType = 1;

    expect(isACommuterRailRoute(crRouteType)).toBeTruthy();
    expect(isACommuterRailRoute(subwayRouteType)).toBeFalsy();
  });
});

describe("isAGreenLineRoute", () => {
  test("returns whether or not this is a Green Line route", () => {
    const greenLineRoute: Route = {
      id: "Green-E"
    } as Route;
    const redLineRoute: Route = {
      id: "Red"
    } as Route;

    expect(isAGreenLineRoute(greenLineRoute)).toBeTruthy();
    expect(isAGreenLineRoute(redLineRoute)).toBeFalsy();
  });
});

describe("isASilverLineRoute", () => {
  it("identifies silver line routes by ID", () => {
    ["741", "742", "743", "746", "749", "751"].forEach(id => {
      expect(isASilverLineRoute(id)).toEqual(true);
    });
  });

  it("returns false if route is not silver line", () => {
    expect(isASilverLineRoute("1")).toEqual(false);
  });

  it("handles routes as well as route IDs", () => {
    const route: Route = {
      id: "1"
    } as Route;
    expect(isASilverLineRoute(route)).toEqual(false);
  });
});

describe("modeForRoute", () => {
  it("returns a name of type Mode", () => {
    const route = {
      type: 1
    } as Route;
    const mode = modeForRoute(route);
    expect(mode).toEqual("subway");
    expect(mode).toStrictEqual("subway" as Mode);
  });
});
