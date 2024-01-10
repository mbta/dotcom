import React from "react";
import { render, screen } from "@testing-library/react";
import ElevatorsAmenityCard from "../../../components/amenities/ElevatorsAmenityCard";
import { Alert, Facility, InformedEntity } from "../../../../__v3api";

const facility1: Facility = {
  id: "703",
  attributes: {
    type: "ELEVATOR",
    short_name: "Bowdin Elevator",
    long_name: "Elevator to the lobby at Bowdin"
  }
};
const alert1: Alert = {
  severity: 7,
  priority: "high",
  lifecycle: "new",
  informed_entity: { facility: "703" } as InformedEntity,
  active_period: [["2020-09-10 08:00", "2020-09-10 20:00"]]
} as Alert;

describe("ElevatorsAmenityCard", () => {
  it("should render the title", () => {
    render(
      <ElevatorsAmenityCard stopName="" alerts={[]} elevatorFacilities={[]} />
    );
    expect(screen.getByText("Elevators")).toBeDefined();
  });

  it("should render 'View available elevators.' if at least one is working", () => {
    render(
      <ElevatorsAmenityCard
        stopName="TestStop"
        alerts={[]}
        elevatorFacilities={[facility1]}
      />
    );
    expect(screen.getByText("View available elevators.")).toBeDefined();
    expect(screen.getByText("1 of 1 working")).toBeDefined();
  });

  it("should render 'All elevators are currently out of order.' if none are working", () => {
    render(
      <ElevatorsAmenityCard
        stopName="TestStop"
        alerts={[alert1]}
        elevatorFacilities={[facility1]}
      />
    );
    expect(
      screen.getByText("All elevators are currently out of order.")
    ).toBeDefined();
    expect(screen.getByText("0 of 1 working")).toBeDefined();
  });

  it("should render 'This station does not have elevators.' if there are none", () => {
    render(
      <ElevatorsAmenityCard
        stopName="TestStop"
        alerts={[]}
        elevatorFacilities={[]}
      />
    );
    expect(
      screen.getByText("This station does not have elevators.")
    ).toBeDefined();
    expect(screen.getByText("Not available")).toBeDefined();
  });
});
