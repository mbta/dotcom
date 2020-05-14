import React from "react";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import serviceData from "./serviceData.json";
import crServiceData from "./crServiceData.json";
import ScheduleTable from "../components/schedule-finder/ScheduleTable";
import {
  EnhancedRoutePattern,
  SimpleStop,
  SimpleStopMap,
  UserInput
} from "../components/__schedule";
import {
  createReactRoot,
  enzymeToJsonWithoutProps
} from "../../app/helpers/testUtils";
import { Journey } from "../components/__trips.js";
import { store } from "../store/ScheduleStore";

const journeys: Journey[] = serviceData as Journey[];

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

const crJourneys: Journey[] = crServiceData as Journey[];

const input = {
  route: "",
  origin: "",
  date: "",
  direction: 0
} as UserInput;

const stopList: SimpleStop[] = [
  { name: "Malden Center", id: "place-mlmnl", is_closed: false, zone: "1" },
  { name: "Wellington", id: "place-welln", is_closed: false, zone: "2" }
];

const stops: SimpleStopMap = { 0: stopList, 1: stopList.slice().reverse() };

describe("ScheduleTable", () => {
  it("it renders", () => {
    createReactRoot();
    const wrapper = mount(
      <Provider store={store}>
        <ScheduleTable
          journeys={journeys}
          routePatterns={routePatterns}
          input={input}
          stops={stops}
        />
      </Provider>
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
      <Provider store={store}>
        <ScheduleTable
          journeys={journeys}
          routePatterns={routePatterns.map(routePattern => ({
            ...routePattern,
            time_desc: "School Trip"
          }))}
          input={input}
          stops={stops}
        />
      </Provider>
    );
    expect(enzymeToJsonWithoutProps(wrapper)).toMatchSnapshot();
  });

  it("it renders CR schedules", () => {
    createReactRoot();
    const wrapper = mount(
      <Provider store={store}>
        <ScheduleTable
          journeys={crJourneys}
          routePatterns={crRoutePatterns}
          input={input}
          stops={stops}
        />
      </Provider>
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
      <Provider store={store}>
        <ScheduleTable
          journeys={crJourneys}
          routePatterns={crRoutePatterns.map(routePattern => ({
            ...routePattern,
            time_desc: "School Trip"
          }))}
          input={input}
          stops={stops}
        />
      </Provider>
    );
    expect(enzymeToJsonWithoutProps(wrapper)).toMatchSnapshot();
  });
});
