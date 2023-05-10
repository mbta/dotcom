import React from "react";
import { render, screen } from "@testing-library/react";
import StopPageDepartures from "../components/StopPageDepartures";
import { Route, RouteType, Stop } from "../../__v3api";
import StopPageOverlay from "../components/StopPageOverlay";
import { shallow } from "enzyme";
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
describe("StopPageOverlay", () => {
  it("opens on click", () => {
    // TODO update test after departure card interaction is setup
    const wrapper = shallow(
      <StopPageOverlay
        stop={stop}
        routes={routeData}
        schedules={scheduleData}
      />
    );
    wrapper.find(".overlay-open").simulate("click");
    expect(wrapper.find(".m-stop-routes-and-map").exists()).toBeTruthy();
  });
});
