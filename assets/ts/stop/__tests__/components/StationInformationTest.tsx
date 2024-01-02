import React from "react";
import { render, screen } from "@testing-library/react";
import StationInformation from "../../components/StationInformation";
import { customStop } from "../helpers";

const stationStop = customStop({
  name: "First Station",
  "station?": true,
  bike_storage: ["bike_storage_rack"],
  accessibility: ["accessible", "ramp"],
  "has_fare_machine?": true
});
const busStop = customStop({
  name: "Second Pl",
  "station?": false,
  bike_storage: ["bike_storage_rack"],
  accessibility: ["accessible"],
  "has_fare_machine?": false
});

describe("StationInformation", () => {
  it("should have headings", () => {
    render(
      <StationInformation stop={stationStop} alerts={[]} facilities={[]} />
    );
    expect(
      screen.queryByRole("heading", { name: "Station Information" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Bringing your car or bike" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Getting around the station" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Purchasing fares" })
    ).toBeInTheDocument();
  });

  it("hides unneeded headings for bus stops", () => {
    render(<StationInformation stop={busStop} alerts={[]} facilities={[]} />);
    expect(
      screen.queryByRole("heading", { name: "Stop Information" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Bringing your car or bike" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Getting around the station" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Purchasing fares" })
    ).not.toBeInTheDocument();
  });
});
