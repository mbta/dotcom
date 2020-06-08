import { Route } from "../../__v3api";
import { isABusRoute, isAGreenLineRoute } from "../route";

describe("isABusRoute", () => {
  test("returns whether or not this is a bus route", () => {
    const busRoutue: Route = {
      id: "1",
      type: 3
    } as Route;
    const subwayRoute: Route = {
      id: "Red",
      type: 1
    } as Route;

    expect(isABusRoute(busRoutue)).toBeTruthy();
    expect(isABusRoute(subwayRoute)).toBeFalsy();
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
