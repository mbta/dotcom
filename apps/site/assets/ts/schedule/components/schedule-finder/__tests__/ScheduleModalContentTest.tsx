import React from "react";
import renderer, { act } from "react-test-renderer";
import { EnhancedRoute } from "../../../../__v3api";
import ScheduleModalContent, { fetchData } from "../ScheduleModalContent";
import { ServiceInSelector, SimpleStop, SimpleStopMap } from "../../__schedule";
import { EnhancedJourney } from "../../__trips";
import departuresResponse from "./test-data/departures.json";
import ScheduleNote from "../../ScheduleNote";
import { createReactRoot } from "../../../../app/helpers/testUtils";
import { UpcomingDepartures } from "../upcoming-departures/UpcomingDepartures";
import { mount } from "enzyme";

const today = "2019-12-05";
const route: EnhancedRoute = {
  alerts: [],
  description: "",
  direction_destinations: { 0: "Oak Grove", 1: "Forest Hills" },
  direction_names: { 0: "Inbound", 1: "Outbound" },
  header: "",
  id: "Orange",
  name: "Orange",
  long_name: "Orange Line",
  type: 1
};

const greenRoute: EnhancedRoute = {
  alerts: [],
  description: "",
  direction_destinations: { 0: "East", 1: "West" },
  direction_names: { 0: "East", 1: "West" },
  header: "",
  id: "Green",
  name: "Green",
  long_name: "Green Line",
  type: 0
};

const busRoute: EnhancedRoute = {
  alerts: [],
  description: "",
  direction_destinations: { 0: "Oak Grove", 1: null },
  direction_names: { 0: "Inbound", 1: null },
  header: "",
  id: "1",
  name: "1",
  long_name: "1",
  type: 3
};

const scheduleNoteData = {
  offpeak_service: "8-12 minutes",
  peak_service: "5 minutes",
  exceptions: [
    { service: "26 minutes", type: "weekend mornings and late night" }
  ],
  alternate_text: null
};

const stopList: SimpleStop[] = [
  { name: "Malden Center", id: "place-mlmnl", is_closed: false, zone: "1" },
  { name: "Wellington", id: "place-welln", is_closed: false, zone: "2" }
];

const stops: SimpleStopMap = { 0: stopList, 1: stopList.slice().reverse() };

const payload: EnhancedJourney[] = (departuresResponse as unknown) as EnhancedJourney[];

const baseTypicalService: ServiceInSelector = {
  valid_days: [1, 2, 3, 4, 5],
  typicality: "typical_service",
  type: "weekday",
  start_date: "2019-07-07",
  removed_dates_notes: {},
  removed_dates: [],
  name: "Weekday",
  id: "weekday2019",
  end_date: "2019-09-15",
  description: "Ferry service",
  added_dates_notes: {},
  added_dates: [],
  rating_start_date: "2019-07-03",
  rating_end_date: "2019-12-01",
  rating_description: "",
  "default_service?": false
};

describe("ScheduleModalContent", () => {
  beforeAll(() => {
    // these tests aren't testing the fetched schedules so let's mock this so we don't get errors
    window.fetch = jest.fn().mockImplementation(
      () =>
        new Promise((resolve: Function) =>
          resolve({
            json: () => "Internal Server Error",
            ok: false,
            status: 500,
            statusText: "INTERNAL SERVER ERROR"
          })
        )
    );
  });

  it("renders", () => {
    let tree;
    act(() => {
      tree = renderer.create(
        <ScheduleModalContent
          handleChangeDirection={() => {}}
          handleChangeOrigin={() => {}}
          handleOriginSelectClick={() => {}}
          route={route}
          stops={stops}
          selectedOrigin={stopList[0].id}
          selectedDirection={0}
          services={[]}
          routePatternsByDirection={{}}
          today={today}
          scheduleNote={null}
        />
      );
    });

    expect(tree).toMatchSnapshot();
  });

  it("renders with schedule note if present", () => {
    createReactRoot();
    const tree = renderer.create(
      <ScheduleModalContent
        handleChangeDirection={() => {}}
        handleChangeOrigin={() => {}}
        handleOriginSelectClick={() => {}}
        route={route}
        stops={stops}
        selectedOrigin={stopList[0].id}
        selectedDirection={0}
        services={[]}
        routePatternsByDirection={{}}
        today={today}
        scheduleNote={scheduleNoteData}
      />
    );
    expect(
      tree.root.findByType(ScheduleNote).props.scheduleNote.offpeak_service
    ).toBe("8-12 minutes");
  });

  describe("fetchData", () => {
    it("fetches data", () => {
      const spy = jest.fn();
      window.fetch = jest.fn().mockImplementation(
        () =>
          new Promise((resolve: Function) =>
            resolve({
              json: () => payload,
              ok: true,
              status: 200,
              statusText: "OK"
            })
          )
      );

      return fetchData("1", "99", 0, spy).then(() => {
        expect(window.fetch).toHaveBeenCalledWith(
          "/schedules/finder_api/departures?id=1&stop=99&direction=0"
        );
        expect(spy).toHaveBeenCalledWith({
          type: "FETCH_STARTED"
        });
        expect(spy).toHaveBeenCalledWith({
          type: "FETCH_COMPLETE",
          payload
        });
      });
    });

    it("fails gracefully if fetch is unsuccessful", () => {
      const spy = jest.fn();
      window.fetch = jest.fn().mockImplementation(
        () =>
          new Promise((resolve: Function) =>
            resolve({
              json: () => "Internal Server Error",
              ok: false,
              status: 500,
              statusText: "INTERNAL SERVER ERROR"
            })
          )
      );

      return fetchData(route.id, stopList[0].id, 0, spy).then(() => {
        expect(window.fetch).toHaveBeenCalledWith(
          "/schedules/finder_api/departures?id=Orange&stop=place-mlmnl&direction=0"
        );
        expect(spy).toHaveBeenCalledWith({
          type: "FETCH_STARTED"
        });
        expect(spy).toHaveBeenCalledWith({
          type: "FETCH_ERROR"
        });
      });
    });
  });

  it("renders with UpcomingDepartures for today's service", () => {
    const wrapper = mount(
      <ScheduleModalContent
        handleChangeDirection={() => {}}
        handleChangeOrigin={() => {}}
        handleOriginSelectClick={() => {}}
        route={busRoute}
        stops={stops}
        selectedOrigin={stopList[0].id}
        selectedDirection={0}
        services={[baseTypicalService]}
        routePatternsByDirection={{}}
        today={"2019-07-09"}
        scheduleNote={null}
      />
    );

    expect(wrapper.find(UpcomingDepartures).exists()).toEqual(true);

    expect(wrapper.find(".callout").exists()).toEqual(false);
  });

  it("does not render UpcomingDepartures if no service today", () => {
    const wrapper = mount(
      <ScheduleModalContent
        handleChangeDirection={() => {}}
        handleChangeOrigin={() => {}}
        handleOriginSelectClick={() => {}}
        route={busRoute}
        stops={stops}
        selectedOrigin={stopList[0].id}
        selectedDirection={0}
        services={[baseTypicalService]}
        routePatternsByDirection={{}}
        today={"2018-09-16"}
        scheduleNote={null}
      />
    );

    expect(wrapper.find(UpcomingDepartures).exists()).toEqual(false);
    expect(wrapper.find(".callout").exists()).toEqual(true);
    expect(wrapper.find(".callout").text()).toContain(
      "There are no scheduled trips"
    );
  });
});

it.each`
  testToday       | service               | isMatch
  ${"2019-07-01"} | ${baseTypicalService} | ${false}
  ${"2019-07-03"} | ${baseTypicalService} | ${false}
  ${"2019-07-06"} | ${baseTypicalService} | ${false}
  ${"2019-07-07"} | ${baseTypicalService} | ${true}
  ${"2019-07-08"} | ${baseTypicalService} | ${true}
  ${"2019-09-07"} | ${baseTypicalService} | ${true}
  ${"2019-09-14"} | ${baseTypicalService} | ${true}
  ${"2019-09-15"} | ${baseTypicalService} | ${true}
  ${"2019-09-16"} | ${baseTypicalService} | ${false}
  ${"2019-10-16"} | ${baseTypicalService} | ${false}
  ${"2019-12-16"} | ${baseTypicalService} | ${false}
`(
  "renders with UpcomingDepartures for today's service",
  ({ testToday, service, isMatch }) => {
    const wrapper = mount(
      <ScheduleModalContent
        handleChangeDirection={() => {}}
        handleChangeOrigin={() => {}}
        handleOriginSelectClick={() => {}}
        route={busRoute}
        stops={stops}
        selectedOrigin={stopList[0].id}
        selectedDirection={0}
        services={[service]}
        routePatternsByDirection={{}}
        today={testToday}
        scheduleNote={null}
      />
    );

    expect(wrapper.find(UpcomingDepartures).exists()).toEqual(isMatch);
    expect(wrapper.find(".callout").exists()).toEqual(!isMatch);
  }
);
