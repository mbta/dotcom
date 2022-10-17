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
import { parseISO } from "date-fns";

describe("RapidTransitHoursOfOperation", () => {
  beforeEach(() => {
    createReactRoot();
    jest.clearAllMocks();
  });

  it("renders the rapid transit schedule if route rapid transit", () => {
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
              last_departure: "2021-01-02 23:44:00" + offsetString,
              first_departure: "2021-01-02 08:54:00" + offsetString,
              is_terminus: false
            },
            {
              stop_name: "Test Stop 2",
              stop_id: "2",
              last_departure: "2022-01-02 22:45:00" + offsetString,
              first_departure: "2022-01-02 07:55:00" + offsetString,
              is_terminus: true
            }
          ],
          [
            {
              stop_name: "Test Stop 1",
              stop_id: "1",
              last_departure: "2021-01-01 23:35:00" + offsetString,
              first_departure: "2021-01-01 08:35:00" + offsetString,
              is_terminus: false
            },
            {
              stop_name: "Test Stop 2",
              stop_id: "2",
              last_departure: "2021-01-01 23:25:00" + offsetString,
              first_departure: "2021-01-01 08:25:00" + offsetString,
              is_terminus: true
            }
          ]
        ],
        saturday: [
          [
            {
              stop_name: "Test Stop 1",
              stop_id: "1",
              last_departure: "2021-01-01 21:15:00" + offsetString,
              first_departure: "2021-01-01 08:15:00" + offsetString,
              is_terminus: true
            }
          ],
          [
            {
              stop_name: "Test Stop 1",
              stop_id: "1",
              last_departure: "2021-01-01 22:15:00" + offsetString,
              first_departure: "2021-01-01 07:15:00" + offsetString,
              is_terminus: true
            }
          ]
        ],
        sunday: []
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
    expect(treeString).toMatch("7:55am - 10:45pm");
    expect(treeString).toMatch("8:15am - 9:15pm");
  });
});
