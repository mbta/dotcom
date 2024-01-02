import stopIncludesModes from "../helpers/stop-includes-modes";
import { importData, importRealtimeResponse } from "./helpers/testUtils";
import { transformStops } from "../helpers/process-realtime-data";

const realtimeData = importRealtimeResponse();
const stopsWithDistances = importData();
const stopsWithRoutes = transformStops(
  stopsWithDistances.distances,
  [],
  realtimeData
);

describe("stopIncludesModes", () => {
  it("returns true when modes are empty", () => {
    expect(stopsWithRoutes.every(stop => stopIncludesModes(stop, []))).toEqual(
      true
    );
  });

  it("returns true when all modes are selected", () => {
    expect(
      stopsWithRoutes.every(stop =>
        stopIncludesModes(stop, ["subway", "bus", "commuter_rail"])
      )
    ).toEqual(true);
  });

  it("returns true when stop includes at least one matching mode", () => {
    const maldenCenter = stopsWithRoutes.find(
      stop => stop.stop.id === "place-mlmnl"
    );
    expect(maldenCenter).toBeDefined();
    expect(maldenCenter!.routes.map(route => route.group_name)).toEqual([
      "orange_line",
      "commuter_rail",
      "bus"
    ]);
    expect(stopIncludesModes(maldenCenter!, ["subway"])).toEqual(true);
    expect(stopIncludesModes(maldenCenter!, ["bus"])).toEqual(true);
    expect(stopIncludesModes(maldenCenter!, ["commuter_rail"])).toEqual(true);
    expect(stopIncludesModes(maldenCenter!, ["commuter_rail", "bus"])).toEqual(
      true
    );
  });
});
