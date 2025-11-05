import React from "react";
import { render, screen } from "@testing-library/react";
import AccessAmenitiesModal from "../components/AccessAmenitiesModal";
import { Facility } from "../../__v3api";

describe("AccessAmenitiesModal", () => {
  let elevatorFacility: Facility = {
    id: "ele-123",
    long_name: "Davis elevator in lobby",
    short_name: "Davis elevator",
    type: "elevator"
  };
  let escalatorFacility: Facility = {
    id: "esc-426",
    long_name: "Bowdin escalator to street",
    short_name: "Bowdin escalator",
    type: "escalator"
  };

  it("should render", () => {
    render(
      <AccessAmenitiesModal
        stopName={"Davis"}
        alerts={[]}
        facilities={[elevatorFacility]}
        facilityType="Elevator"
      />
    );

    expect(screen.getByText("Elevators at Davis")).toBeDefined();
    expect(screen.getByText("Davis elevator")).toBeDefined();
    expect(screen.getByText("Report an elevator issue")).toBeDefined();
  });

  it("should render escalators", () => {
    render(
      <AccessAmenitiesModal
        stopName={"Bowdin"}
        alerts={[]}
        facilities={[escalatorFacility]}
        facilityType="Escalator"
      />
    );

    expect(screen.getByText("Escalators at Bowdin")).toBeDefined();
    expect(screen.getByText("Bowdin escalator")).toBeDefined();
    expect(screen.getByText("Report an escalator issue")).toBeDefined();
  });
});
