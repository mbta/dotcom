import React from "react";
import renderer from "react-test-renderer";
import { createReactRoot } from "../../../app/helpers/testUtils";
import { RAPID_TRANSIT } from "../../../models/route";
import { EnhancedRoute } from "../../../__v3api";
import HoursOfOperation from "../HoursOfOperation";
import { SchedulePDF } from "../__schedule";
import * as hours from "../../../hooks/useHoursOfOperation";
import {
  formatInTimeZone,
  getTimezoneOffset,
  utcToZonedTime
} from "date-fns-tz";
import { format, parseISO } from "date-fns";

describe("RapidTransitHoursOfOperation", () => {
  beforeEach(() => {
    createReactRoot();
    jest.clearAllMocks();
  });

  it("renders the rapid transit schedule if route rapid transit", () => {
    // get todays date so we have the right daylight savings time offset
    const today = new Date();
    const dateString = formatInTimeZone(
      today,
      "America/New_York",
      "yyyy-MM-dd"
    );

    const offset = getTimezoneOffset("America/New_York");
    const hourOffset = offset / 3_600_000;

    // America/New_York is either a -4 or -5 hour offest from UTC (depending on daylight savings time)
    const offsetString = hourOffset == -4 ? "-04:00" : "-05:00";

    jest.spyOn(hours, "default").mockImplementation(() => {
      return {
        week: [
          [
            {
              stop_name: "Test Stop 1",
              stop_id: "1",
              last_departure: `${dateString}T23:44:00${offsetString}`,
              first_departure: `${dateString}T08:54:00${offsetString}`,
              is_terminus: false
            },
            {
              stop_name: "Test Stop 2",
              stop_id: "2",
              last_departure: `${dateString}T22:45:00${offsetString}`,
              first_departure: `${dateString}T07:55:00${offsetString}`,
              is_terminus: true
            }
          ],
          [
            {
              stop_name: "Test Stop 1",
              stop_id: "1",
              last_departure: `${dateString}T23:35:00${offsetString}`,
              first_departure: `${dateString}T08:35:00${offsetString}`,
              is_terminus: false
            },
            {
              stop_name: "Test Stop 2",
              stop_id: "2",
              last_departure: `${dateString}T23:25:00${offsetString}`,
              first_departure: `${dateString}T08:25:00${offsetString}`,
              is_terminus: true
            }
          ]
        ],
        saturday: [
          [
            {
              stop_name: "Test Stop 1",
              stop_id: "1",
              last_departure: `${dateString}T21:15:00${offsetString}`,
              first_departure: `${dateString}T08:15:00${offsetString}`,
              is_terminus: true
            }
          ],
          [
            {
              stop_name: "Test Stop 1",
              stop_id: "1",
              last_departure: `${dateString}T22:15:00${offsetString}`,
              first_departure: `${dateString}T07:15:00${offsetString}`,
              is_terminus: true
            }
          ]
        ],
        sunday: [[], []]
      };
    });

    const route = { id: "Blue", description: RAPID_TRANSIT } as EnhancedRoute;
    const tree = renderer
      .create(
        <HoursOfOperation
          hours={"These are hours"}
          pdfs={[{ url: "URL" } as SchedulePDF]}
          route={route}
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
  });
});
