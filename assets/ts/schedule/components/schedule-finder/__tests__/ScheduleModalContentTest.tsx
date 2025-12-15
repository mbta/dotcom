import React from "react";
import { EnhancedRoute, Route } from "../../../../__v3api";
import ScheduleModalContent from "../ScheduleModalContent";
import { ServiceInSelector, SimpleStop, SimpleStopMap } from "../../__schedule";
import { screen, waitFor, act } from "@testing-library/react";
import { renderWithProviders } from "../../../../__tests__/test-render-helper";

jest.mock("../upcoming-departures/UpcomingDepartures", () => ({
  __esModule: true,
  default: () => <div>Upcoming Departures</div>
}));

jest.mock("../daily-schedule/DailySchedule", () => ({
  __esModule: true,
  default: () => <div>Daily Schedule</div>
}));

jest.mock("../daily-schedule/DailyScheduleSubway", () => ({
  __esModule: true,
  default: () => <div>Daily Schedule Subway</div>
}));

const today = "2019-12-05";
const subwayRoute: EnhancedRoute = {
  alerts: [],
  description: "",
  direction_destinations: { 0: "Oak Grove", 1: "Forest Hills" },
  direction_names: { 0: "Inbound", 1: "Outbound" },
  header: "",
  id: "Orange",
  name: "Orange",
  long_name: "Orange Line",
  type: 1,
  line_id: null
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
  type: 3,
  line_id: null
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
            json: () => [
              {
                trip: { id: "yeah" },
                departure: { time: "11:05 PM" },
                route: { type: 0 }
              }
            ],
            ok: true,
            status: 200,
            statusText: "OK"
          })
        )
    );
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("renders", async () => {
    act(() => {
      renderWithProviders(
        <ScheduleModalContent
          handleChangeDirection={() => {}}
          handleChangeOrigin={() => {}}
          handleOriginSelectClick={() => {}}
          route={busRoute}
          stops={stops}
          selectedOrigin={stopList[0].id}
          selectedDirection={0}
          services={[]}
          routePatternsByDirection={{}}
          today={today}
          scheduleNote={null}
          hasServiceToday={true}
        />
      );
    });

    const scheduleNode = await waitFor(() =>
      screen.getByText("Daily Schedule")
    );
    expect(scheduleNode).toBeInTheDocument();
  });

  it("will not render Daily Schedule for subway lines", async () => {
    act(() => {
      renderWithProviders(
        <ScheduleModalContent
          handleChangeDirection={() => {}}
          handleChangeOrigin={() => {}}
          handleOriginSelectClick={() => {}}
          route={subwayRoute}
          stops={stops}
          selectedOrigin={stopList[0].id}
          selectedDirection={0}
          services={[]}
          routePatternsByDirection={{}}
          today={today}
          scheduleNote={null}
          hasServiceToday={true}
        />
      );
    });

    const scheduleNode = await waitFor(() =>
      screen.getByText("Daily Schedule Subway")
    );
    expect(scheduleNode).toBeInTheDocument();
  });

  it("renders with UpcomingDepartures for today's service", async () => {
    act(() => {
      renderWithProviders(
        <ScheduleModalContent
          handleChangeDirection={() => {}}
          handleChangeOrigin={() => {}}
          handleOriginSelectClick={() => {}}
          route={busRoute}
          stops={stops}
          selectedOrigin={stopList[0].id}
          selectedDirection={0}
          services={[baseTypicalService]}
          routePatternsByDirection={{ 0: [] }}
          today={"2019-07-09"}
          scheduleNote={null}
          hasServiceToday={true}
        />
      );
    });
    const upcomingDeparturesNode = await waitFor(() =>
      screen.queryByText("Upcoming Departures")
    );
    const noDeparturesNode = await waitFor(() =>
      screen.queryByText(
        "There are currently no realtime departures available."
      )
    );

    expect(upcomingDeparturesNode).toBeInTheDocument();
    expect(noDeparturesNode).toBeNull();
  });

  it("does not render UpcomingDepartures if no service today", async () => {
    act(() => {
      renderWithProviders(
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
          hasServiceToday={false}
        />
      );
    });

    const upcomingDeparturesNode = await waitFor(() =>
      screen.queryByText("Upcoming Departures")
    );
    const noDeparturesNode = await waitFor(() =>
      screen.getByText(/There are no scheduled trips for .*/)
    );
    expect(upcomingDeparturesNode).toBeNull();
    expect(noDeparturesNode).toBeInTheDocument();
  });

  it("does not render UpcomingDepartures if mode is ferry", async () => {
    act(() => {
      const ferryRoute = {
        color: "008EAA",
        description: "ferry",
        direction_destinations: { 0: "Charlestown", 1: "Long Wharf" },
        direction_names: { 0: "Outbound", 1: "Inbound" },
        id: "Boat-F4",
        long_name: "Charlestown Ferry",
        name: "Charlestown Ferry",
        sort_order: 30001,
        type: 4,
        line_id: null
      } as Route;
      renderWithProviders(
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
          hasServiceToday={true}
        />
      );
    });
    const upcomingDeparturesNode = await waitFor(() =>
      screen.queryByText("Upcoming Departures")
    );
    expect(upcomingDeparturesNode).toBeNull();
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
  "renders with UpcomingDepartures for service on $testToday",
  async ({ testToday, service, isMatch }) => {
    act(() => {
      renderWithProviders(
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
          hasServiceToday={isMatch}
        />
      );
    });

    const upcomingDeparturesNode = await waitFor(() =>
      screen.queryByText("Upcoming Departures")
    );
    expect(upcomingDeparturesNode !== null).toBe(isMatch);
  }
);
