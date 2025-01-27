import React from "react";
import { render, screen } from "@testing-library/react";
import StationInformation from "../../components/StationInformation";
import { customStop } from "../helpers";
import { Facility, ParkingLot } from "../../../__v3api";

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
  bike_storage: [],
  parking_lots: [],
  accessibility: ["accessible"],
  "has_fare_machine?": false
});
const facilities = [
  {
    id: "esc1",
    attributes: { short_name: "Escalator 1", type: "ESCALATOR" }
  } as Facility,
  {
    id: "elv100",
    attributes: { short_name: "Elevator 100", type: "ELEVATOR" }
  } as Facility
];

describe("StationInformation", () => {
  it("should have headings", () => {
    render(
      <StationInformation
        stop={stationStop}
        alerts={[]}
        facilities={facilities}
      />
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

  it("shows parking/bike heading for bus stops which have those facilities", () => {
    const busStopWithParking = {
      ...busStop,
      parking_lots: [{ name: "Parking" } as ParkingLot]
    };
    render(
      <StationInformation
        stop={busStopWithParking}
        alerts={[]}
        facilities={[]}
      />
    );
    expect(
      screen.queryByRole("heading", { name: "Bringing your car or bike" })
    ).toBeInTheDocument();
  });
});
