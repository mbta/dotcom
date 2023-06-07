import React from "react";
import { render, screen } from "@testing-library/react";
import ParkingAmenityCard from "../../../components/amenities/ParkingAmenityCard";

describe("ParkingAmenityCard", () => {
  it("should render the title", () => {
    render(<ParkingAmenityCard />);
    expect(screen.getByText("Parking")).toBeDefined();
  });
});
