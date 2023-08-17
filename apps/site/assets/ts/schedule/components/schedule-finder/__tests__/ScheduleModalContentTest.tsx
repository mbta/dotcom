import React from "react";
import "whatwg-fetch";
import renderer, { act } from "react-test-renderer";
import { EnhancedRoute, Route } from "../../../../__v3api";
import ScheduleModalContent, { fetchData } from "../ScheduleModalContent";
import { ServiceInSelector, SimpleStop, SimpleStopMap } from "../../__schedule";
import { UpcomingDepartures } from "../upcoming-departures/UpcomingDepartures";
import { mount } from "enzyme";
import DailySchedule from "../daily-schedule/DailySchedule";

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
            json: () => [{ trip: { id: "yeah" } }],
            ok: true,
            status: 200,
            statusText: "OK"
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

  it("will not render Daily Schedule for subway lines", () => {
    act(() => {
      const tree = mount(
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
      expect(tree.find(DailySchedule)).toEqual({});
    });
  });

  describe("fetchData", () => {
    it("fetches data", async () => {
      const payload = [{ trip: { id: "yeah" } }];
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

      const result = await fetchData("1", "99", 0, "");
      expect(window.fetch).toHaveBeenCalledWith(
        "/schedules/finder_api/departures?id=1&stop=99&direction=0"
      );

      expect(result).toStrictEqual([
        { trip: { id: "yeah" }, tripInfo: payload }
      ]);
    });
  });

  it("renders with UpcomingDepartures for today's service", () => {
    act(() => {
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
  });

  it("does not render UpcomingDepartures if no service today", () => {
    act(() => {
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

  it("does not render UpcomingDepartures if mode is ferry", () => {
    act(() => {
      const ferryRoute = {
        color: "008EAA",
        "custom_route?": false,
        description: "ferry",
        direction_destinations: { 0: "Charlestown", 1: "Long Wharf" },
        direction_names: { 0: "Outbound", 1: "Inbound" },
        id: "Boat-F4",
        long_name: "Charlestown Ferry",
        name: "Charlestown Ferry",
        sort_order: 30001,
        type: 4
      } as Route;
      const wrapper = mount(
        <ScheduleModalContent
          handleChangeDirection={() => {}}
          handleChangeOrigin={() => {}}
          handleOriginSelectClick={() => {}}
          route={ferryRoute}
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
    });
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
    act(() => {
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
    });
  }
);
