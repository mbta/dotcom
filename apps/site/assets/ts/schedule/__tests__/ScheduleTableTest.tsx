import React from "react";
import serviceData from "./serviceData.json";
import crServiceData from "./crServiceData.json";
import ScheduleTable from "../components/schedule-finder/ScheduleTable";
import { ServiceSchedule } from "../components/__schedule.js";
import { ServiceWithServiceDate } from "../../__v3api";
import { mount } from "enzyme";
import {
  createReactRoot,
  enzymeToJsonWithoutProps
} from "../../app/helpers/testUtils";

const services: ServiceWithServiceDate[] = [
  {
    valid_days: [1, 2, 3, 4, 5],
    typicality: "typical_service",
    type: "weekday",
    start_date: "2019-07-08",
    service_date: "2019-07-16",
    removed_dates_notes: {},
    removed_dates: [],
    name: "Weekday",
    id: "BUS319-J-Wdy-02",
    end_date: "2019-08-30",
    description: "Weekday schedule",
    added_dates_notes: {},
    added_dates: []
  },
  {
    valid_days: [6],
    typicality: "typical_service",
    type: "saturday",
    start_date: "2019-07-13",
    service_date: "2019-07-16",
    removed_dates_notes: {},
    removed_dates: [],
    name: "Saturday",
    id: "BUS319-K-Sa-02",
    end_date: "2019-08-31",
    description: "Saturday schedule",
    added_dates_notes: {},
    added_dates: []
  },
  {
    valid_days: [7],
    typicality: "typical_service",
    type: "sunday",
    start_date: "2019-07-14",
    service_date: "2019-07-16",
    removed_dates_notes: {},
    removed_dates: [],
    name: "Sunday",
    id: "BUS319-L-Su-02",
    end_date: "2019-08-25",
    description: "Sunday schedule",
    added_dates_notes: {},
    added_dates: []
  }
];

const serviceSchedules: ServiceSchedule = (serviceData as unknown) as ServiceSchedule;

const crServices: ServiceWithServiceDate[] = [
  {
    valid_days: [1, 2, 3, 4, 5],
    typicality: "typical_service",
    type: "weekday",
    start_date: "2019-07-08",
    service_date: "2019-07-16",
    removed_dates_notes: {},
    removed_dates: [],
    name: "Weekday",
    id: "CR-Wdy-Kingston-Spr-19",
    end_date: "2019-08-30",
    description: "Weekday schedule",
    added_dates_notes: {},
    added_dates: []
  },
  {
    valid_days: [6],
    typicality: "typical_service",
    type: "saturday",
    start_date: "2019-07-13",
    service_date: "2019-07-16",
    removed_dates_notes: {},
    removed_dates: [],
    name: "Saturday",
    id: "CR-Sa-Kingston-Spr-19",
    end_date: "2019-08-31",
    description: "Saturday schedule",
    added_dates_notes: {},
    added_dates: []
  },
  {
    valid_days: [7],
    typicality: "typical_service",
    type: "sunday",
    start_date: "2019-07-14",
    service_date: "2019-07-16",
    removed_dates_notes: {},
    removed_dates: [],
    name: "Sunday",
    id: "CR-Su-Kingston-Spr-19",
    end_date: "2019-08-25",
    description: "Sunday schedule",
    added_dates_notes: {},
    added_dates: []
  }
];

const crServiceSchedules: ServiceSchedule = crServiceData as ServiceSchedule;

describe("ScheduleTable", () => {
  it("it renders", () => {
    createReactRoot();
    const wrapper = mount(
      <ScheduleTable schedule={serviceSchedules[`${services[0].id}-0`]} />
    );
    wrapper
      .find(".schedule-table__row")
      .first()
      .simulate("click");
    expect(enzymeToJsonWithoutProps(wrapper)).toMatchSnapshot();
  });

  it("it renders an empty message", () => {
    createReactRoot();
    const wrapper = mount(
      <ScheduleTable schedule={{ by_trip: {}, trip_order: [] }} />
    );
    expect(enzymeToJsonWithoutProps(wrapper)).toMatchSnapshot();
  });

  it("it renders CR schedules", () => {
    createReactRoot();
    const wrapper = mount(
      <ScheduleTable schedule={crServiceSchedules[`${crServices[0].id}-0`]} />
    );
    wrapper
      .find(".schedule-table__row")
      .first()
      .simulate("click");
    expect(enzymeToJsonWithoutProps(wrapper)).toMatchSnapshot();
  });
});
