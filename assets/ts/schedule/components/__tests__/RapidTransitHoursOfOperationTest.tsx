import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import { RAPID_TRANSIT } from "../../../models/route";
import { EnhancedRoute, TransitHours } from "../../../__v3api";
import { ScheduleNote } from "../__schedule";
import * as hours from "../../../hooks/useHoursOfOperation";
import * as fetchJson from "../../../helpers/fetch-json";
import RapidTransitHoursOfOperation from "../RapidTransitHoursOfOperation";
import { createScheduleStore } from "../../store/ScheduleStore";
import { Provider } from "react-redux";
import * as reactRedux from "react-redux";

describe("RapidTransitHoursOfOperation", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("calls the hours of operation hook", async () => {
    const spy = jest
      .spyOn(fetchJson, "fetchJsonOrThrow")
      .mockImplementation(() => {
        return Promise.resolve({
          week: [],
          saturday: [],
          sunday: []
        });
      });

    const route = { id: "Blue", description: RAPID_TRANSIT } as EnhancedRoute;
    const scheduleNote = {
      saturday_service: "10 minutes",
      sunday_service: "10 minutes",
      peak_service: "5 minutes"
    } as ScheduleNote;

    act(() => {
      render(
        <Provider store={createScheduleStore(0)}>
          <RapidTransitHoursOfOperation
            route={route}
            scheduleNote={scheduleNote}
          />
        </Provider>
      );
    });

    await waitFor(() => expect(spy).toHaveBeenCalled());
  });

  it("renders the rapid transit schedule", () => {
    jest.spyOn(hours, "default").mockImplementation(() => {
      return {
        week: [
          {
            last_departure: `2022-10-24T23:44:00-04:00`,
            first_departure: `2022-10-24T08:54:00-04:00`
          },
          {
            last_departure: `2022-10-24T23:35:00-04:00`,
            first_departure: `2022-10-24T08:35:00-04:00`
          }
        ],
        saturday: [
          {
            last_departure: `2022-10-22T21:15:00-04:00`,
            first_departure: `2022-10-22T08:15:00-04:00`
          },
          {
            last_departure: `2022-10-22T22:15:00-04:00`,
            first_departure: `2022-10-22T07:15:00-04:00`
          }
        ],
        sunday: [],
        special_service: {}
      } as TransitHours;
    });

    const route = { id: "Blue", description: RAPID_TRANSIT } as EnhancedRoute;
    const scheduleNote = {
      saturday_service: "10 minutes",
      sunday_service: "10 minutes",
      peak_service: "5 minutes"
    } as ScheduleNote;
    render(
      <Provider store={createScheduleStore(0)}>
        <RapidTransitHoursOfOperation
          route={route}
          scheduleNote={scheduleNote}
          date={new Date("2022-10-24T13:54:00-04:00")}
        />
      </Provider>
    );

    expect(screen.getByText("Today's Service")).toBeInTheDocument();
    expect(screen.getByText("8:35 AM")).toBeInTheDocument();
    expect(screen.getByText("11:35 PM")).toBeInTheDocument();
    expect(screen.getByText("Trains depart every 5 minutes"));
  });

  it("renders both peak and off peak services", () => {
    jest.spyOn(hours, "default").mockImplementation(() => {
      return {
        week: [],
        saturday: [],
        sunday: [],
        special_service: {}
      } as TransitHours;
    });

    const route = { id: "Blue", description: RAPID_TRANSIT } as EnhancedRoute;
    const scheduleNote = {
      saturday_service: "10 minutes",
      sunday_service: "10 minutes",
      peak_service: "5 minutes",
      offpeak_service: "15 minutes"
    } as ScheduleNote;
    render(
      <Provider store={createScheduleStore(0)}>
        <RapidTransitHoursOfOperation
          route={route}
          scheduleNote={scheduleNote}
          date={new Date("2022-10-24T13:54:00-04:00")}
        />
      </Provider>
    );

    expect(screen.getByText("Peak Service: Trains depart every 5 minutes"));
    expect(
      screen.getByText("Off-Peak Service: Trains depart every 15 minutes")
    );
  });

  it("renders the saturday schedule", () => {
    jest.spyOn(hours, "default").mockImplementation(() => {
      return {
        week: [
          {
            last_departure: `2022-10-24T23:44:00-04:00`,
            first_departure: `2022-10-24T08:54:00-04:00`
          },
          {
            last_departure: `2022-10-24T23:35:00-04:00`,
            first_departure: `2022-10-24T08:35:00-04:00`
          }
        ],
        saturday: [
          {
            last_departure: `2022-10-22T21:15:00-04:00`,
            first_departure: `2022-10-22T08:15:00-04:00`
          },
          {
            last_departure: `2022-10-22T22:15:00-04:00`,
            first_departure: `2022-10-22T07:15:00-04:00`
          }
        ],
        sunday: [],
        special_service: {}
      } as TransitHours;
    });

    const route = { id: "Blue", description: RAPID_TRANSIT } as EnhancedRoute;
    const scheduleNote = {
      saturday_service: "10 minutes",
      sunday_service: "11 minutes",
      peak_service: "5 minutes"
    } as ScheduleNote;
    render(
      <Provider store={createScheduleStore(0)}>
        <RapidTransitHoursOfOperation
          route={route}
          scheduleNote={scheduleNote}
          date={new Date("2022-10-22T13:54:00-04:00")}
        />
      </Provider>
    );

    expect(screen.getByText("Today's Service")).toBeInTheDocument();
    expect(screen.getByText("7:15 AM")).toBeInTheDocument();
    expect(screen.getByText("9:15 PM")).toBeInTheDocument();
    expect(screen.getByText("Trains depart every 10 minutes"));
  });

  it("should open the schedule finder modal on click", async () => {
    const spyFunction = jest.fn();
    jest.spyOn(reactRedux, "useDispatch").mockImplementation(() => {
      return spyFunction;
    });
    jest.spyOn(hours, "default").mockImplementation(() => {
      return {
        week: [],
        saturday: [],
        sunday: [],
        special_service: {}
      } as TransitHours;
    });

    const route = { id: "Blue", description: RAPID_TRANSIT } as EnhancedRoute;
    render(
      <Provider store={createScheduleStore(0)}>
        <RapidTransitHoursOfOperation
          route={route}
          scheduleNote={null}
          date={new Date("2022-10-24T13:54:00-04:00")}
        />
      </Provider>
    );

    screen.getByText("Find departures from your stop").click();

    await waitFor(() => {
      expect(spyFunction).toHaveBeenCalledWith({
        type: "OPEN_MODAL",
        newStoreValues: {
          modalMode: "origin"
        }
      });
    });
  });
});
