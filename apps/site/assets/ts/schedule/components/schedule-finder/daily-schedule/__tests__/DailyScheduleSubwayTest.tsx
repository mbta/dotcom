import React from "react";
import { mount } from "enzyme";
import { RouteType } from "../../../../../__v3api";
import DailyScheduleSubway from "../DailyScheduleSubway";
import * as hours from "../../../../../hooks/useHoursOfOperation";
import { createReactRoot } from "../../../../../app/helpers/testUtils";

describe("DailyScheduleSubway", () => {
  beforeEach(() => {
    createReactRoot();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const stopMap = {
    "0": [
      {
        id: "1",
        name: "Stop 1",
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
    type: 0 as RouteType
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
      />
    );

    expect(wrapper.html()).toContain("Weekday (Today)");
  });

  it("should display the first and last train times", () => {
    jest.spyOn(hours, "default").mockImplementation(() => {
      return {
        week: [
          [
            {
              stop_name: "Stop 1",
              stop_id: "123",
              parent_stop_id: "543",
              last_departure: "2022-11-28T22:58:00-05:00",
              first_departure: "2022-11-28T05:58:00-05:00",
              is_terminus: false,
              latitude: 1,
              longitude: 1
            }
          ],
          []
        ],
        saturday: [[], []],
        sunday: [[], []]
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
      />
    );

    expect(wrapper.html()).toContain("5:58 AM");
    expect(wrapper.html()).toContain("10:58 PM");
  });

  it("should change the first and last train times when the drop down is changed", () => {
    jest.spyOn(hours, "default").mockImplementation(() => {
      return {
        week: [
          [
            {
              stop_name: "Stop 1",
              stop_id: "123",
              parent_stop_id: "543",
              last_departure: "2022-11-28T22:58:00-05:00",
              first_departure: "2022-11-28T05:58:00-05:00",
              is_terminus: false,
              latitude: 1,
              longitude: 1
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
              is_terminus: false,
              latitude: 1,
              longitude: 1
            }
          ],
          []
        ],
        sunday: [[], []]
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
      />
    );

    expect(wrapper.html()).toContain("Daily Schedule");
  });

  it("should link to plan your trip pre-populated", () => {
    jest.spyOn(hours, "default").mockImplementation(() => {
      return {
        week: [
          [
            {
              stop_name: "Stop 1",
              stop_id: "123",
              parent_stop_id: "543",
              last_departure: "2022-11-28T22:58:00-05:00",
              first_departure: "2022-11-28T05:58:00-05:00",
              is_terminus: false,
              latitude: 15,
              longitude: -25
            }
          ],
          []
        ],
        saturday: [[], []],
        sunday: [[], []]
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
        today={"2022-11-30T13:45:00-05:00"}
      />
    );

    expect(wrapper.html()).toContain("/trip-planner/from/15,-25");
  });

  it("should link to plan your trip not populated", () => {
    const wrapper = mount(
      <DailyScheduleSubway
        directionId={0}
        stops={stopMap}
        stopId={"1"}
        routeId={"blue"}
        route={route}
        scheduleNote={null}
        today={"2022-11-30T13:45:00-05:00"}
      />
    );

    expect(wrapper.html()).toContain('/trip-planner/from/"');
  });

  it("displays the correct stop name, and heading", () => {
    const wrapper = mount(
      <DailyScheduleSubway
        directionId={0}
        stops={stopMap}
        stopId={"1"}
        routeId={"blue"}
        route={route}
        scheduleNote={null}
        today={"2022-11-30T13:45:00-05:00"}
      />
    );

    expect(wrapper.html()).toContain("Stop 1");
    expect(wrapper.html()).toContain("Heathrow");
  });
});
