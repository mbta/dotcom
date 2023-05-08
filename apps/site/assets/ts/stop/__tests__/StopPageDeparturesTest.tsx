import React from "react";
import { render, screen } from "@testing-library/react";
import StopPageDepartures from "../components/StopPageDepartures";
import { Route, RouteType, Stop } from "../../__v3api";
import { ScheduleWithTimestamp } from "../../models/schedules";

const baseRoute = (name: string, type: RouteType): Route =>
  ({
    id: name,
    direction_destinations: { 0: "Somewhere there", 1: "Over yonder" },
    name: `${name} Route`,
    type
  } as Route);
const stop = {} as Stop;
const routeData: Route[] = [baseRoute("4B", 3), baseRoute("Magenta", 1)];
const scheduleData = [] as ScheduleWithTimestamp[];

describe("StopPageDepartures", () => {
  it("renders with no data", () => {
    const { asFragment } = render(
      <StopPageDepartures routes={[]} stop={stop} schedules={[]} />
    );
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByRole("list")).toBeEmptyDOMElement();
  });

  it("renders with data", () => {
    const { asFragment } = render(
      <StopPageDepartures
        routes={routeData}
        stop={stop}
        schedules={scheduleData}
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
});
