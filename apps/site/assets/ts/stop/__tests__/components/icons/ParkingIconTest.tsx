import React from "react";
import { render, screen } from "@testing-library/react";
import ParkingIcon from "../../../components/icons/ParkingIcon";
import { ParkingLot, Stop } from "../../../../__v3api";

describe("ParkingIcon", () => {
  it("should return an empty element parking lots array is empty", () => {
    const stop = { parking_lots: [] as ParkingLot[] };
    render(
      <div data-testid="empty">
        <ParkingIcon stop={stop as Stop} />
      </div>
    );
    expect(screen.getByTestId("empty")).toBeEmptyDOMElement();
  });

  it("should return the parking icon if the lots array is not empty", () => {
    const stop = { parking_lots: [{ name: "Test Lot 1" }] as ParkingLot[] };
    const { container } = render(<ParkingIcon stop={stop as Stop} />);
    expect(container.querySelector(".m-stop-page__icon")).not.toBeNull();
  });
});
