import { render, screen } from "@testing-library/react";
import React from "react";
import { Stop } from "../../../../__v3api";
import { StopFeatures } from "../../../components/icons/StopFeatures";

jest.mock("../../../components/icons/ModeIcons", () => ({
  __esModule: true,
  ModeIcons: () => <div>ModeIcons</div>
}));

jest.mock("../../../components/icons/CommuterRailZoneIcon", () => ({
  __esModule: true,
  CommuterRailZoneIcon: () => <div>CommuterRailZoneIcon</div>
}));

jest.mock("../../../components/icons/AccessibilityIcon", () => ({
  __esModule: true,
  AccessibilityIcon: () => <div>AccessibilityIcon</div>
}));

jest.mock("../../../components/icons/ParkingIcon", () => ({
  __esModule: true,
  ParkingIcon: () => <div>ParkingIcon</div>
}));

describe("StopFeaturesTest", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should render", () => {
    render(<StopFeatures stop={{} as Stop} routes={[]} />);
    expect(screen.queryByText("ModeIcons")).not.toBeNull();
    expect(screen.queryByText("CommuterRailZoneIcon")).not.toBeNull();
    expect(screen.queryByText("AccessibilityIcon")).not.toBeNull();
    expect(screen.queryByText("ParkingIcon")).not.toBeNull();
  });
});
