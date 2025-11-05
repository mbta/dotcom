import React from "react";
import { render, screen } from "@testing-library/react";
import StationAmenityCard from "../../../components/amenities/StationAmenityCard";
import { Facility, Alert, InformedEntity } from "../../../../__v3api";

const facility1: Facility = {
  id: "703",
  type: "escalator",
  short_name: "Davis Escalator",
  long_name: "Escalator to the street at Davis Square"
};
const alert1: Alert = {
  severity: 7,
  priority: "high",
  lifecycle: "new",
  informed_entity: { facility: "703" } as InformedEntity,
  active_period: [["2020-09-10 08:00", "2020-09-10 20:00"]]
} as Alert;

describe("StationAmenityCard", () => {
  it("should render the title", () => {
    render(
      <StationAmenityCard
        stopName="TestStop"
        alerts={[]}
        facilities={[facility1]}
        facilityType="Escalator"
      />
    );
    expect(screen.getByText("Escalators")).toBeDefined();
  });

  it("should render 'View available escalators.' if at least one is working", () => {
    render(
      <StationAmenityCard
        stopName="TestStop"
        alerts={[]}
        facilities={[facility1]}
        facilityType="Escalator"
      />
    );
    expect(screen.getByText("View available escalators.")).toBeDefined();
    expect(screen.getByText("1 of 1 working")).toBeDefined();
  });

  it("should render 'All escalators are currently out of order.' if none are working", () => {
    render(
      <StationAmenityCard
        stopName="TestStop"
        alerts={[alert1]}
        facilities={[facility1]}
        facilityType="Escalator"
      />
    );
    expect(
      screen.getByText("All escalators are currently out of order.")
    ).toBeDefined();
    expect(screen.getByText("0 of 1 working")).toBeDefined();
  });

  it("should render 'This station does not have escalators.' if there are none", () => {
    render(
      <StationAmenityCard
        stopName="TestStop"
        alerts={[]}
        facilities={[]}
        facilityType="Escalator"
      />
    );
    expect(
      screen.getByText("This station does not have escalators.")
    ).toBeDefined();
    expect(screen.getByText("Not available")).toBeDefined();
  });
});
