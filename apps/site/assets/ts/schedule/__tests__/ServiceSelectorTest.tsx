import React from "react";
import renderer from "react-test-renderer";
import { createReactRoot } from "../../app/helpers/testUtils";
import {
  fetchData as fetchSchedule,
  ServiceSelector
} from "../components/schedule-finder/ServiceSelector";
import { ServiceInSelector } from "../components/__schedule";

const services: ServiceInSelector[] = [
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
    added_dates: [],
    "default_service?": true
  },
  {
    valid_days: [5],
    typicality: "typical_service",
    type: "weekday",
    start_date: "2019-07-05",
    service_date: "2019-07-09",
    removed_dates_notes: {},
    removed_dates: [],
    name: "Weekday",
    id: "BUS319-D-Wdy-02",
    end_date: "2019-08-30",
    description: "Weekday schedule",
    added_dates_notes: {},
    added_dates: [],
    "default_service?": false
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
    added_dates: [],
    "default_service?": false
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
    added_dates: [],
    "default_service?": false
  },
  {
    valid_days: [],
    typicality: "holiday_service",
    type: "sunday",
    start_date: "2019-07-07",
    service_date: "2019-07-09",
    removed_dates_notes: {},
    removed_dates: [],
    name: "Sunday",
    id: "Bastille-Day",
    end_date: "2019-08-25",
    description: "Sunday schedule",
    added_dates_notes: { "2019-07-14": "Bastille Day" },
    added_dates: ["2019-07-14"],
    "default_service?": false
  },
  {
    valid_days: [1, 2, 3, 4, 5],
    typicality: "unplanned_disruption",
    type: "weekday",
    start_date: "2019-07-15",
    service_date: "2019-07-09",
    removed_dates_notes: {},
    removed_dates: [],
    name: "Weekday",
    id: "BUS319-storm",
    end_date: "2019-07-15",
    description: "Storm (reduced service)",
    added_dates_notes: {},
    added_dates: [],
    "default_service?": false
  }
];

describe("ServiceSelector", () => {
  it("it renders", () => {
    createReactRoot();
    const tree = renderer.create(
      <ServiceSelector
        stopId="stopId"
        services={services}
        ratingEndDate="2020-03-14"
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
        true,
        dispatchSpy
      );

      expect(window.fetch).toHaveBeenCalledWith(
        "/schedules/finder_api/journeys?id=83&date=2019-08-31&direction=1&stop=stopId&is_current=true"
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
      true,
      dispatchSpy
    );

    expect(dispatchSpy).toHaveBeenCalledTimes(2);
    expect(dispatchSpy).toHaveBeenCalledWith({ type: "FETCH_STARTED" });
    expect(dispatchSpy).toHaveBeenCalledWith({ type: "FETCH_ERROR" });
  });
});
