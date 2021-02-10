import React from "react";
import renderer from "react-test-renderer";
import StopsSidebar, { filterData } from "../components/StopsSidebar";
import { createReactRoot } from "../../app/helpers/testUtils";
import { importData, importRealtimeResponse } from "./helpers/testUtils";
import { StopWithRoutes } from "../components/__tnm";
import { transformStops } from "../helpers/process-realtime-data";

const realtimeData = importRealtimeResponse();
const stopsWithDistances = importData();
const stopsWithRoutes = transformStops(
  stopsWithDistances.distances,
  [],
  realtimeData
);

describe("StopsSidebar", () => {
  it("it renders", () => {
    createReactRoot();
    const tree = renderer
      .create(
        <StopsSidebar
          data={stopsWithRoutes}
          selectedStopId={null}
          shouldFilterStopCards={false}
          dispatch={() => {}}
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
        <StopsSidebar
          data={[]}
          selectedStopId={null}
          shouldFilterStopCards={false}
          dispatch={() => {}}
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
    const selectedStopId = stopsWithRoutes[0].stop.id;

    expect(stopsWithRoutes).toHaveLength(1);

    const filteredData = filterData(stopsWithRoutes, selectedStopId, [], true);

    expect(filteredData).toHaveLength(1);

    // Only the selected stop should be shown
    expect(
      filteredData.every(
        ({ stop: { id } }: StopWithRoutes) => id === selectedStopId
      )
    );
  });

  it("should not filter if stop is not found", () => {
    const selectedStopId = "something";

    expect(stopsWithRoutes).toHaveLength(1);

    const filteredData = filterData(stopsWithRoutes, selectedStopId, [], true);

    // Every stop should be shown
    expect(filteredData).toHaveLength(1);
  });

  it("should filter by modes", () => {
    expect(stopsWithRoutes).toHaveLength(1);

    const filteredBusData = filterData(stopsWithRoutes, null, ["bus"], true);
    expect(filteredBusData).toHaveLength(1);

    const filteredRailData = filterData(
      stopsWithRoutes,
      null,
      ["commuter_rail"],
      true
    );
    expect(filteredRailData).toHaveLength(1);

    const filteredSubwayData = filterData(
      stopsWithRoutes,
      null,
      ["subway"],
      true
    );
    expect(filteredSubwayData).toHaveLength(1);
  });
});
