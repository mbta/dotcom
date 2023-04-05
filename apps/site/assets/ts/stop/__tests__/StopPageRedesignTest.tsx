import React from "react";
import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import StopPageRedesign from "../components/StopPageRedesign";
import * as useStop from "../../hooks/useStop";
import { Stop, ParkingLot } from "../../__v3api";
import * as useRoute from "../../hooks/useRoute";

jest.mock("../components/StopMapRedesign", () => ({
  __esModule: true,
  default: () => <div>StopMap</div>
}));

describe("StopPageRedesign", () => {
  it("should render", () => {
    jest.spyOn(useRoute, "useRoutesByStop").mockImplementation(() => {
      return [];
    });

    jest.spyOn(useStop, "default").mockImplementation(() => {
      return {
        id: "123",
        name: "Test Stop",
        parking_lots: [] as ParkingLot[],
        accessibility: ["ramp"]
      } as Stop;
    });

    render(<StopPageRedesign stopId="123" />);
    expect(screen.queryByText("Test Stop")).not.toBeNull();
  });
});
