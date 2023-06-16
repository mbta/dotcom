import React from "react";
import { render, screen } from "@testing-library/react";
import AmenityCard from "../../../components/amenities/AmenityCard";

describe("AmenityCard", () => {
  it("should render the icon & title", () => {
    render(
      <AmenityCard
        headerText={"Amenity Title"}
        icon={<span data-testid="icon"></span>}
      />
    );
    expect(screen.getByText("Amenity Title")).toBeDefined();
    expect(screen.getByTestId("icon")).toBeDefined();
  });

  it("should render children elements", () => {
    render(
      <AmenityCard headerText={""} icon={<span></span>}>
        <div>
          <div>More content</div>
        </div>
      </AmenityCard>
    );
    expect(screen.getByText("More content")).toBeDefined();
  });
});
