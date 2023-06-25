import React from "react";
import { render, screen } from "@testing-library/react";
import AmenityCard, {
  AmenityModal
} from "../../../components/amenities/AmenityCard";

describe("AmenityCard", () => {
  it("should render the icon, title, content, badge", () => {
    render(
      <AmenityCard
        headerText={"Amenity Title"}
        icon={<span data-testid="icon"></span>}
        badge={<span data-testid="badge"></span>}
      >
        <div>Card content</div>
      </AmenityCard>
    );
    expect(screen.getByText("Amenity Title")).toBeDefined();
    expect(screen.getByTestId("icon")).toBeDefined();
    expect(screen.getByTestId("badge")).toBeDefined();
    expect(screen.getByText("Card content")).toBeDefined();
  });

  it("should toggle children elements in a modal", () => {
    const cardName = "Amenity Title";
    const cardContent = "Card content";
    render(
      <AmenityCard
        headerText={cardName}
        icon={<span></span>}
        modalContent={
          <AmenityModal headerText="Inner header">
            <div>
              <div>Modal content</div>
            </div>
          </AmenityModal>
        }
      >
        <div>{cardContent}</div>
      </AmenityCard>
    );
    expect(screen.queryByText("Inner header")).toBeNull();
    expect(screen.queryByText("Modal content")).toBeNull();
    screen.getByRole("button", { name: `${cardName} ${cardContent}` }).click();
    expect(screen.queryByText("Inner header")).toBeDefined();
    expect(screen.queryByText("Modal content")).toBeDefined();
    screen.getByRole("button", { name: "Close" }).click();
    expect(screen.queryByText("Inner header")).toBeNull();
    expect(screen.queryByText("Modal content")).toBeNull();
  });

  it("should support a disabled state if there's no modal", () => {
    render(
      <AmenityCard headerText="Card" icon={<span></span>}>
        Card content
      </AmenityCard>
    );
    expect(
      screen.getByRole("button", { name: "Card Card content" })
    ).toBeDisabled();
    render(
      <AmenityCard
        headerText="Card"
        icon={<span></span>}
        modalContent={"More to come!"}
      >
        Card content
      </AmenityCard>
    );
    expect(
      screen.getByRole("button", { name: "Card Card content" })
    ).not.toBeDisabled();
  });
});
