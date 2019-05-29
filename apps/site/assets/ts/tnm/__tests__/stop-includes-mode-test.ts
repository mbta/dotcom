import stopIncludesModes from "../helpers/stop-includes-modes";
import { importStopData } from "./helpers/testUtils";

describe("stopIncludesModes", () => {
  it("returns true when modes are empty", () => {
    const stops = importStopData();
    expect(stops.every(stop => stopIncludesModes(stop, []))).toEqual(true);
  });

  it("returns true when all modes are selected", () => {
    const stops = importStopData();
    expect(
      stops.every(stop =>
        stopIncludesModes(stop, ["subway", "bus", "commuter_rail"])
      )
    ).toEqual(true);
  });

  it("returns true when stop includes at least one matching mode", () => {
    const stops = importStopData();
    const tuftsMedical = stops.find(
      stop => stop.stop.stop.id === "place-tumnl"
    );
    expect(tuftsMedical).toBeDefined();
    expect(tuftsMedical!.routes.map(route => route.group_name)).toEqual([
      "orange_line",
      "bus"
    ]);
    expect(stopIncludesModes(tuftsMedical!, ["subway"])).toEqual(true);
    expect(stopIncludesModes(tuftsMedical!, ["bus"])).toEqual(true);
    expect(stopIncludesModes(tuftsMedical!, ["commuter_rail"])).toEqual(false);
    expect(stopIncludesModes(tuftsMedical!, ["commuter_rail", "bus"])).toEqual(
      true
    );
  });
});
