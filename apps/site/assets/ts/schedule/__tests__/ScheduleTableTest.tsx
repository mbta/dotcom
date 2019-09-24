import React from "react";
import { mount } from "enzyme";
import serviceData from "./serviceData.json";
import crServiceData from "./crServiceData.json";
import ScheduleTable from "../components/schedule-finder/ScheduleTable";
import { ServiceScheduleInfo } from "../components/__schedule.js";
import { EnhancedRoutePattern } from "../components/__schedule";
import {
  createReactRoot,
  enzymeToJsonWithoutProps
} from "../../app/helpers/testUtils";

const schedule: ServiceScheduleInfo = (serviceData as unknown) as ServiceScheduleInfo;

const routePatterns = [
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
    representative_trip_id: "CR-Weekday-Spring-19-751",
    name: "South Station - Readville via Fairmount",
    headsign: "South Station",
    id: "CR-Fairmount-0-0",
    direction_id: 0
  }
] as EnhancedRoutePattern[];

const crSchedule: ServiceScheduleInfo = crServiceData as ServiceScheduleInfo;

describe("ScheduleTable", () => {
  it("it renders", () => {
    createReactRoot();
    const wrapper = mount(
      <ScheduleTable schedule={schedule} routePatterns={routePatterns} />
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
        schedule={schedule}
        routePatterns={routePatterns.map(routePattern => ({
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
        routePatterns={routePatterns}
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
