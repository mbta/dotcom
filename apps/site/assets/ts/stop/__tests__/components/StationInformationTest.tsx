import React from "react";
import { render, screen } from "@testing-library/react";
import StationInformation from "../../components/StationInformation";
import { Stop } from "../../../__v3api";

const stationStop = { "station?": true } as Stop;
const busStop = { "station?": false } as Stop;

describe("StationInformation", () => {
  it("should have headings", () => {
    render(
      <StationInformation stop={stationStop} alerts={[]} facilities={[]} />
    );
    expect(
      screen.queryByRole("heading", { name: "Station Information" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Bringing Your Car or Bike" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Getting Around the Station" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Purchasing Fares" })
    ).toBeInTheDocument();
  });

  it("hides unneeded headings for bus stops", () => {
    render(<StationInformation stop={busStop} alerts={[]} facilities={[]} />);
    expect(
      screen.queryByRole("heading", { name: "Stop Information" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Bringing Your Car or Bike" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Getting Around the Station" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Purchasing Fares" })
    ).not.toBeInTheDocument();
  });
});
