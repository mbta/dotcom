import React from "react";
import { render, screen } from "@testing-library/react";
import AccessibilityAmenityCard from "../../../components/amenities/AccessibilityAmenityCard";

describe("AccessibilityAmenityCard", () => {
  it("should render the title and links", () => {
    render(
      <AccessibilityAmenityCard
        stopName=""
        accessibleFeatures={["accessible", "ramp"]}
        isStation
        isFerry={false}
      />
    );
    expect(screen.getByText("Accessibility")).toBeDefined();
    expect(
      screen.getByText(
        "Learn more about the accessibility features at this station."
      )
    ).toBeDefined();
    screen.getByRole("button").click(); // open modal
    [
      "Report an accessibility issue",
      "Learn more about accessibility on the T",
      "Plan an accessible trip",
      "Visit the Mobility Center"
    ].forEach(text => {
      expect(screen.getByRole("link", { name: text })).toBeDefined();
    });
    expect(
      screen.getByRole("heading", { name: "Station Features" })
    ).toBeDefined();
  });

  it("should indicate absense of accessibility", () => {
    render(
      <AccessibilityAmenityCard
        stopName=""
        accessibleFeatures={[]}
        isStation
        isFerry={false}
      />
    );
    expect(screen.getByText("Not accessible")).toBeDefined();
    expect(screen.getByText("This station is not accessible.")).toBeDefined();
  });

  it("should show different items for bus stops", () => {
    render(
      <AccessibilityAmenityCard
        stopName="StopName"
        accessibleFeatures={["accessible"]}
        isStation={false}
        isFerry={false}
      />
    );
    expect(
      screen.getByText(
        "Learn more about the accessibility features at this stop."
      )
    ).toBeDefined();
    screen.getByRole("button").click(); // open modal
    [
      "Report an accessibility issue",
      "Learn more about bus accessibility",
      "Plan an accessible trip",
      "Visit the Mobility Center"
    ].forEach(text => {
      expect(screen.getByRole("link", { name: text })).toBeDefined();
    });
    expect(screen.getByRole("heading", { name: "Bus Features" })).toBeDefined();
  });

  it("should handle stations without extra features", () => {
    render(
      <AccessibilityAmenityCard
        stopName=""
        accessibleFeatures={["accessible"]}
        isStation
        isFerry={false}
      />
    );
    screen.getByRole("button").click(); // open modal
    expect(
      screen.getByText(
        "There are no additional accessibility features, but buses are always accessible to board."
      )
    ).toBeDefined();
  });
});
