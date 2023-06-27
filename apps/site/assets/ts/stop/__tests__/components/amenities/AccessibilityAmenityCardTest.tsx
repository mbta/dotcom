import React from "react";
import { render, screen } from "@testing-library/react";
import AccessibilityAmenityCard from "../../../components/amenities/AccessibilityAmenityCard";

describe("AccessibilityAmenityCard", () => {
  it("should render the title and links", () => {
    render(
      <AccessibilityAmenityCard
        stopName=""
        accessibleFeatures={["accessible", "ramp"]}
      />
    );
    expect(screen.getByText("Accessibility")).toBeDefined();
    screen.getByRole("button").click(); // open modal
    [
      "Report an accessibility issue",
      "Learn more about accessibility on the T",
      "Plan an accessible trip",
      "Visit the Mobility Center"
    ].forEach(text => {
      expect(screen.getByRole("link", { name: text })).toBeDefined();
    });
  });

  it("should indicate absense of accessibility", () => {
    render(<AccessibilityAmenityCard stopName="" accessibleFeatures={[]} />);
    expect(screen.getByText("Not accessible")).toBeDefined();
    expect(screen.getByText("This station is not accessible.")).toBeDefined();
  });
});
