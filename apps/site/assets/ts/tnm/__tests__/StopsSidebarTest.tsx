import React from "react";
import renderer from "react-test-renderer";
import StopsSidebar, { filterData } from "../components/StopsSidebar";
import { createReactRoot } from "../../app/helpers/testUtils";
import { importStopData } from "./helpers/testUtils";
import { StopWithRoutes } from "../components/__tnm";

describe("StopsSidebar", () => {
  it("it renders", () => {
    const data = importStopData().slice(0, 3);

    createReactRoot();
    const tree = renderer
      .create(
        <StopsSidebar
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
        <StopsSidebar
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
    const data = importStopData();
    const selectedStopId = data[0].stop.stop.id;

    expect(data).toHaveLength(12);

    const filteredData = filterData(data, selectedStopId, [], true);

    expect(filteredData).toHaveLength(1);

    // Only the selected stop should be shown
    expect(
      filteredData.every(
        ({
          stop: {
            stop: { id }
          }
        }: StopWithRoutes) => id === selectedStopId
      )
    );
  });

  it("should not filter if stop is not found", () => {
    const data = importStopData();
    const selectedStopId = "something";

    expect(data).toHaveLength(12);

    const filteredData = filterData(data, selectedStopId, [], true);

    // Every stop should be shown
    expect(filteredData).toHaveLength(12);
  });

  it("should filter by modes", () => {
    const data = importStopData();
    expect(data).toHaveLength(12);

    const filteredBusData = filterData(data, null, ["bus"], true);
    expect(filteredBusData).toHaveLength(10);

    const filteredRailData = filterData(data, null, ["commuter_rail"], true);
    expect(filteredRailData).toHaveLength(1);

    const filteredSubwayData = filterData(data, null, ["subway"], true);
    expect(filteredSubwayData).toHaveLength(4);
  });
});
