import React from "react";
import { mount } from "enzyme";
import {
  RouteType,
  ServiceType,
  ServiceTypicality
} from "../../../../../__v3api";
import { ServiceInSelector } from "../../../__schedule";
import DailyScheduleSubway from "../DailyScheduleSubway";
import * as hours from "../../../../../hooks/useHoursOfOperation";
import { createReactRoot } from "../../../../../app/helpers/testUtils";
import { render, screen } from "@testing-library/react";
import * as useStop from "../../../../../hooks/useStop";
import { FetchStatus } from "../../../../../helpers/use-fetch";

describe("DailyScheduleSubway", () => {
  beforeEach(() => {
    createReactRoot();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const services = [
    {
      added_dates: ["2022-12-27"],
      added_dates_notes: { "2022-12-27": "" },
      description: "descr",
      end_date: "2022-12-31",
      id: "1",
      removed_dates: [],
      removed_dates_notes: {},
      start_date: "2022-12-01",
      type: "weekday" as ServiceType,
      typicality: "typical_service" as ServiceTypicality,
      valid_days: [],
      name: "name",
      rating_start_date: null,
      rating_end_date: null,
      rating_description: "descr",
      "default_service?": false
    }
  ];

  const stopMap = {
    "0": [
      {
        id: "1",
        name: "Stop 1",
        is_closed: false,
        zone: null
      }
    ],
    "1": [
      {
        id: "2",
        name: "Stop 2",
        is_closed: false,
        zone: null
      }
    ]
  };

  const route = {
    description: "Route 1",
    direction_destinations: {
      0: "Heathrow",
      1: null
    },
    direction_names: {
      0: null,
      1: null
    },
    id: "1",
    long_name: "Route 1",
    name: "Route 1",
    type: 0 as RouteType,
    line_id: null
  };

  it("should render", () => {
    const wrapper = mount(
      <DailyScheduleSubway
        directionId={0}
        stops={stopMap}
        stopId={"1"}
        routeId={"blue"}
        route={route}
        scheduleNote={null}
        today={"2022-11-30T13:45:00-05:00"}
        services={services}
      />
    );

    expect(wrapper.html()).toContain("Daily Schedule");
  });

  it("should mark Saturday as (Today) on a Saturday", () => {
    const wrapper = mount(
      <DailyScheduleSubway
        directionId={0}
        stops={stopMap}
        stopId={"1"}
        routeId={"blue"}
        route={route}
        scheduleNote={null}
        today={"2022-11-26T13:45:00-05:00"}
        services={services}
      />
    );

    expect(wrapper.html()).toContain("Saturday (Today)");
  });

  it("should mark Sunday as (Today) on a Sunday", () => {
    const wrapper = mount(
      <DailyScheduleSubway
        directionId={0}
        stops={stopMap}
        stopId={"1"}
        routeId={"blue"}
        route={route}
        scheduleNote={null}
        today={"2022-11-27T13:45:00-05:00"}
        services={services}
      />
    );

    expect(wrapper.html()).toContain("Sunday (Today)");
  });

  it("should mark Weekday as (Today) on a Weekday", () => {
    const wrapper = mount(
      <DailyScheduleSubway
        directionId={0}
        stops={stopMap}
        stopId={"1"}
        routeId={"blue"}
        route={route}
        scheduleNote={null}
        today={"2022-11-28T13:45:00-05:00"}
        services={services}
      />
    );

    expect(wrapper.html()).toContain("Weekday (Today)");
  });

  it("should display the first and last train times", () => {
    jest.spyOn(hours, "useHoursOfOperationByStop").mockImplementation(() => {
      return {
        week: [
          [
            {
              stop_name: "Stop 1",
              stop_id: "123",
              parent_stop_id: "543",
              last_departure: "2022-11-28T22:58:00-05:00",
              first_departure: "2022-11-28T05:58:00-05:00",
              is_terminus: false
            }
          ],
          []
        ],
        saturday: [[], []],
        sunday: [[], []],
        special_service: {}
      };
    });
    const wrapper = mount(
      <DailyScheduleSubway
        directionId={0}
        stops={stopMap}
        stopId={"543"}
        routeId={"blue"}
        route={route}
        scheduleNote={null}
        today={"2022-11-28T13:45:00-05:00"}
        services={services}
      />
    );

    expect(wrapper.html()).toContain("5:58 AM");
    expect(wrapper.html()).toContain("10:58 PM");
  });

  it("should change the first and last train times when the drop down is changed", () => {
    jest.spyOn(hours, "useHoursOfOperationByStop").mockImplementation(() => {
      return {
        week: [
          [
            {
              stop_name: "Stop 1",
              stop_id: "123",
              parent_stop_id: "543",
              last_departure: "2022-11-28T22:58:00-05:00",
              first_departure: "2022-11-28T05:58:00-05:00",
              is_terminus: false
            }
          ],
          []
        ],
        saturday: [
          [
            {
              stop_name: "Stop 1",
              stop_id: "123",
              parent_stop_id: "543",
              last_departure: "2022-11-28T20:37:00-05:00",
              first_departure: "2022-11-28T09:16:00-05:00",
              is_terminus: false
            }
          ],
          []
        ],
        sunday: [[], []],
        special_service: {}
      };
    });
    const wrapper = mount(
      <DailyScheduleSubway
        directionId={0}
        stops={stopMap}
        stopId={"543"}
        routeId={"blue"}
        route={route}
        scheduleNote={null}
        today={"2022-11-28T13:45:00-05:00"}
        services={services}
      />
    );

    expect(wrapper.html()).toContain("5:58 AM");
    expect(wrapper.html()).toContain("10:58 PM");

    wrapper
      .find("select")
      .simulate("change", { target: { value: "saturday" } });

    expect(wrapper.html()).toContain("9:16 AM");
    expect(wrapper.html()).toContain("8:37 PM");
  });

  it("should still render if there are no hours", () => {
    jest.spyOn(hours, "default").mockImplementation(() => {
      return null;
    });

    const wrapper = mount(
      <DailyScheduleSubway
        directionId={0}
        stops={stopMap}
        stopId={"1"}
        routeId={"blue"}
        route={route}
        scheduleNote={null}
        today={"2022-11-30T13:45:00-05:00"}
        services={services}
      />
    );

    expect(wrapper.html()).toContain("Daily Schedule");
  });

  it("should display the special services in the drop down", () => {
    const specialServices = [
      {
        added_dates: ["2022-12-27"],
        added_dates_notes: { "2022-12-27": "" },
        description: "descr",
        end_date: "2022-12-31",
        id: "1",
        removed_dates: [],
        removed_dates_notes: {},
        start_date: "2022-12-01",
        type: "weekday" as ServiceType,
        typicality: "typical_service" as ServiceTypicality,
        valid_days: [],
        name: "name",
        rating_start_date: null,
        rating_end_date: null,
        rating_description: "descr",
        "default_service?": false
      },
      {
        added_dates: ["2022-12-26", "2022-12-28"],
        added_dates_notes: { "2022-12-26": "Holiday 1", "2022-12-28": null },
        description: "descr",
        end_date: "2022-12-31",
        id: "1",
        removed_dates: [],
        removed_dates_notes: {},
        start_date: "2022-12-01",
        type: "weekday" as ServiceType,
        typicality: "holiday_service" as ServiceTypicality,
        valid_days: [],
        name: "name",
        rating_start_date: null,
        rating_end_date: null,
        rating_description: "descr",
        "default_service?": false
      }
    ] as ServiceInSelector[];
    const wrapper = mount(
      <DailyScheduleSubway
        directionId={0}
        stops={stopMap}
        stopId={"1"}
        routeId={"blue"}
        route={route}
        scheduleNote={null}
        today={"2022-11-30T13:45:00-05:00"}
        services={specialServices}
      />
    );

    expect(wrapper.html()).toContain("Special Service");
    expect(wrapper.html()).toContain("Holiday 1, Dec 26");
    expect(wrapper.html()).toContain("name, Dec 28");
  });
  it("should set special service date as today if date is today", () => {
    const specialServices = [
      {
        added_dates: ["2022-12-27"],
        added_dates_notes: { "2022-12-27": "" },
        description: "descr",
        end_date: "2022-12-31",
        id: "1",
        removed_dates: [],
        removed_dates_notes: {},
        start_date: "2022-12-01",
        type: "weekday" as ServiceType,
        typicality: "typical_service" as ServiceTypicality,
        valid_days: [],
        name: "name",
        rating_start_date: null,
        rating_end_date: null,
        rating_description: "descr",
        "default_service?": false
      },
      {
        added_dates: ["2022-12-26"],
        added_dates_notes: { "2022-12-26": "Holiday 1" },
        description: "descr",
        end_date: "2022-12-31",
        id: "1",
        removed_dates: [],
        removed_dates_notes: {},
        start_date: "2022-12-01",
        type: "weekday" as ServiceType,
        typicality: "holiday_service" as ServiceTypicality,
        valid_days: [],
        name: "name",
        rating_start_date: null,
        rating_end_date: null,
        rating_description: "descr",
        "default_service?": false
      }
    ] as ServiceInSelector[];
    const wrapper = mount(
      <DailyScheduleSubway
        directionId={0}
        stops={stopMap}
        stopId={"1"}
        routeId={"blue"}
        route={route}
        scheduleNote={null}
        today={"2022-12-26T13:45:00-05:00"}
        services={specialServices}
      />
    );

    expect(wrapper.html()).toContain("Special Service");
    expect(wrapper.html()).toContain("Holiday 1, Dec 26 (Today)");
  });

  it("should show different hours based on direction", () => {
    jest.spyOn(hours, "useHoursOfOperationByStop").mockImplementation(() => {
      return {
        week: [
          [
            {
              stop_name: "Stop 1",
              stop_id: "123",
              parent_stop_id: "543",
              last_departure: "2022-11-28T22:58:00-05:00",
              first_departure: "2022-11-28T05:58:00-05:00",
              is_terminus: false
            }
          ],
          [
            {
              stop_name: "Stop 1",
              stop_id: "123",
              parent_stop_id: "543",
              last_departure: "2022-11-28T20:34:00-05:00",
              first_departure: "2022-11-28T08:22:00-05:00",
              is_terminus: false
            }
          ]
        ],
        saturday: [[], []],
        sunday: [[], []],
        special_service: {}
      };
    });

    render(
      <DailyScheduleSubway
        directionId={0}
        stops={stopMap}
        stopId={"543"}
        routeId={"blue"}
        route={route}
        scheduleNote={null}
        today="2022-11-28T14:14:14-05:00"
        services={services}
      />
    );

    expect(screen.getByText("5:58 AM"));
    expect(screen.getByText("10:58 PM"));

    render(
      <DailyScheduleSubway
        directionId={1}
        stops={stopMap}
        stopId={"543"}
        routeId={"blue"}
        route={route}
        scheduleNote={null}
        today="2022-11-28T14:14:14-05:00"
        services={services}
      />
    );

    expect(screen.getByText("8:22 AM"));
    expect(screen.getByText("8:34 PM"));
  });
});
