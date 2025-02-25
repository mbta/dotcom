import React from "react";
import { screen, waitFor } from "@testing-library/react";
import StopPageDepartures from "../components/StopPageDepartures";
import { Route } from "../../__v3api";
import { TEST_LOADER_VALUE, baseRoute, renderWithRouter } from "./helpers";
import { cloneDeep } from "lodash";

const routeData: Route[] = [baseRoute("16", 3), baseRoute("Red", 1)];

describe("StopPageDepartures", () => {
  it("renders with no data", async () => {
    renderWithRouter(
      <StopPageDepartures
        routes={[]}
        alerts={[]}
        departureInfos={[]}
        groupedRoutePatterns={TEST_LOADER_VALUE}
      />
    );
    await waitFor(() => {
      expect(screen.getByRole("list")).toBeEmptyDOMElement();
    });
  });

  it("renders with data", async () => {
    renderWithRouter(
      <StopPageDepartures
        routes={routeData}
        alerts={[]}
        departureInfos={[]}
        groupedRoutePatterns={TEST_LOADER_VALUE}
      />
    );
    await waitFor(() => {
      expect(screen.getAllByRole("list")[0]).not.toBeEmptyDOMElement();
      ["All", "Bus", "Subway"].forEach(name => {
        expect(
          screen.getByRole("button", { name: new RegExp(name) })
        ).toBeDefined();
      });
    });
  });

  it("doesn't show the filters if there is 1 mode present", async () => {
    renderWithRouter(
      <StopPageDepartures
        routes={[routeData[0]]}
        alerts={[]}
        departureInfos={[]}
        groupedRoutePatterns={TEST_LOADER_VALUE}
      />
    );
    await waitFor(() => {
      expect(
        screen.queryByRole("button", { name: new RegExp("All") })
      ).toBeNull();
    });
  });

  it("doesn't show headsigns for uncommon subway route patterns with no upcoming service", async () => {
    const subwayRoute = baseRoute("Red", 1);
    const withUncommonRoutePattern = cloneDeep(TEST_LOADER_VALUE);
    // give Ashmont non-canonical route patterns
    withUncommonRoutePattern["Red"][
      "Ashmont"
    ].route_patterns = withUncommonRoutePattern["Red"][
      "Ashmont"
    ].route_patterns.map(rp => ({ ...rp, canonical: false }));
    renderWithRouter(
      <StopPageDepartures
        routes={[subwayRoute]}
        alerts={[]}
        departureInfos={[]}
        groupedRoutePatterns={withUncommonRoutePattern}
      />
    );
    await waitFor(() => {
      expect(screen.queryByText("Braintree")).toBeTruthy();
      expect(screen.queryByText("Alewife")).toBeTruthy();
    });
  });

  it("doesn't show departure card when all headsigns for uncommon subway route patterns have no upcoming service", async () => {
    const subwayRoute = baseRoute("Red", 1);
    const withUncommonRoutePattern = cloneDeep(TEST_LOADER_VALUE);
    ["Braintree", "Alewife", "Ashmont"].forEach(headsign => {
      withUncommonRoutePattern["Red"][
        `${headsign}`
      ].route_patterns = withUncommonRoutePattern["Red"][
        `${headsign}`
      ].route_patterns.map(rp => ({ ...rp, canonical: false }));
    });

    renderWithRouter(
      <StopPageDepartures
        routes={[subwayRoute]}
        alerts={[]}
        departureInfos={[]}
        groupedRoutePatterns={withUncommonRoutePattern}
      />
    );
    await waitFor(() => {
      expect(screen.queryByText("Braintree")).toBeFalsy();
      expect(screen.queryByText("Alewife")).toBeFalsy();
      expect(screen.queryByText("Ashmont")).toBeFalsy();
      expect(screen.queryByText("Red Line")).toBeFalsy();
    });
  });
});
