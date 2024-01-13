import React from "react";
import { mount, ReactWrapper } from "enzyme";
import StopCard from "../components/StopCard";
import { EnhancedRoute, DirectionId } from "../../__v3api";
import stopData from "./stopData.json";
import { TypedRoutes, RouteWithDirection } from "../components/__stop";

const { stop, routes } = JSON.parse(JSON.stringify(stopData));
// mimic the transformation done for the StopMapContainerProp
const typedRoutes = routes.reduce(
  (accumulator: EnhancedRoute[], groupedRoutes: TypedRoutes): EnhancedRoute[] =>
    accumulator.concat(
      groupedRoutes.routes.map(typedRoute => typedRoute.route)
    ),
  []
);

const routesWithDirection: RouteWithDirection[] = routes.reduce(
  (
    accumulator: RouteWithDirection[],
    groupedRoutes: TypedRoutes
  ): RouteWithDirection[] =>
    accumulator.concat(
      groupedRoutes.routes.map(typedRoute => ({
        route: typedRoute.route,
        direction_id: 0 as DirectionId
      }))
    ),
  []
);

describe("StopCard", () => {
  let tree: ReactWrapper;
  let treeWithDirection: ReactWrapper;
  beforeAll(() => {
    tree = mount(<StopCard stop={stop} routes={typedRoutes} />);
    treeWithDirection = mount(
      <StopCard stop={stop} routesWithDirection={routesWithDirection} />
    );
  });

  it("renders with routes", () => {
    expect(tree.debug()).toMatchSnapshot();
  });

  it("renders with routes with directions", () => {
    expect(treeWithDirection.debug()).toMatchSnapshot();
  });

  describe("for routes without direction", () => {
    it("does not display direction-specific headsigns", () => {
      const routeLinkNames = tree
        .find(".c-stop-card__route-link")
        .map(link => link.text());
      routeLinkNames.forEach((name, i) => {
        expect(name).toEqual(typedRoutes[i].long_name);
      });
    });
  });

  describe("for routes with direction", () => {
    let routeLinkNamesForDirection: string[];

    beforeEach(() => {
      routeLinkNamesForDirection = treeWithDirection
        .find(".c-stop-card__route-link")
        .map(link => link.text());
    });

    it("displays bus route headsign for direction", () => {
      routeLinkNamesForDirection.forEach((name, i) => {
        if ([1, 2, 3].includes(i)) {
          // these happen to be our test bus routes
          expect(name).toEqual(
            routesWithDirection[i].route.direction_destinations[0]
          );
        }
      });
    });

    it("displays CR and subway headsigns for both directions", () => {
      routeLinkNamesForDirection.forEach((name, i) => {
        if (![1, 2, 3].includes(i)) {
          expect(name).toEqual(routesWithDirection[i].route.long_name);
        }
      });
    });
  });
});
