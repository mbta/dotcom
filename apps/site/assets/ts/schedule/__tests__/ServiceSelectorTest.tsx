import React from "react";
import renderer from "react-test-renderer";
import { createReactRoot } from "../../app/helpers/testUtils";
import {
  fetchData as fetchSchedule,
  ServiceSelector,
  getDefaultScheduleId
} from "../components/schedule-finder/ServiceSelector";
import { ServiceWithServiceDate } from "../../__v3api";
import { ServiceOptGroup } from "../../helpers/service";

const services: ServiceWithServiceDate[] = [
  {
    valid_days: [1, 2, 3, 4, 5],
    typicality: "typical_service",
    type: "weekday",
    start_date: "2019-07-02",
    service_date: "2019-07-09",
    removed_dates_notes: { "2019-07-04": "Independence Day" },
    removed_dates: ["2019-07-04"],
    name: "Weekday",
    id: "BUS319-O-Wdy-02",
    end_date: "2019-08-30",
    description: "Weekday schedule",
    added_dates_notes: {},
    added_dates: []
  },
  {
    valid_days: [5],
    typicality: "typical_service",
    type: "weekday",
    start_date: "2019-07-05",
    service_date: "2019-07-09",
    name: "Weekday",
    id: "BUS319-D-Wdy-02",
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
    service_date: "2019-07-09",
    removed_dates_notes: {},
    removed_dates: [],
    name: "Saturday",
    id: "BUS319-P-Sa-02",
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
    service_date: "2019-07-09",
    removed_dates_notes: {},
    removed_dates: [],
    name: "Sunday",
    id: "BUS319-Q-Su-02",
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
      <ServiceSelector
        stopId="stopId"
        services={services}
        directionId={0}
        routePatterns={[]}
        routeId="111"
      />
    );
    expect(tree).toMatchSnapshot();
  });

  describe("fetchSchedule", () => {
    it("fetches the selected schedule", async () => {
      window.fetch = jest.fn().mockImplementation(
        () =>
          new Promise((resolve: Function) =>
            resolve({
              json: () => ({
                by_trip: "by_trip_data",
                trip_order: "trip_order_data"
              }),
              ok: true,
              status: 200,
              statusText: "OK"
            })
          )
      );

      const dispatchSpy = jest.fn();

      await await fetchSchedule(
        "83",
        "stopId",
        services.find(service => service.id === "BUS319-P-Sa-02")!,
        1,
        dispatchSpy
      );

      expect(window.fetch).toHaveBeenCalledWith(
        "/schedules/schedule_api?id=83&date=2019-08-31&direction_id=1&stop_id=stopId"
      );

      expect(dispatchSpy).toHaveBeenCalledTimes(2);
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: "FETCH_STARTED"
      });
      expect(dispatchSpy).toHaveBeenCalledWith({
        payload: { by_trip: "by_trip_data", trip_order: "trip_order_data" },
        type: "FETCH_COMPLETE"
      });
    });
  });

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

    const dispatchSpy = jest.fn();

    await await fetchSchedule(
      "83",
      "stopId",
      services.find(service => service.id === "BUS319-P-Sa-02")!,
      1,
      dispatchSpy
    );

    expect(dispatchSpy).toHaveBeenCalledTimes(2);
    expect(dispatchSpy).toHaveBeenCalledWith({ type: "FETCH_STARTED" });
    expect(dispatchSpy).toHaveBeenCalledWith({ type: "FETCH_ERROR" });
  });

  describe("getDefaultScheduleId", () => {
    const servicesByOptGroup = {
      current: [
        {
          type: "current" as ServiceOptGroup,
          servicePeriod: "sometime",
          service: services[0]
        }
      ],
      future: [
        {
          type: "future" as ServiceOptGroup,
          servicePeriod: "sometime",
          service: services[1]
        },
        {
          type: "future" as ServiceOptGroup,
          servicePeriod: "sometime",
          service: services[2]
        }
      ],
      holiday: [
        {
          type: "holiday" as ServiceOptGroup,
          servicePeriod: "sometime",
          service: services[3]
        }
      ]
    };

    it("uses today's schedule if given", () => {
      expect(getDefaultScheduleId(servicesByOptGroup)).toEqual(services[0].id);
    });

    it("uses the first upcoming schedule if no schedule for today", () => {
      const defaultScheduleId = getDefaultScheduleId({
        ...servicesByOptGroup,
        current: []
      });
      expect(defaultScheduleId).toEqual(services[1].id);
    });

    it("uses the first holiday schedule if no schedule for today or upcoming", () => {
      const defaultScheduleId = getDefaultScheduleId({
        ...servicesByOptGroup,
        current: [],
        future: []
      });
      expect(defaultScheduleId).toEqual(services[3].id);
    });
  });
});
