import React from "react";
import renderer from "react-test-renderer";
import RoutesSidebar, { filterData } from "../components/RoutesSidebar";
import { createReactRoot } from "../../app/helpers/testUtils";
import { importData, importRealtimeResponse } from "./helpers/testUtils";
import { RouteWithStopsWithDirections } from "../../__v3api";
import { transformRoutes } from "../helpers/process-realtime-data";
import { isABusRoute, isACommuterRailRoute } from "../../models/route";

const realtimeData = importRealtimeResponse();
const stopsWithDistances = importData();
const routesWithRealtimeSchedules = transformRoutes(
  stopsWithDistances.distances,
  [],
  realtimeData
);

describe("render", () => {
  it("it renders", () => {
    createReactRoot();
    const tree = renderer
      .create(
        <RoutesSidebar
          data={routesWithRealtimeSchedules}
          selectedStopId={null}
          shouldFilterStopCards={false}
          dispatch={() => {}}
          selectedStop={undefined}
          selectedModes={[]}
          emptyMessage={<div>No data</div>}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("it returns null when there isn't data", () => {
    createReactRoot();
    const tree = renderer
      .create(
        <RoutesSidebar
          data={[]}
          selectedStopId={null}
          shouldFilterStopCards={false}
          dispatch={() => {}}
          selectedStop={undefined}
          selectedModes={[]}
          emptyMessage={<div>No data</div>}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("filterData", () => {
  it("should filter by stop ID", () => {
    const data: RouteWithStopsWithDirections[] = [
      {
        route: {
          type: 1,
          name: "Orange Line",
          long_name: "Orange Line",
          id: "Orange",
          header: "Orange Line",
          direction_names: {
            "0": "Southbound",
            "1": "Northbound"
          },
          direction_destinations: {
            "0": "Forest Hills",
            "1": "Oak Grove"
          },
          description: "rapid_transit",
          alerts: [],
          line_id: null
        },
        stops_with_directions: [
          {
            stop: {
              name: "Test",
              type: "stop",
              id: "test",
              address: "Commercial St and Pleasant St, Malden, MA 02148",
              accessibility: [
                "accessible",
                "escalator_up",
                "elevator",
                "fully_elevated_platform"
              ],
              bike_storage: [],
              closed_stop_info: null,
              "has_charlie_card_vendor?": false,
              "has_fare_machine?": false,
              fare_facilities: [],
              "child?": false,
              latitude: 0,
              longitude: 0,
              municipality: "Malden",
              note: null,
              parking_lots: [],
              "station?": false,
              "ferry?": false,
            },
            distance: "85 ft",
            directions: [
              {
                headsigns: [
                  {
                    headsign: "Forest Hills",
                    name: "Forest Hills",
                    times: [
                      {
                        prediction: {
                          track: null,
                          time: ["1", " ", "min"],
                          status: null
                        },
                        scheduled_time: null,
                        delay: 0
                      },
                      {
                        prediction: {
                          track: null,
                          time: ["14", " ", "min"],
                          status: null
                        },
                        scheduled_time: null,
                        delay: 0
                      }
                    ],
                    train_number: null
                  }
                ],
                direction_id: 0
              },
              {
                headsigns: [
                  {
                    headsign: "Oak Grove",
                    name: "Oak Grove",
                    times: [
                      {
                        prediction: {
                          track: null,
                          time: ["6", " ", "min"],
                          status: null
                        },
                        scheduled_time: null,
                        delay: 0
                      },
                      {
                        prediction: {
                          track: null,
                          time: ["11", " ", "min"],
                          status: null
                        },
                        scheduled_time: null,
                        delay: 0
                      }
                    ],
                    train_number: null
                  }
                ],
                direction_id: 1
              }
            ]
          }
        ]
      }
    ];

    const mergedData = data.concat(routesWithRealtimeSchedules);

    const selectedStopId = "test";

    expect(mergedData).toHaveLength(16);

    const filteredData = filterData(mergedData, selectedStopId, [], true);

    expect(filteredData).toHaveLength(1);

    // Every route should only have one stop
    expect(
      filteredData.every(
        (route: RouteWithStopsWithDirections) =>
          route.stops_with_directions.length === 1
      )
    ).toEqual(true);

    // Every stop should match the selected stop
    expect(
      filteredData.every(
        (route: RouteWithStopsWithDirections) =>
          route.stops_with_directions[0].stop.id === selectedStopId
      )
    ).toEqual(true);
  });

  it("should filter by modes", () => {
    expect(routesWithRealtimeSchedules).toHaveLength(15);

    const filteredBusData = filterData(
      routesWithRealtimeSchedules,
      null,
      ["bus"],
      true
    );
    expect(filteredBusData).toHaveLength(13);
    expect(
      filteredBusData.every((route: RouteWithStopsWithDirections) =>
        isABusRoute(route.route)
      )
    ).toEqual(true);

    const filteredRailData = filterData(
      routesWithRealtimeSchedules,
      null,
      ["commuter_rail"],
      true
    );
    expect(filteredRailData).toHaveLength(1);
    expect(
      filteredRailData.every((route: RouteWithStopsWithDirections) =>
        isACommuterRailRoute(route.route)
      )
    ).toEqual(true);

    const filteredSubwayData = filterData(
      routesWithRealtimeSchedules,
      null,
      ["subway"],
      true
    );
    expect(filteredSubwayData).toHaveLength(1);
    expect(
      filteredSubwayData.every(
        (route: RouteWithStopsWithDirections) =>
          route.route.type === 0 || route.route.type === 1
      )
    ).toEqual(true);
  });
});
