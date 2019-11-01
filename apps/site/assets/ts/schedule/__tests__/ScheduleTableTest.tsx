import React from "react";
import { mount } from "enzyme";
import ScheduleTable from "../components/schedule-finder/ScheduleTable";
import { busSchedule742, crSchedule } from "./ScheduleFinderTest";
import { EnhancedRoutePattern } from "../components/__schedule";
import {
  createReactRoot,
  enzymeToJsonWithoutProps
} from "../../app/helpers/testUtils";

const busRoutePatterns = [
  {
    typicality: 1,
    time_desc: null,
    shape_id: "7420039",
    route_id: "742",
    representative_trip_id: "40606000",
    name: "Drydock",
    headsign: "Drydock",
    id: "742-1-0",
    direction_id: 0
  },
  {
    typicality: 2,
    time_desc: null,
    shape_id: "7420016",
    route_id: "742",
    representative_trip_id: "40606124",
    name: "Drydock",
    headsign: "Drydock",
    id: "742-_-0",
    direction_id: 0
  }
] as EnhancedRoutePattern[];

const crRoutePatterns = [
  {
    typicality: 1,
    time_desc: null,
    shape_id: "9870002",
    route_id: "CR-Fairmount",
    representative_trip_id: "CR-Weekday-Fall-19-769",
    name: "South Station - Readville via Fairmount",
    headsign: "South Station",
    id: "CR-Fairmount-0-0",
    direction_id: 0
  }
] as EnhancedRoutePattern[];

describe("ScheduleTable", () => {
  it("it renders", () => {
    createReactRoot();
    const wrapper = mount(
      <ScheduleTable
        schedule={busSchedule742}
        routePatterns={busRoutePatterns}
      />
    );
    wrapper
      .find(".schedule-table__row")
      .first()
      .simulate("click");
    expect(enzymeToJsonWithoutProps(wrapper)).toMatchSnapshot();
  });

  it("it renders with school trips", () => {
    createReactRoot();
    const wrapper = mount(
      <ScheduleTable
        schedule={busSchedule742}
        routePatterns={busRoutePatterns.map(routePattern => ({
          ...routePattern,
          time_desc: "School Trip"
        }))}
      />
    );
    expect(enzymeToJsonWithoutProps(wrapper)).toMatchSnapshot();
  });

  it("it renders an empty message", () => {
    createReactRoot();
    const wrapper = mount(
      <ScheduleTable
        schedule={{ by_trip: {}, trip_order: [] }}
        routePatterns={busRoutePatterns}
      />
    );
    expect(enzymeToJsonWithoutProps(wrapper)).toMatchSnapshot();
  });

  it("it renders CR schedules", () => {
    createReactRoot();
    const wrapper = mount(
      <ScheduleTable schedule={crSchedule} routePatterns={crRoutePatterns} />
    );
    wrapper
      .find(".schedule-table__row")
      .first()
      .simulate("click");
    expect(enzymeToJsonWithoutProps(wrapper)).toMatchSnapshot();
  });

  it("it renders CR schedules with school trips", () => {
    createReactRoot();
    const wrapper = mount(
      <ScheduleTable
        schedule={crSchedule}
        routePatterns={crRoutePatterns.map(routePattern => ({
          ...routePattern,
          time_desc: "School Trip"
        }))}
      />
    );
    expect(enzymeToJsonWithoutProps(wrapper)).toMatchSnapshot();
  });
});
