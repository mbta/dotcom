import { render, screen } from "@testing-library/react";
import React from "react";
import { MapData } from "../../leaflet/components/__mapdata";
import { Stop } from "../../__v3api";
import StopMapRedesign from "../components/StopMapRedesign";

jest.mock("../../leaflet/components/Map", () => ({
  __esModule: true,
  default: (props: { mapData: MapData }) => {
    expect(props.mapData.markers.length).toBe(1);
    return <div>Map Component</div>;
  }
}));

describe("StopMapRedesign", () => {
  it("should render the map", () => {
    render(<StopMapRedesign stop={{ id: "Test Stop ID" } as Stop} />);
    expect(screen.queryByText("Map Component"));
  });
});
