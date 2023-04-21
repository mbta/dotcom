import { render, screen } from "@testing-library/react";
import React from "react";
import { Stop } from "../../__v3api";
import StopMapRedesign from "../components/StopMapRedesign";
import { newLatOrLon, newPolyline } from "./helpers";

jest.mock("../../hooks/useMapConfig", () => ({
  __esModule: true,
  default: () => ({
    tile_server_url: "https://mbta-map-tiles-dev.s3.amazonaws.com"
  })
}));

const testStop = {
  id: "Test Stop ID",
  latitude: newLatOrLon(),
  longitude: newLatOrLon()
} as Stop;

describe("StopMapRedesign", () => {
  it("should render the Map component with a marker", () => {
    const { getByAltText } = render(
      <StopMapRedesign stop={testStop} lines={[]} />
    );
    expect(screen.queryByLabelText("Map with stop")).not.toBeNull();
    const image = getByAltText("Marker");
    expect(image).toHaveAttribute("src", "/images/icon-map-station-marker.svg");
  });

  it("should display lines", () => {
    const lines = [newPolyline(), newPolyline(), newPolyline(), newPolyline()];
    const { container } = render(
      <StopMapRedesign stop={testStop} lines={lines} />
    );

    const mapPolylines = container
      .querySelector("[aria-label='Map with stop']")
      ?.querySelectorAll(".leaflet-overlay-pane path");
    expect(mapPolylines).toHaveLength(lines.length);
  });
});
