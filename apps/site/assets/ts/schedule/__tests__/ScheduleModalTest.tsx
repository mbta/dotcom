import React from "react";
import renderer, { act } from "react-test-renderer";
import {
  EnhancedRoute,
  RouteType,
  ServiceWithServiceDate
} from "../../__v3api";
import ScheduleModalContent, {
  reducer,
  fetchData
} from "../components/schedule-finder/ScheduleModalContent";
import { SimpleStop } from "../components/__schedule";

const route: EnhancedRoute = {
  alert_count: 0,
  description: "",
  direction_destinations: { 0: "Oak Grove", 1: "Forest Hills" },
  direction_names: { 0: "Inbound", 1: "Outbound" },
  header: "",
  id: "Orange",
  name: "Orange",
  long_name: "Orange Line",
  type: 1
};

const stops: SimpleStop[] = [
  { name: "Malden Center", id: "place-mlmnl", is_closed: false, zone: "1" },
  { name: "Wellington", id: "place-welln", is_closed: false, zone: "2" }
];

const routeType: RouteType = 3;
export const payload = [
  {
    train_number: "",
    route: {
      type: routeType,
      name: "1",
      long_name: "Harvard - Dudley via Massachusetts Avenue",
      id: "1",
      direction_names: { "1": "Inbound", "0": "Outbound" },
      direction_destinations: { "1": "Dudley", "0": "Harvard" },
      description: "key_bus_route",
      "custom_route?": false
    },
    prediction: {
      scheduled_time: ["3:44", " ", "PM"],
      prediction: {
        track: null,
        time: ["15", " ", "min"],
        status: null,
        seconds: 905
      },
      delay: 9
    },
    headsign: "Harvard"
  },
  {
    train_number: "",
    route: {
      type: routeType,
      name: "1",
      long_name: "Harvard - Dudley via Massachusetts Avenue",
      id: "1",
      direction_names: { "1": "Inbound", "0": "Outbound" },
      direction_destinations: { "1": "Dudley", "0": "Harvard" },
      description: "key_bus_route",
      "custom_route?": false
    },
    prediction: {
      scheduled_time: ["3:54", " ", "PM"],
      prediction: {
        track: null,
        time: ["11", " ", "min"],
        status: null,
        seconds: 707
      },
      delay: -4
    },
    headsign: "Harvard"
  }
];

const service: ServiceWithServiceDate = {
  added_dates: [],
  added_dates_notes: {},
  description: "Weekday schedule",
  end_date: "2019-08-25",
  id: "BUS319-D-Wdy-02",
  removed_dates: [],
  removed_dates_notes: {},
  start_date: "2019-06-25",
  type: "weekday",
  typicality: "typical_service",
  valid_days: [1, 2, 3, 4, 5],
  service_date: "2019-06-26"
};

const holidayService: ServiceWithServiceDate = {
  ...service,
  id: "2",
  typicality: "holiday_service",
  description: "Holiday schedule",
  valid_days: [3],
  end_date: "2019-06-25"
};

const upcomingService: ServiceWithServiceDate = {
  ...service,
  id: "3",
  valid_days: [4, 5],
  start_date: "2019-07-05"
};

const upcomingServiceTwo: ServiceWithServiceDate = {
  ...service,
  id: "4",
  valid_days: [1, 2, 3],
  start_date: "2019-07-05"
};

describe("ScheduleModal", () => {
  it("it renders", () => {
    let tree;
    act(() => {
      tree = renderer.create(
        <ScheduleModalContent
          route={route}
          stops={stops}
          selectedOrigin={stops[0].id}
          selectedDirection={0}
          services={[
            service,
            holidayService,
            upcomingService,
            upcomingServiceTwo
          ]}
        />
      );
    });

    expect(tree).toMatchSnapshot();
  });

  it("it doesn't render if selectedOrigin is null", () => {
    let tree;
    act(() => {
      tree = renderer.create(
        <ScheduleModalContent
          route={route}
          stops={stops}
          selectedOrigin={null}
          selectedDirection={0}
          services={[service]}
        />
      );
      expect(tree!.toJSON()).toBeNull();
    });
  });

  it("it doesn't render if selectedDirection is null", () => {
    let tree;
    act(() => {
      tree = renderer.create(
        <ScheduleModalContent
          route={route}
          stops={stops}
          selectedOrigin={stops[0].id}
          selectedDirection={null}
          services={[service]}
        />
      );
      expect(tree!.toJSON()).toBeNull();
    });
  });

  describe("fetchData", () => {
    it("fetches data", () => {
      const spy = jest.fn();
      window.fetch = jest.fn().mockImplementation(
        () =>
          new Promise((resolve: Function) =>
            resolve({
              json: () => payload,
              ok: true,
              status: 200,
              statusText: "OK"
            })
          )
      );

      return fetchData("1", "99", 0, spy).then(() => {
        expect(window.fetch).toHaveBeenCalledWith(
          "/schedules/predictions_api?id=1&origin_stop=99&direction_id=0"
        );
        expect(spy).toHaveBeenCalledWith({
          type: "FETCH_STARTED"
        });
        expect(spy).toHaveBeenCalledWith({
          type: "FETCH_COMPLETE",
          payload
        });
      });
    });

    it("fails gracefully if fetch is unsuccessful", () => {
      const spy = jest.fn();
      window.fetch = jest.fn().mockImplementation(
        () =>
          new Promise((resolve: Function) =>
            resolve({
              json: () => "Internal Server Error",
              ok: false,
              status: 500,
              statusText: "INTERNAL SERVER ERROR"
            })
          )
      );

      return fetchData(route.id, stops[0].id, 0, spy).then(() => {
        expect(window.fetch).toHaveBeenCalledWith(
          "/schedules/predictions_api?id=Orange&origin_stop=place-mlmnl&direction_id=0"
        );
        expect(spy).toHaveBeenCalledWith({
          type: "FETCH_STARTED"
        });
        expect(spy).toHaveBeenCalledWith({
          type: "FETCH_ERROR"
        });
      });
    });
  });

  describe("reducer", () => {
    it("handles a fetch complete action", () => {
      const newState = reducer(
        { error: false, isLoading: true, data: null },
        { type: "FETCH_COMPLETE", payload: [] }
      );
      expect(newState).toEqual({ data: [], isLoading: false, error: false });
    });

    it("handles a fetch error action", () => {
      const newState = reducer(
        { error: false, isLoading: true, data: null },
        { type: "FETCH_ERROR" }
      );
      expect(newState).toEqual({ data: null, isLoading: false, error: true });
    });

    it("handles an unknown action", () => {
      const newState = reducer(
        { error: false, isLoading: true, data: null },
        // @ts-ignore
        { type: "UNKNOWN" }
      );
      expect(newState).toEqual({ data: null, isLoading: true, error: false });
    });
  });
});
