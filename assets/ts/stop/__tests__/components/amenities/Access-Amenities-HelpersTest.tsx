import React from "react";
import {
  availabilityMessage,
  cardBadge
} from "../../../components/amenities/access-amenities-helpers";
import { Alert, Facility, InformedEntity } from "../../../../__v3api";
import { render, screen } from "@testing-library/react";

const facility1: Facility = {
  id: "703",
  type: "escalator",
  short_name: "Davis Escalator",
  long_name: "Escalator to the street at Davis Square"
};
const facility2: Facility = {
  id: "707",
  type: "elevator",
  short_name: "Davis Elevator",
  long_name: "Elevator to the street at Davis Square"
};
const alert1: Alert = {
  severity: 7,
  priority: "high",
  lifecycle: "new",
  informed_entity: { facility: "703" } as InformedEntity,
  active_period: [["2020-09-10 08:00", "2020-09-10 20:00"]]
} as Alert;

describe("availabilityMessage", () => {
  it("should return 'View available facilityType' if at least one is available", () => {
    expect(availabilityMessage(1, 2, "Elevator")).toEqual(
      "View available elevators."
    );
  });

  it("should renturn 'This station does not have facilityType' if total facilities is 0", () => {
    expect(availabilityMessage(0, 0, "Escalator")).toEqual(
      "This station does not have escalators."
    );
  });

  it("should renturn 'All facilityType are currently out of order.' if all facilities have alerts", () => {
    expect(availabilityMessage(2, 2, "Elevator")).toEqual(
      "All elevators are currently out of order."
    );
  });
});

describe("cardBadge", () => {
  it("should show '0 of 1 working'", () => {
    render(<>{cardBadge([facility1], [alert1])}</>);
    expect(screen.getByText("0 of 1 working")).toBeInTheDocument();
  });

  it("should show '1 of 1 working'", () => {
    render(<>{cardBadge([facility1], [])}</>);
    screen;
    expect(screen.getByText("1 of 1 working")).toBeInTheDocument();
  });

  it("should show '1 of 2 working'", () => {
    render(<>{cardBadge([facility1, facility2], [alert1])}</>);
    screen;
    expect(screen.getByText("1 of 2 working")).toBeInTheDocument();
  });

  it("should render 'Not available' if no facilities", () => {
    render(<>{cardBadge([], [])}</>);
    expect(screen.getByText("Not available")).toBeInTheDocument();
  });
});
