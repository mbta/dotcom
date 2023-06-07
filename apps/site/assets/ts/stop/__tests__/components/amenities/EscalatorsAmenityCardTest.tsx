import React from "react";
import { render, screen } from "@testing-library/react";
import EscalatorsAmenityCard from "../../../components/amenities/EscalatorsAmenityCard";

describe("EscalatorsAmenityCard", () => {
  it("should render the title", () => {
    render(<EscalatorsAmenityCard />);
    expect(screen.getByText("Escalators")).toBeDefined();
  });
});
