import { render, screen } from "@testing-library/react";
import React from "react";
import { faker } from "@faker-js/faker";
import { Polyline } from "../../leaflet/components/__mapdata";
import { Stop } from "../../__v3api";
import StopMapRedesign from "../components/StopMapRedesign";
import { uniqueId } from "lodash";

jest.mock("../../hooks/useMapConfig", () => ({
  __esModule: true,
  default: () => ({
    tile_server_url: "https://mbta-map-tiles-dev.s3.amazonaws.com"
  })
}));

const newLatOrLon = (): number => +faker.random.numeric(2);
const newPosition = (): [number, number] => [newLatOrLon(), newLatOrLon()];
const newPolyline = (): Polyline => ({
  color: faker.color.rgb({ prefix: "#" }),
  "dotted?": false,
  id: uniqueId(),
  positions: [newPosition(), newPosition(), newPosition()],
  weight: 2
});

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
