import { render, screen } from "@testing-library/react";
import React from "react";
import { DirectionId, Route, Stop } from "../../__v3api";
import StopMapRedesign from "../components/StopMapRedesign";
import { newLatOrLon, newPolyline } from "./helpers";

jest.mock("../../hooks/useMapConfig", () => ({
  __esModule: true,
  default: () => ({
    tile_server_url: "https://mbta-map-tiles-dev.s3.amazonaws.com"
  })
}));

jest.mock("../../hooks/useVehiclesChannel", () => ({
  __esModule: true,
  default: jest.fn(() => [])
}));

const testStop = {
  id: "Test Stop ID",
  name: "Test Stop Name",
  latitude: newLatOrLon(),
  longitude: newLatOrLon()
} as Stop;

const v1 = {
  id: "y1799",
  route_id: "39",
  stop_id: "72",
  trip_id: "25",
  shape_id: "shape_1",
  direction_id: 1 as DirectionId,
  status: "STOPPED",
  latitude: 2.2,
  longitude: 1.1,
  bearing: 140,
  crowding: null
};
const v2 = {
  id: "y1800",
  route_id: "39",
  stop_id: "73",
  trip_id: "25",
  shape_id: "shape_1",
  direction_id: 1 as DirectionId,
  status: "STOPPED",
  latitude: 2.4,
  longitude: 1.3,
  bearing: 141,
  crowding: null
};

describe("StopMapRedesign", () => {
  it("should render the Map component with a marker", () => {
    render(
      <StopMapRedesign
        stop={testStop}
        lines={[]}
        vehicles={[]}
        selectedRoute={undefined}
      />
    );
    expect(screen.queryByLabelText("Map with stop")).not.toBeNull();
    const image = screen.getByRole("img", {
      name: new RegExp(testStop.name)
    });
    expect(image).toHaveAttribute("src", "/images/icon-map-station-marker.svg");
  });

  it("should display lines", () => {
    const lines = [newPolyline(), newPolyline(), newPolyline(), newPolyline()];
    const { container } = render(
      <StopMapRedesign
        stop={testStop}
        lines={lines}
        vehicles={[]}
        selectedRoute={undefined}
      />
    );

    const mapPolylines = container
      .querySelector("[aria-label='Map with stop']")
      ?.querySelectorAll(".leaflet-overlay-pane path");
    expect(mapPolylines).toHaveLength(lines.length);
  });

  it("should render markers for each vehicle", () => {
    render(
      <StopMapRedesign
        stop={testStop}
        lines={[]}
        vehicles={[v1, v2]}
        selectedRoute={{ id: "FakeRoute" } as Route}
      />
    );
    expect(
      screen.getByRole("img", {
        name: new RegExp(v1.id)
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: new RegExp(v2.id)
      })
    ).toBeInTheDocument();
  });
});
