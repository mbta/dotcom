import React from "react";
import { mount } from "enzyme";
import {
  createReactRoot,
  enzymeToJsonWithoutProps
} from "../../../../../app/helpers/testUtils";
import { EnhancedRoutePattern, UserInput } from "../../../__schedule";
import { Journey } from "../../../__trips.js";
import ScheduleTable from "../ScheduleTable";
import crServiceData from "./test-data/crServiceData.json";
import serviceData from "./test-data/serviceData.json";

jest.mock("../../../../../helpers/use-fetch", () => ({
  __esModule: true,
  hasData: () => false,
  isLoading: () => true,
  isNotStarted: () => false,
  default: jest.fn().mockImplementation(() => [{ status: 2 }, jest.fn()])
}));

const journeys: Journey[] = (serviceData as unknown) as Journey[];

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

const crJourneys: Journey[] = (crServiceData as unknown) as Journey[];

const input = {
  route: "",
  origin: "",
  date: "",
  direction: 0
} as UserInput;

describe("ScheduleTable", () => {
  it("it renders", () => {
    createReactRoot();
    const wrapper = mount(
      <ScheduleTable
        journeys={journeys}
        routePatterns={routePatterns}
        input={input}
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
        journeys={journeys}
        routePatterns={routePatterns.map(routePattern => ({
          ...routePattern,
          time_desc: "School Trip"
        }))}
        input={input}
      />
    );
    expect(enzymeToJsonWithoutProps(wrapper)).toMatchSnapshot();
  });

  it("it renders an empty message", () => {
    createReactRoot();
    const wrapper = mount(
      <ScheduleTable
        journeys={[]}
        routePatterns={routePatterns}
        input={input}
      />
    );
    expect(enzymeToJsonWithoutProps(wrapper)).toMatchSnapshot();
  });

  it("it renders CR schedules", () => {
    createReactRoot();
    const wrapper = mount(
      <ScheduleTable
        journeys={crJourneys}
        routePatterns={crRoutePatterns}
        input={input}
      />
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
        journeys={crJourneys}
        routePatterns={crRoutePatterns.map(routePattern => ({
          ...routePattern,
          time_desc: "School Trip"
        }))}
        input={input}
      />
    );
    expect(enzymeToJsonWithoutProps(wrapper)).toMatchSnapshot();
  });
});
