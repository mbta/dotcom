import React from "react";
import renderer from "react-test-renderer";
import RoutesSidebar, { filterData } from "../components/RoutesSidebar";
import { createReactRoot } from "../../app/helpers/testUtils";
import { importData } from "./helpers/testUtils";
import { RouteWithStopsWithDirections } from "../../__v3api";

describe("render", () => {
  it("it renders", () => {
    const data: RouteWithStopsWithDirections[] = importData().slice(0, 3);

    createReactRoot();
    const tree = renderer
      .create(
        <RoutesSidebar
          data={data}
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
    expect(tree).toEqual(null);
  });
});

describe("filterData", () => {
  it("should filter by stop ID", () => {
    const data: RouteWithStopsWithDirections[] = importData();
    const selectedStopId = data[0].stops_with_directions[0].stop.id;

    expect(data).toHaveLength(22);

    const filteredData = filterData(data, selectedStopId, [], true);

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
    const data = importData();
    expect(data).toHaveLength(22);

    const filteredBusData = filterData(data, null, ["bus"], true);
    expect(filteredBusData).toHaveLength(12);
    expect(
      filteredBusData.every(
        (route: RouteWithStopsWithDirections) => route.route.type === 3
      )
    ).toEqual(true);

    const filteredRailData = filterData(data, null, ["commuter_rail"], true);
    expect(filteredRailData).toHaveLength(4);
    expect(
      filteredRailData.every(
        (route: RouteWithStopsWithDirections) => route.route.type === 2
      )
    ).toEqual(true);

    const filteredSubwayData = filterData(data, null, ["subway"], true);
    expect(filteredSubwayData).toHaveLength(6);
    expect(
      filteredSubwayData.every(
        (route: RouteWithStopsWithDirections) =>
          route.route.type === 0 || route.route.type === 1
      )
    ).toEqual(true);
  });
});
