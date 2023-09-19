import React from "react";
import { render, screen } from "@testing-library/react";
import StopPageDepartures from "../components/StopPageDepartures";
import { Route, RouteType } from "../../__v3api";

const baseRoute = (name: string, type: RouteType): Route =>
  ({
    id: name,
    direction_destinations: { 0: "Somewhere there", 1: "Over yonder" },
    name: `${name} Route`,
    type
  } as Route);
const routeData: Route[] = [baseRoute("4B", 3), baseRoute("Magenta", 1)];

describe("StopPageDepartures", () => {
  it("renders with no data", () => {
    const { asFragment } = render(
      <StopPageDepartures
        routes={[]}
        stopName=""
        alerts={[]}
        departureInfos={[]}
      />
    );
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByRole("list")).toBeEmptyDOMElement();
  });

  it("renders with data", () => {
    const { asFragment } = render(
      <StopPageDepartures
        routes={routeData}
        stopName=""
        alerts={[]}
        departureInfos={[]}
      />
    );
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getAllByRole("list")[0]).not.toBeEmptyDOMElement();
    ["All", "Bus", "Subway"].forEach(name => {
      expect(
        screen.getByRole("button", { name: new RegExp(name) })
      ).toBeDefined();
    });
  });

  it("doesn't show the filters if there is 1 mode present", () => {
    render(
      <StopPageDepartures
        routes={[routeData[0]]}
        stopName=""
        alerts={[]}
        departureInfos={[]}
      />
    );
    expect(
      screen.queryByRole("button", { name: new RegExp("All") })
    ).toBeNull();
  });
});
