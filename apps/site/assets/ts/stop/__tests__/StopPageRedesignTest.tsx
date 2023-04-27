import React from "react";
import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import StopPageRedesign from "../components/StopPageRedesign";
import * as useStop from "../../hooks/useStop";
import { Stop, ParkingLot, InformedEntitySet, Alert } from "../../__v3api";
import * as useRoute from "../../hooks/useRoute";
import * as useAlertsForStop from "../../hooks/useAlertsForStop";

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

  it("should render alerts", () => {
    const lowAlert: Alert = {
      updated_at: "Updated: 4/11/2019 09:33A",
      severity: 7,
      priority: "low",
      lifecycle: "upcoming",
      active_period: [],
      informed_entity: {} as InformedEntitySet,
      id: "00005",
      header: "There is construction at this station.",
      effect: "other",
      description: "",
      url: "https://www.mbta.com"
    };

    jest
      .spyOn(useAlertsForStop, "default")
      .mockImplementation(() => [lowAlert]);

    render(<StopPageRedesign stopId="123" />);
    expect(
      screen.queryByText("There is construction at this station.")
    ).not.toBeNull();
  });
});
