import React from "react";
import { render, screen } from "@testing-library/react";
import AccessibilityAmenityCard from "../../../components/amenities/AccessibilityAmenityCard";

describe("AccessibilityAmenityCard", () => {
  it("should render the title", () => {
    render(<AccessibilityAmenityCard />);
    expect(screen.getByText("Accessibility")).toBeDefined();
  });
});
