import React from "react";
import { render, screen } from "@testing-library/react";
import { CommuterRailZoneIcon } from "../../../components/icons/CommuterRailZoneIcon";

describe("CommuterRailZoneIcon", () => {
  it("should return an empty element if there is no zone number", () => {
    render(
      <div data-testid="empty">
        <CommuterRailZoneIcon />
      </div>
    );
    expect(screen.getByTestId("empty")).toBeEmptyDOMElement();
  });

  it("should return an empty element if the zone number is empty", () => {
    render(
      <div data-testid="empty">
        <CommuterRailZoneIcon zoneNumber={""} />
      </div>
    );
    expect(screen.getByTestId("empty")).toBeEmptyDOMElement();
  });

  it("should return the zone number", () => {
    render(<CommuterRailZoneIcon zoneNumber={"4"} />);
    expect(screen.queryByText("Zone 4")).not.toBeNull();
  });
});
