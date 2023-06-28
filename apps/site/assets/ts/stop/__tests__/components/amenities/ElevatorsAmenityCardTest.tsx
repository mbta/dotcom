import React from "react";
import { render, screen } from "@testing-library/react";
import ElevatorsAmenityCard from "../../../components/amenities/ElevatorsAmenityCard";

describe("ElevatorsAmenityCard", () => {
  it("should render the title", () => {
    render(<ElevatorsAmenityCard stopName="" alerts={[]} facilities={[]} />);
    expect(screen.getByText("Elevators")).toBeDefined();
  });
});
