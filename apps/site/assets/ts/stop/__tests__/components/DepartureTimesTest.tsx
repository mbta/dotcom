import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DepartureTimes from "../../components/DepartureTimes";
import { baseRoute } from "../helpers";
import { Alert, Route } from "../../../__v3api";
import { DepartureInfo } from "../../../models/departureInfo";
import { ScheduleWithTimestamp } from "../../../models/schedules";
import { PredictionWithTimestamp } from "../../../models/predictions";
import { mergeIntoDepartureInfo } from "../../../helpers/departureInfo";
import { getNextTwoTimes } from "../../models/displayTimeConfig";

const route = baseRoute("TestRoute", 1);
const destinationText = route.direction_destinations[0]!;
const mockClickAction = jest.fn();

describe("DepartureTimes", () => {
  it("should display a default", () => {
    render(
      <DepartureTimes
        route={route}
        directionId={0}
        stopName=""
        departuresForDirection={[]}
        onClick={mockClickAction}
        alertsForDirection={[]}
      />
    );
    expect(screen.findByText(destinationText)).toBeDefined();
    expect(
      screen.queryByRole("button", {
        name: `Open upcoming departures to ${destinationText}`
      })
    ).toBeDefined();
  });

  it("should render rows if there are schedules", () => {
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
    render(
      <DepartureTimes
        route={route}
        directionId={0}
        stopName=""
        departuresForDirection={mergeIntoDepartureInfo(
          schedules,
          predictions as PredictionWithTimestamp[]
        )}
        overrideDate={dateToCompare}
        onClick={mockClickAction}
        alertsForDirection={[]}
      />
    );
    expect(screen.getByText("Test 1"));
    expect(screen.getByText("Test 2"));
    expect(screen.getByText("45 min"));
    expect(screen.getByText("50 min"));
    expect(screen.getByText("11:40 AM"));
    // We don't support predictions without schedules yet
    // expect(screen.getByText("Test 3"))
    // expect(screen.getByText("11:45 AM"))
  });

  it.each`
    alertEffect     | expectedBadge
    ${"suspension"} | ${"Stop Closed"}
    ${"shuttle"}    | ${"Shuttle Service"}
  `(
    `displays $expectedBadge when high priority alert has effect $alertEffect`,
    ({ alertEffect, expectedBadge }) => {
      const schedules = [
        {
          route: { type: 2 },
          trip: { direction_id: 0 }
        }
      ] as ScheduleWithTimestamp[];

      const alerts = [
        {
          id: "1234",
          informed_entity: {
            direction_id: [0]
          },
          effect: alertEffect
        }
      ] as Alert[];

      render(
        <DepartureTimes
          route={route}
          directionId={0}
          stopName=""
          departuresForDirection={mergeIntoDepartureInfo(schedules, [])}
          alertsForDirection={alerts}
          onClick={() => {}}
        />
      );
      expect(screen.getByText(expectedBadge)).toBeDefined();
    }
  );

  it("should display the high priority alert badge over the information alert badge", () => {
    const schedules = [
      {
        route: { type: 1 },
        trip: { direction_id: 0 }
      }
    ] as ScheduleWithTimestamp[];

    const alerts = [
      {
        id: "1234",
        informed_entity: {
          direction_id: [0]
        },
        effect: "suspension"
      },
      {
        id: "123",
        informed_entity: {
          direction_id: [0]
        },
        effect: "detour"
      }
    ] as Alert[];

    render(
      <DepartureTimes
        route={route}
        directionId={0}
        stopName=""
        departuresForDirection={mergeIntoDepartureInfo(schedules, [])}
        alertsForDirection={alerts}
        onClick={() => {}}
      />
    );
    expect(screen.getByText("Stop Closed")).toBeDefined();
    expect(screen.queryByText("Detour")).toBeNull();
  });

  it("should display the detour badge with times if detour alert is present", () => {
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

    render(
      <DepartureTimes
        route={route}
        directionId={0}
        stopName=""
        departuresForDirection={mergeIntoDepartureInfo(schedules, predictions)}
        alertsForDirection={[detourAlert] as Alert[]}
        overrideDate={dateToCompare}
        onClick={() => {}}
      />
    );

    expect(screen.getByText("Detour")).toBeDefined();
    expect(screen.getByText("45 min")).toBeDefined();
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
    render(
      <DepartureTimes
        route={route}
        directionId={0}
        stopName=""
        departuresForDirection={mergeIntoDepartureInfo(schedules, [])}
        onClick={mockClickAction}
        alertsForDirection={[]}
        overrideDate={compareTime}
      />
    );

    const row = screen.getByText("Test 1");
    expect(row).toBeDefined();

    await user.click(row);
    expect(mockClickAction).toHaveBeenCalledTimes(1);
  });

  it("should render `Track [Track Name] if commuter rail", () => {
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

    render(
      <DepartureTimes
        route={route}
        directionId={0}
        stopName=""
        departuresForDirection={departures}
        overrideDate={dateToCompare}
        onClick={mockClickAction}
        alertsForDirection={[]}
      />
    );

    expect(screen.getByText("Track 3")).toBeDefined();
    const notCRTrack = screen.queryByText("Track 1");
    expect(notCRTrack).not.toBeInTheDocument();
  });

  it("renders 'No upcoming trips' when no predictions or schedules", () => {
    render(
      <DepartureTimes
        route={route}
        directionId={0}
        stopName="Alewife"
        departuresForDirection={[]}
        onClick={mockClickAction}
        alertsForDirection={[]}
      />
    );
    expect(screen.getByText("No upcoming trips")).toBeDefined();
    expect(screen.getByText("Somewhere there")).toBeDefined();
  });

  it("doesn't render when current stop is same as destination", () => {
    render(
      <DepartureTimes
        route={route}
        directionId={0}
        stopName="Somewhere there"
        departuresForDirection={[]}
        onClick={mockClickAction}
        alertsForDirection={[]}
      />
    );

    expect(screen.queryByText("No upcoming trips")).not.toBeInTheDocument();
    expect(screen.queryByText("Somewhere there")).not.toBeInTheDocument();
  });
});
