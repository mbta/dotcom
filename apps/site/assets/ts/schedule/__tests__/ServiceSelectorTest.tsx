import React from "react";
import renderer from "react-test-renderer";
import { createReactRoot } from "../../app/helpers/testUtils";
import serviceData from "./serviceData.json";
import {
  fetchSchedule,
  ServiceSelector
} from "../components/schedule-finder/ServiceSelector";
import { ServiceSchedule } from "../components/__schedule.js";
import { ServiceWithServiceDate } from "../../__v3api";

const services: ServiceWithServiceDate[] = [
  {
    valid_days: [1, 2, 3, 4],
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
    valid_days: [5],
    typicality: "typical_service",
    type: "weekday",
    start_date: "2019-07-08",
    service_date: "2019-07-16",
    removed_dates_notes: {},
    removed_dates: [],
    name: "Weekday (Friday)",
    id: "BUS319-I-Wdy-02",
    end_date: "2019-08-30",
    description: "Weekday (Friday) schedule",
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

const oldservices: ServiceWithServiceDate[] = [
  {
    valid_days: [1, 2, 3, 4],
    typicality: "typical_service",
    type: "weekday",
    start_date: "2019-07-03",
    service_date: "2019-07-10",
    removed_dates_notes: { "2019-07-04": "Independence Day" },
    removed_dates: ["2019-07-04"],
    name: "Weekday",
    id: "Weekday",
    end_date: "2019-08-30",
    description: "Weekday schedule",
    added_dates_notes: {},
    added_dates: []
  },
  {
    valid_days: [5],
    typicality: "typical_service",
    type: "weekday",
    start_date: "2019-07-03",
    service_date: "2019-07-10",
    removed_dates_notes: { "2019-07-04": "Independence Day" },
    removed_dates: ["2019-07-04"],
    name: "Weekday",
    id: "Weekday-F",
    end_date: "2019-08-30",
    description: "Weekday schedule",
    added_dates_notes: {},
    added_dates: []
  },
  {
    valid_days: [6],
    typicality: "typical_service",
    type: "saturday",
    start_date: "2019-07-06",
    service_date: "2019-07-10",
    removed_dates_notes: {},
    removed_dates: [],
    name: "Saturday",
    id: "Saturday",
    end_date: "2019-08-31",
    description: "Saturday schedule",
    added_dates_notes: {},
    added_dates: []
  },
  {
    valid_days: [7],
    typicality: "typical_service",
    type: "sunday",
    start_date: "2019-07-07",
    service_date: "2019-07-10",
    removed_dates_notes: {},
    removed_dates: [],
    name: "Sunday",
    id: "Sunday",
    end_date: "2019-08-25",
    description: "Sunday schedule",
    added_dates_notes: {},
    added_dates: []
  }
] as ServiceWithServiceDate[];

describe("ServiceSelector", () => {
  it("it renders", () => {
    createReactRoot();
    const tree = renderer.create(
      <ServiceSelector services={services} directionId={0} routeId={"111"} />
    );
    expect(tree).toMatchSnapshot();
  });

  describe("fetchSchedule", () => {
    it("fetches the selected schedule", async () => {
      window.fetch = jest.fn().mockImplementation(
        () =>
          new Promise((resolve: Function) =>
            resolve({
              json: () => {
                return {
                  by_trip: "by_trip_data",
                  trip_order: "trip_order_data"
                };
              },
              ok: true,
              status: 200,
              statusText: "OK"
            })
          )
      );

      var loadingSpy = jest.fn();
      var serviceScheduleSpy = jest.fn();

      await await fetchSchedule(
        services,
        "BUS319-P-Sa-02",
        "83",
        1,
        loadingSpy,
        serviceScheduleSpy
      );

      expect(window.fetch).toHaveBeenCalledWith(
        "/schedules/schedule_api?id=83&date=2019-08-31&direction_id=1"
      );

      expect(loadingSpy).toHaveBeenCalledTimes(2);
      expect(loadingSpy).toHaveBeenCalledWith(true);
      expect(loadingSpy).toHaveBeenLastCalledWith(false);

      expect(serviceScheduleSpy).toHaveBeenCalledTimes(1);
      expect(serviceScheduleSpy).toHaveBeenCalledWith({
        by_trip: "by_trip_data",
        trip_order: "trip_order_data"
      });
    }),
      it("fails quietly if called with an invalid service ID", () => {
        window.fetch = jest.fn();
        var loadingSpy = jest.fn();
        var serviceScheduleSpy = jest.fn();

        fetchSchedule(
          services,
          "BAD-SERVICE-ID",
          "83",
          1,
          loadingSpy,
          serviceScheduleSpy
        );
        expect(window.fetch).not.toHaveBeenCalled();
      }),
      it("throws an error if the fetch fails", async () => {
        window.fetch = jest.fn().mockImplementation(
          () =>
            new Promise((resolve: Function) =>
              resolve({
                ok: false,
                status: 500,
                statusText: "you broke it"
              })
            )
        );

        var loadingSpy = jest.fn();
        var serviceScheduleSpy = jest.fn();

        await fetchSchedule(
          services,
          "BUS319-P-Sa-02",
          "83",
          1,
          loadingSpy,
          serviceScheduleSpy
        );

        expect(loadingSpy).toHaveBeenCalledTimes(2);
        expect(loadingSpy).toHaveBeenCalledWith(true);
        expect(loadingSpy).toHaveBeenLastCalledWith(false);

        expect(serviceScheduleSpy).not.toHaveBeenCalled();
      });
  });
});
