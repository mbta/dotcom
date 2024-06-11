import React from "react";
import userEvent from "@testing-library/user-event";
import { screen, waitFor } from "@testing-library/react";
import DepartureTimes from "../../components/DepartureTimes";
import { renderWithRouter } from "../helpers";
import { Alert, Route } from "../../../__v3api";
import { DepartureInfo } from "../../../models/departureInfo";
import { ScheduleWithTimestamp } from "../../../models/schedules";
import { PredictionWithTimestamp } from "../../../models/predictions";
import { mergeIntoDepartureInfo } from "../../../helpers/departureInfo";
import { getNextTwoTimes } from "../../models/displayTimeConfig";

describe("DepartureTimes", () => {
  it("should display a default", async () => {
    renderWithRouter(
      <DepartureTimes
        headsign="Some place"
        departures={[]}
        alertsForDirection={[]}
        isCR={false}
        isSubway={false}
        onClick={jest.fn()}
        hasService={true}
      />
    );
    await waitFor(() => {
      expect(screen.findByText("Some place")).toBeDefined();
      expect(
        screen.queryByRole("button", {
          name: `Open upcoming departures to ${"Some place"}`
        })
      ).toBeDefined();
    });
  });

  it("should render rows if there are schedules", async () => {
    const dateToCompare = new Date("2022-04-27T10:30:00-04:00");
    const predictions = [
      {
        time: new Date("2022-04-27T11:15:00-04:00"),
        route: { type: 2 } as Route,
        trip: { id: "1", headsign: "Test 1" },
        track: "3"
      },
      {
        trip: { id: "2", headsign: "Test 1" },
        route: { type: 1 } as Route,
        time: new Date("2022-04-27T11:20:00-04:00"),
        track: "1"
      },
      {
        trip: { id: "3", headsign: "Test 3" },
        time: new Date("2022-04-27T11:45:00-04:00"),
        route: { type: 3 } as Route
      } as PredictionWithTimestamp
    ];
    const schedules = [
      {
        trip: { id: "1", headsign: "Test 1" },
        time: new Date("2022-04-27T11:15:00-04:00"),
        route: { type: 3 }
      },
      {
        trip: { id: "2", headsign: "Test 1" },
        time: new Date("2022-04-27T11:18:00-04:00"),
        route: { type: 3 }
      },
      {
        trip: { id: "4", headsign: "Test 2" },
        time: new Date("2022-04-27T11:40:00-04:00"),
        route: { type: 3 }
      }
    ] as ScheduleWithTimestamp[];
    renderWithRouter(
      <DepartureTimes
        headsign="Test 1"
        departures={mergeIntoDepartureInfo(
          schedules,
          predictions as PredictionWithTimestamp[]
        )}
        overrideDate={dateToCompare}
        alertsForDirection={[]}
        isCR={false}
        isSubway={false}
        onClick={jest.fn()}
        hasService={true}
      />
    );
    await waitFor(() => {
      expect(screen.getByText("Test 1"));
      expect(screen.getByText("45 min"));
      expect(screen.getByText("50 min"));
    });
  });

  it.each`
    alertEffect     | expectedBadge
    ${"suspension"} | ${"No Service"}
    ${"shuttle"}    | ${"Shuttle Service"}
  `(
    `displays $expectedBadge when high priority alert has effect $alertEffect`,
    async ({ alertEffect, expectedBadge }) => {
      const alerts = [
        {
          id: "1234",
          informed_entity: {
            direction_id: [0]
          },
          effect: alertEffect,
          lifecycle: "new"
        }
      ] as Alert[];

      // these are special cases that're only valid if there are also no
      // departures, see doc for isSuppressiveAlert
      renderWithRouter(
        <DepartureTimes
          headsign="ThatStation"
          departures={[]}
          alertsForDirection={alerts}
          isCR={false}
          isSubway={false}
          onClick={jest.fn()}
          hasService={true}
        />
      );
      await waitFor(() => {
        expect(screen.getByText(expectedBadge)).toBeDefined();
        expect(screen.getByText("See alternatives")).toBeDefined();
      });
    }
  );

  it("should display the high priority alert badge over the information alert badge", async () => {
    const schedules = [] as ScheduleWithTimestamp[];

    const alerts = [
      {
        id: "1234",
        informed_entity: {
          direction_id: [0]
        },
        effect: "suspension",
        lifecycle: "new"
      },
      {
        id: "123",
        informed_entity: {
          direction_id: [0]
        },
        effect: "detour",
        lifecycle: "new"
      }
    ] as Alert[];

    renderWithRouter(
      <DepartureTimes
        headsign="ThisStop"
        departures={mergeIntoDepartureInfo(schedules, [])}
        alertsForDirection={alerts}
        isCR={false}
        isSubway={false}
        onClick={jest.fn()}
        hasService={true}
      />
    );
    await waitFor(() => {
      expect(screen.getByText("No Service")).toBeDefined();
      expect(screen.queryByText("Detour")).toBeNull();
      expect(screen.getByText("See alternatives")).toBeDefined();
    });
  });

  it("should display the detour badge with times if detour alert is present", async () => {
    const dateToCompare = new Date("2022-04-27T10:30:00-04:00");
    const predictions = [
      {
        time: new Date("2022-04-27T11:15:00-04:00"),
        trip: { id: "1", headsign: "Test 1" },
        route: { type: 2 }
      },
      {
        trip: { id: "2", headsign: "Test 1" },
        time: new Date("2022-04-27T11:20:00-04:00"),
        route: { type: 2 }
      }
    ] as PredictionWithTimestamp[];
    const schedules = [
      {
        trip: { id: "1", headsign: "Test 1" },
        time: new Date("2022-04-27T11:15:00-04:00"),
        route: { type: 3 } as Route
      },
      {
        trip: { id: "2", headsign: "Test 1" },
        time: new Date("2022-04-27T11:18:00-04:00"),
        route: { type: 3 } as Route
      }
    ] as ScheduleWithTimestamp[];
    const detourAlert = {
      id: "123",
      informed_entity: {
        direction_id: [0]
      },
      effect: "detour"
    };

    renderWithRouter(
      <DepartureTimes
        headsign=""
        departures={mergeIntoDepartureInfo(schedules, predictions)}
        alertsForDirection={[detourAlert] as Alert[]}
        overrideDate={dateToCompare}
        isCR={false}
        isSubway={false}
        onClick={jest.fn()}
        hasService={true}
      />
    );
    await waitFor(() => {
      expect(screen.getByText("Detour")).toBeDefined();
      expect(screen.getByText("45 min")).toBeDefined();
      expect(screen.queryByText("See alternatives")).toBeNull();
    });
  });

  describe("getNextTwoTimes", () => {
    it("should return the next 2 departure infos times", () => {
      const departureInfos = [
        {
          prediction: { time: new Date("2022-04-26T11:15:00-04:00") }
        },
        {
          prediction: { time: new Date("2022-04-26T11:25:00-04:00") }
        },
        {
          prediction: { time: new Date("2022-04-27T01:03:00-04:00") }
        }
      ] as DepartureInfo[];

      const [time1, time2] = getNextTwoTimes(departureInfos);
      expect(time1?.prediction?.time).toEqual(
        new Date("2022-04-26T11:15:00-04:00")
      );
      expect(time2?.prediction?.time).toEqual(
        new Date("2022-04-26T11:25:00-04:00")
      );
    });
    it("should return the next departure info that is not cancelled", () => {
      const departureInfos = [
        {
          prediction: { time: new Date("2022-04-26T11:15:00-04:00") }
        },
        {
          prediction: {
            time: new Date("2022-04-26T11:25:00-04:00"),
            schedule_relationship: "cancelled"
          },
          isCancelled: true
        },
        {
          prediction: { time: new Date("2022-04-27T01:03:00-04:00") }
        }
      ] as DepartureInfo[];

      const [time1, time2] = getNextTwoTimes(departureInfos);
      expect(time1?.prediction?.time).toEqual(
        new Date("2022-04-26T11:15:00-04:00")
      );
      expect(time2?.prediction?.time).toEqual(
        new Date("2022-04-27T01:03:00-04:00")
      );
    });
    it("should return an array of undefineds if no departure info passed to it", () => {
      const [time1, time2] = getNextTwoTimes([]);
      expect(time1).toBeUndefined();
      expect(time2).toBeUndefined();
    });
    it("should return the first departure info even if it is cancelled", () => {
      const departureInfos = [
        {
          prediction: {
            time: new Date("2022-04-26T11:15:00-04:00"),
            schedule_relationship: "cancelled"
          }
        },
        {
          prediction: { time: new Date("2022-04-26T11:25:00-04:00") }
        }
      ] as DepartureInfo[];
      const [time1, time2] = getNextTwoTimes(departureInfos);
      expect(time1?.prediction?.time).toEqual(
        new Date("2022-04-26T11:15:00-04:00")
      );
      expect(time2?.prediction?.time).toEqual(
        new Date("2022-04-26T11:25:00-04:00")
      );
    });

    it("should return one departure time and undefined if only one departure info", () => {
      const departureInfos = [
        {
          prediction: { time: new Date("2022-04-26T11:15:00-04:00") }
        }
      ] as DepartureInfo[];
      const [time1, time2] = getNextTwoTimes(departureInfos);
      expect(time1?.prediction?.time).toEqual(
        new Date("2022-04-26T11:15:00-04:00")
      );
      expect(time2).toBeUndefined();
    });
    it("should return one departure and an undefined if all remaining are cancelled", () => {
      const departureInfos = [
        {
          prediction: { time: new Date("2022-04-26T11:15:00-04:00") }
        },
        {
          prediction: {
            time: new Date("2022-04-26T11:25:00-04:00"),
            schedule_relationship: "cancelled"
          },
          isCancelled: true
        },
        {
          prediction: {
            time: new Date("2022-04-26T11:35:00-04:00"),
            schedule_relationship: "cancelled"
          },
          isCancelled: true
        }
      ] as DepartureInfo[];
      const [time1, time2] = getNextTwoTimes(departureInfos);
      expect(time1?.prediction?.time).toEqual(
        new Date("2022-04-26T11:15:00-04:00")
      );
      expect(time2).toBeUndefined();
    });
  });

  it("should allow the clicking of rows", async () => {
    const setRowSpy = jest.fn();
    const compareTime = new Date("2022-04-24T11:15:00-04:00");
    const schedules = [
      {
        trip: { id: "1", headsign: "Test 1" },
        time: new Date("2022-04-27T11:15:00-04:00"),
        route: { type: 2 }
      },
      {
        trip: { id: "2", headsign: "Test 1" },
        time: new Date("2022-04-27T11:18:00-04:00"),
        route: { type: 2 }
      },
      {
        trip: { id: "4", headsign: "Test 2" },
        time: new Date("2022-04-27T11:40:00-04:00"),
        route: { type: 2 }
      }
    ] as ScheduleWithTimestamp[];

    const user = userEvent.setup();
    renderWithRouter(
      <DepartureTimes
        headsign="Test 1"
        departures={mergeIntoDepartureInfo(schedules, [])}
        alertsForDirection={[]}
        overrideDate={compareTime}
        isCR={false}
        isSubway={false}
        onClick={setRowSpy}
        hasService={true}
      />
    );

    let btn: HTMLElement;
    await waitFor(() => {
      btn = screen.getByRole("button", {
        name: /Open upcoming departures to Test 1/
      });
      expect(btn).toBeDefined();
    });
    await user.click(
      screen.getByRole("button", { name: /Open upcoming departures to Test 1/ })
    );
    expect(setRowSpy).toHaveBeenCalledTimes(1);
  });

  it("should render `Track [Track Name] if commuter rail", async () => {
    const dateToCompare = new Date("2022-04-27T10:30:00-04:00");
    const departures = [
      {
        schedule: {
          trip: { id: "1", headsign: "Test 1" },
          time: new Date("2022-04-27T11:15:00-04:00"),
          route: { type: 2 }
        },
        prediction: {
          time: new Date("2022-04-27T11:19:00-04:00"),
          trip: { id: "1", headsign: "Test 1" },
          route: { type: 2 },
          track: "3"
        },
        routeMode: "commuter_rail",
        trip: { id: "1", headsign: "Test 1" },
        isCancelled: false,
        isDelayed: true
      },
      {
        schedule: {
          trip: { id: "2", headsign: "Test 1" },
          time: new Date("2022-04-27T11:18:00-04:00"),
          route: { type: 1 }
        },
        prediction: {
          trip: { id: "2", headsign: "Test 1" },
          time: new Date("2022-04-27T11:30:00-04:00"),
          route: { type: 1 },
          track: "1"
        },
        routeMode: "subway",
        trip: { id: "2", headsign: "Test 1" },
        isCancelled: false,
        isDelayed: true
      },
      {
        schedule: {
          trip: { id: "4", headsign: "Test 2" },
          time: new Date("2022-04-27T11:40:00-04:00"),
          route: { type: 2 }
        },
        routeMode: "commuter_rail",
        trip: { id: "4", headsign: "Test 2" },
        isCancelled: false,
        isDelayed: false
      },
      {
        prediction: {
          trip: { id: "3", headsign: "Test 3" },
          time: new Date("2022-04-27T11:45:00-04:00"),
          route: { type: 3 }
        },
        routeMode: "bus",
        trip: { id: "3", headsign: "Test 3" },
        isCancelled: false,
        isDelayed: false
      }
    ] as DepartureInfo[];

    renderWithRouter(
      <DepartureTimes
        headsign="Test 1"
        departures={departures}
        overrideDate={dateToCompare}
        alertsForDirection={[]}
        isCR={true}
        isSubway={false}
        onClick={jest.fn()}
        hasService={true}
      />
    );

    await waitFor(() => {
      expect(screen.getByText("Track 3")).toBeDefined();
      const notCRTrack = screen.queryByText("Track 1");
      expect(notCRTrack).not.toBeInTheDocument();
    });
  });

  it("renders 'No real-time data' when no predictions", async () => {
    renderWithRouter(
      <DepartureTimes
        headsign="Alewife"
        departures={[]}
        alertsForDirection={[]}
        isCR={false}
        isSubway={false}
        onClick={jest.fn()}
        hasService={true}
      />
    );
    await waitFor(() => {
      expect(screen.getByText("No real-time data")).toBeDefined();
      expect(screen.getByText("Alewife")).toBeDefined();
    });
  });

  it("should render no service if the station is closed", async () => {
    const closureAlert = {
      id: "c1",
      effect: "station_closure",
      lifecycle: "ongoing"
    } as Alert;

    renderWithRouter(
      <DepartureTimes
        headsign="Ashmont"
        departures={[]}
        alertsForDirection={[closureAlert]}
        isCR={true}
        isSubway={false}
        onClick={jest.fn()}
        hasService={true}
      />
    );
    await waitFor(() => {
      expect(screen.getByText("No Service")).toBeInTheDocument();
      expect(screen.getByText("See alternatives")).toBeInTheDocument();
    });
  });

  it("should render no service if the stop is closed", async () => {
    const closureAlert = {
      id: "c1",
      effect: "stop_closure",
      lifecycle: "ongoing"
    } as Alert;

    renderWithRouter(
      <DepartureTimes
        headsign="Harbor Point"
        departures={[]}
        alertsForDirection={[closureAlert]}
        isCR={false}
        isSubway={false}
        onClick={jest.fn()}
        hasService={true}
      />
    );

    await waitFor(() => {
      expect(screen.getByText("No Service")).toBeInTheDocument();
      expect(screen.getByText("See alternatives")).toBeInTheDocument();
    });
  });

  it("can show no service message", async () => {
    const expectedMessage = "No trips today";
    renderWithRouter(
      <DepartureTimes
        headsign="Some place"
        departures={[]}
        alertsForDirection={[]}
        isCR={false}
        isSubway={false}
        onClick={jest.fn()}
        hasService={false}
      />
    );
    await waitFor(() => {
      expect(screen.findByText(expectedMessage)).toBeDefined();
    });
  });
});
