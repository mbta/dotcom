import React from "react";
import renderer from "react-test-renderer";
import { createReactRoot } from "../../../app/helpers/testUtils";
import { RAPID_TRANSIT } from "../../../models/route";
import { EnhancedRoute } from "../../../__v3api";
import HoursOfOperation from "../HoursOfOperation";
import { ScheduleNote, SchedulePDF } from "../__schedule";
import * as hours from "../../../hooks/useHoursOfOperation";

describe("RapidTransitHoursOfOperation", () => {
  beforeEach(() => {
    createReactRoot();
    jest.clearAllMocks();
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
              first_departure: `$2022-10-24T08:54:00-04:00`,
              is_terminus: false
            },
            {
              stop_name: "Test Stop 2",
              stop_id: "2",
              last_departure: `2022-10-24T22:45:00-04:00`,
              first_departure: `2022-10-24T07:55:00-04:00`,
              is_terminus: true
            }
          ],
          [
            {
              stop_name: "Test Stop 1",
              stop_id: "1",
              last_departure: `2022-10-24T23:35:00-04:00`,
              first_departure: `2022-10-24T08:35:00-04:00`,
              is_terminus: false
            },
            {
              stop_name: "Test Stop 2",
              stop_id: "2",
              last_departure: `2022-10-24T23:25:00-04:00`,
              first_departure: `2022-10-24T08:25:00-04:00`,
              is_terminus: true
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
              is_terminus: true
            }
          ],
          [
            {
              stop_name: "Test Stop 1",
              stop_id: "1",
              last_departure: `2022-10-22T22:15:00-04:00`,
              first_departure: `2022-10-22T07:15:00-04:00`,
              is_terminus: true
            }
          ]
        ],
        sunday: [[], []]
      };
    });

    const route = { id: "Blue", description: RAPID_TRANSIT } as EnhancedRoute;
    const scheduleNote = {
      offpeak_service: "10 minutes",
      peak_service: "5 minutes"
    } as ScheduleNote;
    const tree = renderer
      .create(
        <HoursOfOperation
          hours={"These are hours"}
          pdfs={[{ url: "URL" } as SchedulePDF]}
          route={route}
          scheduleNote={scheduleNote}
        />
      )
      .toJSON();
    expect(tree).not.toBeNull();
    const treeString = JSON.stringify(tree);
    expect(treeString).toMatch("Weekend Schedule");
    expect(treeString).toMatch("Weekday Schedule");
    expect(treeString).toMatch("Test Stop 2");
    // only the week day stop that is a terminus stop is shown
    expect(treeString).toMatch("7:55am - 10:45pm");
    expect(treeString).not.toMatch("8:54am - 10:44pm");
    expect(treeString).toMatch("8:15am - 9:15pm");
    expect(treeString).toMatch("Trains depart every 10 minutes");
  });
});
