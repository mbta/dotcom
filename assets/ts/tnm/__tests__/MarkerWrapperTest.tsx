import React from "react";
import MarkerWrapper, {
  onClickMarker,
  buildIcon
} from "../components/leaflet/MarkerWrapper";
import { mount } from "enzyme";
import { MapMarker, MapData } from "../../leaflet/components/__mapdata";
import { EnhancedRoute, Stop } from "../../__v3api";
import { Map as LeafletMap } from "react-leaflet";

describe("onClickMarker", () => {
  it("dispatches a current location click action", () => {
    const dispatch = jest.fn();
    const clicked = onClickMarker("current-location", dispatch);
    clicked();
    expect(dispatch).toBeCalledWith({
      payload: { stopId: "current-location" },
      type: "CLICK_CURRENT_LOCATION_MARKER"
    });
  });

  it("dispatches a marker click action", () => {
    const dispatch = jest.fn();
    const clicked = onClickMarker("stop-id", dispatch);
    clicked();
    expect(dispatch).toBeCalledWith({
      payload: { stopId: "stop-id" },
      type: "CLICK_MARKER"
    });
  });
});

describe("buildIcon", () => {
  it("returns undefined if marker icon is null", () => {
    const emptyMarker = buildIcon(null, undefined, false, false);
    expect(emptyMarker).toBeUndefined();
  });

  it("returns a sized marker if the marker is for current location", () => {
    const locMarker = buildIcon(
      "current-location-marker",
      [25, 25],
      false,
      false
    );
    expect(locMarker!.options.iconUrl).toMatch("current-location-marker");
    expect(locMarker!.options.iconSize).toEqual([25, 25]);
  });

  it("returns a hovered state marker if the marker is hovered", () => {
    const locMarker = buildIcon("stop-id", undefined, true, false);
    expect(locMarker!.options.iconUrl).toMatch("-hover");
  });

  it("returns a selected state marker if the marker is selected", () => {
    const locMarker = buildIcon("stop-id", undefined, false, true);
    expect(locMarker!.options.iconUrl).toMatch("-hover");
  });

  it("returns the specified marker if not matched", () => {
    const locMarker = buildIcon("stop-id", undefined, false, false);
    expect(locMarker!.options.iconUrl).toMatch("stop-id");
  });

  it("returns undefined if the window is not defined", () => {
    const { window } = global;
    // @ts-ignore
    delete global.window;

    const locMarker = buildIcon("stop-id", undefined, false, true);
    expect(locMarker).toBeUndefined();

    global.window = window;
  });
});

const marker: MapMarker = {
  icon: "test",
  id: "stop-id",
  latitude: 41.0,
  longitude: -71.0,
  rotation_angle: 0,
  tooltip: null
};

const stop: Stop = {
  accessibility: ["wheelchair"],
  address: "123 Main St., Boston MA",
  bike_storage: [],
  closed_stop_info: null,
  fare_facilities: [],
  "has_charlie_card_vendor?": false,
  "has_fare_machine?": false,
  id: "stop-id",
  "child?": false,
  latitude: 41.0,
  longitude: -71.0,
  municipality: "Boston",
  name: "Stop Name",
  note: null,
  parking_lots: [],
  "station?": true,
  "ferry?": false,
  href: "/stops/stop-id",
  type: "station"
};

const routes: EnhancedRoute[] = [
  {
    type: 1,
    name: "Orange Line",
    long_name: "Orange Line", // eslint-disable-line camelcase
    id: "Orange",
    direction_names: { "0": "South", "1": "North" }, // eslint-disable-line camelcase
    direction_destinations: { "0": "Forest Hills", "1": "Oak Grove" }, // eslint-disable-line camelcase
    description: "rapid_transit",
    alerts: [], // eslint-disable-line camelcase
    header: "",
    line_id: null
  }
];

const otherProps = {
  tileServerUrl: "tile-server",
  tooltipData: {
    stop,
    routes,
    distanceFormatted: "0.5 miles"
  }
};

describe("MarkerWrapper", () => {
  it("renders with data", () => {
    const data: MapData = {
      default_center: {
        longitude: -72.05891,
        latitude: 44.360718
      },
      height: 250,
      markers: [],
      polylines: [],
      tile_server_url: "https://mbta-map-tiles-dev.s3.amazonaws.com",
      width: 735,
      zoom: 16
    };

    const div = document.createElement("div");
    document.body.appendChild(div);
    const wrapper = mount(
      <>
        <LeafletMap>
          <MarkerWrapper
            dispatch={() => {}}
            isSelected
            marker={marker}
            {...otherProps}
          />
        </LeafletMap>
      </>,
      {
        attachTo: div
      }
    );
    expect(
      wrapper
        .render()
        .find(".leaflet-tile")
        .prop("src")
    ).toBeUndefined();
  });
});
