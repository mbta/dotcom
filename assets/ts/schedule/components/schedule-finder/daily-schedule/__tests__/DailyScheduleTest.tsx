import React from "react";
import renderer, { act } from "react-test-renderer";
import { ReactWrapper, mount } from "enzyme";
import { createReactRoot } from "../../../../../app/helpers/testUtils";
import * as dailyScheduleModule from "../DailySchedule";
import { DatesNotes, Service, ServiceTypicality } from "../../../../../__v3api";
import { ServiceInSelector } from "../../../__schedule";
import { render, screen } from "@testing-library/react";

const makeSimpleService = (
  [start_date, end_date]: [string, string],
  [rating_start_date, rating_end_date]: [string, string],
  typicality?: ServiceTypicality,
  addedDates?: string[],
  addedDatesNotes?: DatesNotes
): Service => ({
  valid_days: [1, 2, 3, 4, 5],
  typicality: typicality ? typicality : "typical_service",
  type: "weekday",
  start_date,
  removed_dates_notes: {},
  removed_dates: [],
  name: "Test Service Name",
  id: "Test Service ID",
  end_date,
  description: `${name} schedule`,
  added_dates_notes: addedDatesNotes ? addedDatesNotes : {},
  added_dates: addedDates ? addedDates : [],
  rating_start_date,
  rating_end_date,
  rating_description: "Test Rating"
});

jest.mock("../../../../../helpers/use-fetch", () => ({
  __esModule: true,
  hasData: () => true,
  isLoading: () => false,
  isNotStarted: () => true,
  default: jest.fn().mockImplementation(() => [
    {
      status: 3,
      data: [
        {
          trip: {
            shape_id: "010070",
            route_pattern_id: "1-_-0",
            name: "",
            id: "45030860",
            headsign: "Harvard",
            direction_id: 0,
            bikes_allowed: true
          },
          route: {
            type: 3,
            sort_order: 50010,
            name: "1",
            long_name: "Harvard Square - Nubian Station",
            id: "1",
            direction_names: { 0: "Outbound", 1: "Inbound" },
            direction_destinations: {
              0: "Harvard Square",
              1: "Nubian Station"
            },
            description: "frequent_bus_route",
            custom_route: false,
            color: "FFC72C"
          },
          departure: {
            time: "04:45 AM",
            schedule: {
              trip: {
                shape_id: "010070",
                route_pattern_id: "1-_-0",
                name: "",
                id: "45030860",
                headsign: "Harvard",
                direction_id: 0,
                bikes_allowed: true
              },
              time: "2020-08-28T04:45:00-04:00",
              stop_sequence: 12,
              stop: null,
              pickup_type: 0,
              last_stop: false,
              flag: false,
              early_departure: true
            },
            prediction: null
          }
        }
      ]
    },
    jest.fn()
  ])
}));

const services: ServiceInSelector[] = [
  {
    valid_days: [1, 2, 3, 4, 5],
    typicality: "typical_service",
    type: "weekday",
    start_date: "2019-07-02",
    removed_dates_notes: { "2019-07-04": "Independence Day" },
    removed_dates: ["2019-07-04"],
    name: "Weekday",
    id: "BUS319-O-Wdy-02",
    end_date: "2019-08-30",
    description: "Weekday schedule",
    added_dates_notes: {},
    added_dates: [],
    rating_start_date: "2019-06-25",
    rating_end_date: "2019-10-25",
    rating_description: "Test",
    "default_service?": true
  },
  {
    valid_days: [5],
    typicality: "typical_service",
    type: "weekday",
    start_date: "2019-07-05",
    removed_dates_notes: {},
    removed_dates: [],
    name: "Weekday",
    id: "BUS319-D-Wdy-02",
    end_date: "2019-08-30",
    description: "Weekday schedule",
    added_dates_notes: {},
    added_dates: [],
    rating_start_date: "2019-06-25",
    rating_end_date: "2019-10-25",
    rating_description: "Test",
    "default_service?": false
  },
  {
    valid_days: [6],
    typicality: "typical_service",
    type: "saturday",
    start_date: "2019-07-06",
    removed_dates_notes: {},
    removed_dates: [],
    name: "Saturday",
    id: "BUS319-P-Sa-02",
    end_date: "2019-08-31",
    description: "Saturday schedule",
    added_dates_notes: {},
    added_dates: [],
    rating_start_date: "2019-06-25",
    rating_end_date: "2019-10-25",
    rating_description: "Test",
    "default_service?": false
  },
  {
    valid_days: [7],
    typicality: "typical_service",
    type: "sunday",
    start_date: "2019-07-07",
    removed_dates_notes: {},
    removed_dates: [],
    name: "Sunday",
    id: "BUS319-Q-Su-02",
    end_date: "2019-08-25",
    description: "Sunday schedule",
    added_dates_notes: {},
    added_dates: [],
    rating_start_date: "2019-06-25",
    rating_end_date: "2019-10-25",
    rating_description: "Test",
    "default_service?": false
  },
  {
    valid_days: [],
    typicality: "holiday_service",
    type: "sunday",
    start_date: "2019-07-07",
    removed_dates_notes: {},
    removed_dates: [],
    name: "Sunday",
    id: "Bastille-Day",
    end_date: "2019-08-25",
    description: "Sunday schedule",
    added_dates_notes: { "2019-07-14": "Bastille Day" },
    added_dates: ["2019-07-14"],
    rating_start_date: "2019-06-25",
    rating_end_date: "2019-10-25",
    rating_description: "Test",
    "default_service?": false
  },
  {
    valid_days: [1, 2, 3, 4, 5],
    typicality: "unplanned_disruption",
    type: "weekday",
    start_date: "2019-07-15",
    removed_dates_notes: {},
    removed_dates: [],
    name: "Weekday",
    id: "BUS319-storm",
    end_date: "2019-07-15",
    description: "Storm (reduced service)",
    added_dates_notes: {},
    added_dates: [],
    rating_start_date: "2019-06-25",
    rating_end_date: "2019-10-25",
    rating_description: "Test",
    "default_service?": false
  },
  {
    valid_days: [1, 2, 3, 4, 5],
    typicality: "unplanned_disruption",
    type: "weekday",
    start_date: "2019-07-22",
    removed_dates_notes: {},
    removed_dates: [],
    name: "Weekday",
    id: "BUS319-storm-1",
    end_date: "2019-07-23",
    description: "Storm (reduced service)",
    added_dates_notes: {},
    added_dates: [],
    rating_start_date: "2019-06-25",
    rating_end_date: "2019-10-25",
    rating_description: "Test",
    "default_service?": false
  }
];

describe("DailySchedule", () => {
  it("should return null if there are no services available", () => {
    const tree = renderer.create(
      <dailyScheduleModule.DailySchedule
        selectedOrigin={"stopId"}
        services={[]}
        directionId={0}
        routePatterns={[]}
        routeId="111"
        today={"2019-08-31"}
      />
    );
    expect(tree.toJSON()).toEqual(null);
  });
  it("renders with a date", () => {
    createReactRoot();
    const tree = renderer.create(
      <dailyScheduleModule.DailySchedule
        selectedOrigin={"stopId"}
        services={services}
        directionId={0}
        routePatterns={[]}
        routeId="111"
        today={"2019-08-31"}
      />
    );
    expect(tree).toMatchSnapshot();
  });
  it("expands the holidays that come to it grouped", () => {
    const localServices = [
      makeSimpleService(
        ["2019-04-01", "2019-05-01"],
        ["2019-04-01", "2019-08-01"]
      ),
      makeSimpleService(
        ["2019-06-01", "2019-07-01"],
        ["2019-04-01", "2019-08-01"]
      ),
      makeSimpleService(
        ["2019-08-06", "2019-09-01"],
        ["2019-08-01", "2019-10-01"],
        "holiday_service",
        ["2019-08-21", "2019-08-25", "2019-08-30"],
        {
          "2019-08-21": "Test Holiday 1",
          "2019-08-25": "Test Holiday 2",
          "2019-08-30": "Test Holiday 3"
        }
      ),
      makeSimpleService(
        ["2019-09-02", "2019-11-30"],
        ["2019-09-01", "2019-12-01"],
        "holiday_service",
        ["2019-09-21", "2019-10-25"],
        { "2019-09-21": "Winter Holiday 1", "2019-10-25": "Winter Holiday 2" }
      )
    ] as ServiceInSelector[];

    render(
      <dailyScheduleModule.DailySchedule
        selectedOrigin="stopId"
        services={localServices}
        directionId={0}
        routePatterns={[]}
        routeId="111"
        today={"2019-08-31"}
      />
    );

    expect(screen.getByText("Test Holiday 2, Aug 25")).toBeInTheDocument();
    expect(
      screen.queryByText("Test Holiday 1, Aug 21, Test Holiday 2, Aug 25")
    ).toBeNull();
    expect(screen.getByText("Winter Holiday 1, Sep 21")).toBeInTheDocument();
    expect(
      screen.queryByText("Winter Holiday 1, Sep 21, Winter Holiday 2, Oct 25")
    ).toBeNull();
  });
  it("sorts the holidays by start date", () => {
    const localServices = [
      makeSimpleService(
        ["2019-09-02", "2019-11-30"],
        ["2019-09-01", "2019-12-01"],
        "holiday_service",
        ["2019-10-21", "2019-09-25"],
        { "2019-10-21": "Winter Holiday 1", "2019-09-25": "Winter Holiday 2" }
      )
    ] as ServiceInSelector[];

    render(
      <dailyScheduleModule.DailySchedule
        selectedOrigin="stopId"
        services={localServices}
        directionId={0}
        routePatterns={[]}
        routeId="111"
        today={"2019-08-31"}
      />
    );

    const firstElement = screen.getByText("Winter Holiday 2, Sep 25");
    const secondElement = screen.getByText("Winter Holiday 1, Oct 21");
    // second element follows the first
    expect(firstElement.compareDocumentPosition(secondElement)).toBe(4);
  });
});

describe("fetchJourneys", () => {
  it("returns a function that fetches the selected journey", () => {
    window.fetch = jest.fn();
    const service = services.find(service => service.id === "BUS319-P-Sa-02")!;

    const fetcher = dailyScheduleModule.fetchJourneys(
      "83",
      "stopId",
      service,
      1,
      true
    );

    expect(typeof fetcher).toBe("function");

    fetcher();

    expect(window.fetch).toHaveBeenCalledWith(
      "/schedules/finder_api/journeys?id=83&date=2019-08-31&direction=1&stop=stopId&is_current=true"
    );
  });

  it("fetches journeys again when selecting a different service", async () => {
    const fetchJourneysMock = jest.spyOn(dailyScheduleModule, "fetchJourneys");

    act(() => {
      const wrapper: ReactWrapper = mount(
        <dailyScheduleModule.DailySchedule
          selectedOrigin={"stopId"}
          services={services}
          directionId={0}
          routePatterns={[]}
          routeId="111"
          today={"2019-08-31"}
        />
      );

      // change value in the dropdown:
      wrapper
        .find("SchedulesSelect")
        // @ts-ignore -- types for `invoke` are too restrictive
        .invoke("onSelectService")("BUS319-P-Sa-02");

      expect(fetchJourneysMock).toHaveBeenCalledTimes(2);
      fetchJourneysMock.mockRestore();
    });
  });

  it("fetches 62,76, and 627 when route is 627", () => {
    window.fetch = jest.fn();
    const service = services.find(service => service.id === "BUS319-P-Sa-02")!;

    const fetcher = dailyScheduleModule.fetchJourneys(
      "627",
      "stopId",
      service,
      1,
      true
    );

    fetcher();

    expect(window.fetch).toHaveBeenCalledWith(
      "/schedules/finder_api/journeys?id=627,76,62&date=2019-08-31&direction=1&stop=stopId&is_current=true"
    );
  });
});

describe("getRepresentativeDate", () => {
  it("returns the service end date", () => {
    const service: Service = {
      added_dates: [],
      added_dates_notes: {},
      description: "",
      end_date: "2025-12-12",
      id: "test-service",
      removed_dates: [],
      removed_dates_notes: {},
      start_date: "2025-10-14",
      type: "weekday",
      typicality: "typical_service",
      valid_days: [5],
      name: "Test Service",
      rating_start_date: null,
      rating_end_date: null,
      rating_description: ""
    };

    expect(dailyScheduleModule.getRepresentativeDate(service)).toEqual(
      "2025-12-12"
    );
  });

  it("returns a specific non-Friday date for the FallWeekday service", () => {
    const service: Service = {
      added_dates: [],
      added_dates_notes: {},
      description: "",
      end_date: "2025-12-12",
      id: "FallWeekday",
      removed_dates: [],
      removed_dates_notes: {},
      start_date: "2025-10-14",
      type: "weekday",
      typicality: "typical_service",
      valid_days: [4, 5],
      name: "Test Service",
      rating_start_date: null,
      rating_end_date: null,
      rating_description: ""
    };

    expect(dailyScheduleModule.getRepresentativeDate(service)).toEqual(
      "2025-12-11"
    );
  });
});

describe("parseResults", () => {
  it("passes the results through", () => {
    const response = [
      {
        trip: {
          shape_id: "010070",
          route_pattern_id: "1-_-0",
          name: "",
          id: "45030860",
          headsign: "Harvard",
          direction_id: 0,
          "bikes_allowed?": true
        },
        route: {
          type: 3,
          sort_order: 50010,
          name: "1",
          long_name: "Harvard Square - Nubian Station",
          id: "1",
          direction_names: {
            "0": "Outbound",
            "1": "Inbound"
          },
          direction_destinations: {
            "0": "Harvard Square",
            "1": "Nubian Station"
          },
          description: "frequent_bus_route",
          color: "FFC72C"
        },
        departure: {
          time: "04:54 AM",
          schedule: {
            trip: {
              shape_id: "010070",
              route_pattern_id: "1-_-0",
              name: "",
              id: "45030860",
              headsign: "Harvard",
              direction_id: 0,
              "bikes_allowed?": true
            },
            time: "2020-08-14T04:54:00-04:00",
            stop_sequence: 19,
            stop: null,
            pickup_type: 0,
            "last_stop?": false,
            "flag?": false,
            "early_departure?": true
          },
          prediction: null
        }
      },
      {
        trip: {
          shape_id: "010070",
          route_pattern_id: "1-_-0",
          name: "",
          id: "45030861",
          headsign: "Harvard",
          direction_id: 0,
          "bikes_allowed?": true
        },
        route: {
          type: 3,
          sort_order: 50010,
          name: "1",
          long_name: "Harvard Square - Nubian Station",
          id: "1",
          direction_names: {
            "0": "Outbound",
            "1": "Inbound"
          },
          direction_destinations: {
            "0": "Harvard Square",
            "1": "Nubian Station"
          },
          description: "frequent_bus_route",
          color: "FFC72C"
        },
        departure: {
          time: "05:09 AM",
          schedule: {
            trip: {
              shape_id: "010070",
              route_pattern_id: "1-_-0",
              name: "",
              id: "45030861",
              headsign: "Harvard",
              direction_id: 0,
              "bikes_allowed?": true
            },
            time: "2020-08-14T05:09:00-04:00",
            stop_sequence: 19,
            stop: null,
            pickup_type: 0,
            "last_stop?": false,
            "flag?": false,
            "early_departure?": true
          },
          prediction: null
        }
      }
    ];

    expect(
      dailyScheduleModule.parseResults((response as unknown) as JSON)
    ).toEqual(response);
  });
});
