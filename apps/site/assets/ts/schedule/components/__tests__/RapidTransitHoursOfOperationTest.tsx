import React from "react";
import { create, act } from "react-test-renderer";
import { createReactRoot } from "../../../app/helpers/testUtils";
import { RAPID_TRANSIT } from "../../../models/route";
import { EnhancedRoute } from "../../../__v3api";
import { ScheduleNote, SchedulePDF } from "../__schedule";
import * as hours from "../../../hooks/useHoursOfOperation";
import * as fetchJson from "../../../helpers/fetch-json";
import RapidTransitHoursOfOperation from "../RapidTransitHoursOfOperation";
import { render, screen } from "@testing-library/react";

describe("RapidTransitHoursOfOperation", () => {
  beforeEach(() => {
    createReactRoot();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("calls the hours of operation hook", () => {
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
    let tree;
    act(() => {
      tree = create(
        <RapidTransitHoursOfOperation
          pdfs={[{ url: "URL" } as SchedulePDF]}
          route={route}
          scheduleNote={scheduleNote}
        />
      ).toJSON();
    });
    //expect(tree).not.toBeNull();
    expect(spy).toHaveBeenCalled();
  });

  it("renders the rapid transit schedule if route rapid transit", () => {
    jest.spyOn(hours, "default").mockImplementation(() => {
      return {
        week: [
          [
            {
              stop_name: "Test Stop 1",
              stop_id: "1",
              last_departure: `2022-10-24T23:44:00-04:00`,
              first_departure: `2022-10-24T08:54:00-04:00`,
              is_terminus: false,
              parent_stop_id: "1",
              latitude: 1,
              longitude: 1
            },
            {
              stop_name: "Test Stop 2",
              stop_id: "2",
              last_departure: `2022-10-24T22:45:00-04:00`,
              first_departure: `2022-10-24T07:55:00-04:00`,
              is_terminus: true,
              parent_stop_id: "2",
              latitude: 1,
              longitude: 1
            }
          ],
          [
            {
              stop_name: "Test Stop 1",
              stop_id: "1",
              last_departure: `2022-10-24T23:35:00-04:00`,
              first_departure: `2022-10-24T08:35:00-04:00`,
              is_terminus: false,
              parent_stop_id: "1",
              latitude: 1,
              longitude: 1
            },
            {
              stop_name: "Test Stop 2",
              stop_id: "2",
              last_departure: `2022-10-24T23:25:00-04:00`,
              first_departure: `2022-10-24T08:25:00-04:00`,
              is_terminus: true,
              parent_stop_id: "2",
              latitude: 1,
              longitude: 1
            }
          ]
        ],
        saturday: [
          [
            {
              stop_name: "Test Stop 1",
              stop_id: "1",
              last_departure: `2022-10-22T21:15:00-04:00`,
              first_departure: `2022-10-22T08:15:00-04:00`,
              is_terminus: true,
              parent_stop_id: "1",
              latitude: 1,
              longitude: 1
            }
          ],
          [
            {
              stop_name: "Test Stop 1",
              stop_id: "1",
              last_departure: `2022-10-22T22:15:00-04:00`,
              first_departure: `2022-10-22T07:15:00-04:00`,
              is_terminus: true,
              parent_stop_id: "1",
              latitude: 1,
              longitude: 1
            }
          ]
        ],
        sunday: [[], []],
        special_service: {}
      };
    });

    const route = { id: "Blue", description: RAPID_TRANSIT } as EnhancedRoute;
    const scheduleNote = {
      saturday_service: "10 minutes",
      sunday_service: "10 minutes",
      peak_service: "5 minutes"
    } as ScheduleNote;
    const tree = create(
      <RapidTransitHoursOfOperation
        pdfs={[{ url: "URL" } as SchedulePDF]}
        route={route}
        scheduleNote={scheduleNote}
      />
    ).toJSON();
    expect(tree).not.toBeNull();
    const treeString = JSON.stringify(tree);
    expect(treeString).toMatch("Weekend Schedule");
    expect(treeString).toMatch("Weekday Schedule");
    expect(treeString).toMatch("Test Stop 2");
    // only the week day stop that is a terminus stop is shown
    expect(treeString).toMatch("7:55 AM – 10:45 PM");
    expect(treeString).not.toMatch("8:54 AM – 10:44 PM");
    expect(treeString).toMatch("8:15 AM – 9:15 PM");
    expect(treeString).toMatch("Trains depart every 10 minutes");
  });

  it("does not render that station if first and last departure are the same", () => {
    jest.spyOn(hours, "default").mockImplementation(() => {
      return {
        week: [
          [
            {
              stop_name: "Test Stop 1",
              stop_id: "1",
              last_departure: `2022-10-24T08:54:00-04:00`,
              first_departure: `2022-10-24T08:54:00-04:00`,
              is_terminus: true,
              parent_stop_id: "1",
              latitude: 1,
              longitude: 1
            },
            {
              stop_name: "Test Stop 2",
              stop_id: "2",
              last_departure: `2022-10-24T22:45:00-04:00`,
              first_departure: `2022-10-24T07:55:00-04:00`,
              is_terminus: true,
              parent_stop_id: "2",
              latitude: 1,
              longitude: 1
            }
          ],
          []
        ],
        saturday: [[], []],
        sunday: [[], []],
        special_service: {}
      };
    });

    const route = { id: "Blue", description: RAPID_TRANSIT } as EnhancedRoute;
    const scheduleNote = {
      saturday_service: "10 minutes",
      sunday_service: "10 minutes",
      peak_service: "5 minutes"
    } as ScheduleNote;
    const tree = create(
      <RapidTransitHoursOfOperation
        pdfs={[{ url: "URL" } as SchedulePDF]}
        route={route}
        scheduleNote={scheduleNote}
      />
    ).toJSON();
    expect(tree).not.toBeNull();
    const treeString = JSON.stringify(tree);
    expect(treeString).toMatch("Weekend Schedule");
    expect(treeString).toMatch("Weekday Schedule");
    expect(treeString).not.toMatch("Test Stop 1");
    expect(treeString).not.toMatch("8:54 AM");
    expect(treeString).toMatch("Test Stop 2");
    expect(treeString).toMatch("7:55 AM – 10:45 PM");
    expect(treeString).toMatch("Trains depart every 10 minutes");
  });

  it("will combine hours of the same stop name", () => {
    jest.spyOn(hours, "default").mockImplementation(() => {
      return {
        week: [
          [
            {
              stop_name: "Test Stop 1",
              stop_id: "1",
              last_departure: `2022-10-24T15:44:00-04:00`,
              first_departure: `2022-10-24T04:54:00-04:00`,
              is_terminus: true,
              parent_stop_id: "1",
              latitude: 1,
              longitude: 1
            },
            {
              stop_name: "Test Stop 1",
              stop_id: "2",
              last_departure: `2022-10-24T20:45:00-04:00`,
              first_departure: `2022-10-24T15:55:00-04:00`,
              is_terminus: true,
              parent_stop_id: "1",
              latitude: 1,
              longitude: 1
            }
          ],
          [
            {
              stop_name: "Test Stop 1",
              stop_id: "1",
              last_departure: `2022-10-24T22:35:00-04:00`,
              first_departure: `2022-10-24T07:35:00-04:00`,
              is_terminus: false,
              parent_stop_id: "1",
              latitude: 1,
              longitude: 1
            },
            {
              stop_name: "Test Stop 2",
              stop_id: "2",
              last_departure: `2022-10-24T21:25:00-04:00`,
              first_departure: `2022-10-24T06:25:00-04:00`,
              is_terminus: true,
              parent_stop_id: "2",
              latitude: 1,
              longitude: 1
            }
          ]
        ],
        saturday: [[], []],
        sunday: [[], []],
        special_service: {}
      };
    });

    const route = { id: "Blue", description: RAPID_TRANSIT } as EnhancedRoute;
    const scheduleNote = {
      saturday_service: "10 minutes",
      sunday_service: "10 minutes",
      peak_service: "5 minutes"
    } as ScheduleNote;

    render(
      <RapidTransitHoursOfOperation
        pdfs={[{ url: "URL" } as SchedulePDF]}
        route={route}
        scheduleNote={scheduleNote}
      />
    );

    expect(screen.getByText("4:54 AM – 8:45 PM")).toBeInTheDocument();
    expect(screen.queryByText("3:44 PM")).toBeNull();
  });
});
