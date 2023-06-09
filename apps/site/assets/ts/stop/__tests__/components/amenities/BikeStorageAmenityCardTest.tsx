import React from "react";
import { render, screen } from "@testing-library/react";
import BikeStorageAmenityCard from "../../../components/amenities/BikeStorageAmenityCard";

describe("BikeStorageAmenityCard", () => {
  it("should render the title", () => {
    render(<BikeStorageAmenityCard />);
    expect(screen.getByText("Bike Storage")).toBeDefined();
  });
});
