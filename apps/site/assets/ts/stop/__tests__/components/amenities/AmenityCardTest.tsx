import React from "react";
import { render, screen } from "@testing-library/react";
import AmenityCard, {
  AmenityModal
} from "../../../components/amenities/AmenityCard";

describe("AmenityCard", () => {
  it("should render the icon, title, content", () => {
    render(
      <AmenityCard
        headerText={"Amenity Title"}
        icon={<span data-testid="icon"></span>}
        content={<div>Outer content</div>}
      />
    );
    expect(screen.getByText("Amenity Title")).toBeDefined();
    expect(screen.getByTestId("icon")).toBeDefined();
    expect(screen.getByText("Outer content")).toBeDefined();
  });

  it("should toggle children elements in a modal", () => {
    render(
      <AmenityCard
        headerText={""}
        icon={<span></span>}
        content={<div>Outer content</div>}
      >
        <AmenityModal headerText="Inner header">
          <div>
            <div>Inner content</div>
          </div>
        </AmenityModal>
      </AmenityCard>
    );
    expect(screen.queryByText("Inner header")).toBeNull();
    expect(screen.queryByText("Inner content")).toBeNull();
    screen.getByRole("button").click();
    expect(screen.queryByText("Inner header")).toBeDefined();
    expect(screen.queryByText("Inner content")).toBeDefined();
    screen.getByRole("button", { name: "Close" }).click();
    expect(screen.queryByText("Inner header")).toBeNull();
    expect(screen.queryByText("Inner content")).toBeNull();
  });
});
