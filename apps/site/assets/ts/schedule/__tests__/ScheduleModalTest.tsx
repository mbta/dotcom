import React from "react";
import ReactDOM from "react-dom";
import renderer, { act } from "react-test-renderer";
import { createReactRoot } from "../../app/helpers/testUtils";
import { EnhancedRoute, RouteType, Service } from "../../__v3api";
import ScheduleModalContent, {
  reducer,
  fetchData
} from "../components/schedule-finder/ScheduleModalContent";
import UpcomingDepartures from "../components/schedule-finder/UpcomingDepartures";
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
const payload = [
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

const service: Service = {
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
  valid_days: [1, 2, 3, 4, 5]
};

describe("ScheduleModal", () => {
  it("it renders", () => {
    let tree;
    let resolve: Function = () => {};
    act(() => {
      tree = renderer.create(
        <ScheduleModalContent
          route={route}
          stops={stops}
          selectedOrigin={stops[0].id}
          selectedDirection={0}
          services={[service]}
        />
      );
    });

    expect(tree).toMatchSnapshot();
  });

  it("it doesn't render if selectedOrigin is null", () => {
    let tree;
    let resolve: Function = () => {};
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
    let resolve: Function = () => {};
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

const stopPrediction = payload;

const crRouteType: RouteType = 2;

// This payload from Phoenix would currently only be 2 predictions but adding 3
// for test coverage simplicity
const crPrediction = [
  {
    train_number: "",
    route: {
      type: crRouteType,
      name: "Framingham/Worcester Line",
      long_name: "Framingham/Worcester Line",
      id: "CR-Worcester",
      direction_names: { "1": "Inbound", "0": "Outbound" },
      direction_destinations: { "1": "South Station", "0": "Worcester" },
      description: "commuter_rail",
      "custom_route?": false
    },
    prediction: {
      scheduled_time: ["4:51", " ", "PM"],
      prediction: {
        track: null,
        time: ["4:51", " ", "PM"],
        status: null,
        seconds: 1854
      },
      delay: 0
    },
    headsign: "Framingham"
  },
  {
    train_number: "591",
    route: {
      type: crRouteType,
      name: "Framingham/Worcester Line",
      long_name: "Framingham/Worcester Line",
      id: "CR-Worcester",
      direction_names: { "1": "Inbound", "0": "Outbound" },
      direction_destinations: { "1": "South Station", "0": "Worcester" },
      description: "commuter_rail",
      "custom_route?": false
    },
    prediction: {
      scheduled_time: ["4:51", " ", "PM"],
      prediction: {
        track: "3",
        time: ["4:51", " ", "PM"],
        status: null,
        seconds: 1854
      },
      delay: 0
    },
    headsign: "Framingham"
  },
  {
    train_number: "591",
    route: {
      type: crRouteType,
      name: "Framingham/Worcester Line",
      long_name: "Framingham/Worcester Line",
      id: "CR-Worcester",
      direction_names: { "1": "Inbound", "0": "Outbound" },
      direction_destinations: { "1": "South Station", "0": "Worcester" },
      description: "commuter_rail",
      "custom_route?": false
    },
    prediction: {
      scheduled_time: ["4:51", " ", "PM"],
      prediction: {
        track: "3",
        time: ["4:51", " ", "PM"],
        status: null,
        seconds: 1854
      },
      delay: 0
    },
    headsign: "Framingham"
  },
  {
    train_number: "593",
    route: {
      type: crRouteType,
      name: "Framingham/Worcester Line",
      long_name: "Framingham/Worcester Line",
      id: "CR-Worcester",
      direction_names: { "1": "Inbound", "0": "Outbound" },
      direction_destinations: { "1": "South Station", "0": "Worcester" },
      description: "commuter_rail",
      "custom_route?": false
    },
    prediction: {
      scheduled_time: ["5:31", " ", "PM"],
      prediction: null,
      delay: 0
    },
    headsign: "Framingham"
  }
];
describe("UpcomingDepartures", () => {
  it("doesn't render if there are not predictions", () => {
    createReactRoot();
    const tree = renderer.create(
      <UpcomingDepartures
        state={{
          data: [
            {
              ...stopPrediction[0],
              prediction: {
                prediction: null,
                delay: 0,
                scheduled_time: ["3", ":25", "PM"]
              }
            }
          ],
          error: false,
          isLoading: false
        }}
      />
    );
    expect(tree.toJSON()).toBeNull();
  });

  it("doesn't render if there was an error", () => {
    createReactRoot();
    const tree = renderer.create(
      <UpcomingDepartures
        state={{
          data: [
            {
              ...stopPrediction[0],
              prediction: {
                prediction: null,
                delay: 0,
                scheduled_time: ["3", ":25", "PM"]
              }
            }
          ],
          error: true,
          isLoading: false
        }}
      />
    );
    expect(tree.toJSON()).toBeNull();
  });

  it("renders bus predictions", () => {
    createReactRoot();
    const tree = renderer.create(
      <UpcomingDepartures
        state={{
          data: stopPrediction,
          error: false,
          isLoading: false
        }}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("renders SL bus predictions", () => {
    createReactRoot();
    const tree = renderer.create(
      <UpcomingDepartures
        state={{
          data: [
            {
              ...stopPrediction[0],
              route: { ...stopPrediction[0].route, name: "SL-2", id: "741" }
            }
          ],
          error: false,
          isLoading: false
        }}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("renders cr predictions", () => {
    createReactRoot();
    const tree = renderer.create(
      <UpcomingDepartures
        state={{
          data: crPrediction,
          error: false,
          isLoading: false
        }}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
