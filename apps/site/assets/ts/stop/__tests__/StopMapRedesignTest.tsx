import { render, screen } from "@testing-library/react";
import React from "react";
import { DirectionId, Stop } from "../../__v3api";
import StopMapRedesign, {
  StopMapForRoute
} from "../components/StopMapRedesign";
import { newLatOrLon, newPolyline } from "./helpers";
import useVehiclesChannel, { Vehicle } from "../../hooks/useVehiclesChannel";

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

  describe("StopMapForRoute", () => {
    jest.mock("useVehiclesChannel", () => ({
      default: jest.fn(() => [])
    }));

    const vehicles: Vehicle[] = [
      {
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
      },
      {
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
      }
    ];

    beforeEach(() => {
      (useVehiclesChannel as jest.Mock).mockReturnValue([]);
    });

    it("should render markers for each vehicle on the route", () => {});

    it("should render the stop marker", () => {});
    it("should render the route shape", () => {});

    it("when a vehicle is selected, centers on that vehicle if it exists", () => {});
    it("if the selected vehicle doesn't exist, centers on the stop marker", () => {});
  });
});
