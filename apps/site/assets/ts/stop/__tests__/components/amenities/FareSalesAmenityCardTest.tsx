import React from "react";
import { render, screen } from "@testing-library/react";
import FareSalesAmenityCard from "../../../components/amenities/FareSalesAmenityCard";

describe("FareSalesAmenityCard", () => {
  it("should render the title", () => {
    render(<FareSalesAmenityCard />);
    expect(screen.getByText("Fare Sales")).toBeDefined();
  });
});
