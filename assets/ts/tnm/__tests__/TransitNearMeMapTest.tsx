import React from "react";
import renderer from "react-test-renderer";
import TransitNearMeMap, {
  withinHalfMile,
  boundsForMap,
  isMarkerVisible,
  buildStopsForMarkers
} from "../components/leaflet/TransitNearMeMap";
import { createReactRoot } from "../../app/helpers/testUtils";
import { MapMarker } from "../../leaflet/components/__mapdata";
import { Stop, EnhancedRoute } from "../../__v3api";
import { StopWithRoutes } from "../components/__tnm";

const marker: MapMarker = {
  icon: null,
  id: "current-location",
  latitude: 25,
  longitude: 25,
  // eslint-disable-next-line camelcase
  rotation_angle: 0,
  size: [25, 25],
  tooltip: null
};

it("it renders without initial markers", () => {
  createReactRoot();
  const tree = renderer
    .create(
      <TransitNearMeMap
        dispatch={() => {}}
        selectedStopId={null}
        stopData={[]}
        selectedModes={[]}
        shouldFilterMarkers={false}
        shouldCenterMapOnSelectedStop={false}
        /* eslint-disable camelcase */
        initialData={{
          markers: [],
          zoom: 14,
          width: 630,
          default_center: {
            latitude: 0,
            longitude: 0
          },
          height: 630,
          polylines: [],
          tile_server_url: ""
        }}
        /* eslint-enable camelcase */
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("it renders with initial markers", () => {
  createReactRoot();
  const tree = renderer
    .create(
      <TransitNearMeMap
        dispatch={() => {}}
        selectedStopId={null}
        stopData={[]}
        selectedModes={[]}
        shouldFilterMarkers={false}
        shouldCenterMapOnSelectedStop={false}
        initialData={{
          zoom: 14,
          width: 630,
          /* eslint-disable camelcase */
          markers: [marker],
          default_center: {
            latitude: 0,
            longitude: 0
          },
          height: 630,
          polylines: [],
          tile_server_url: ""
        }}
        /* eslint-enable camelcase */
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

const defaultCenter: { latitude: number; longitude: number } = {
  latitude: -72.05891,
  longitude: 44.360718
};
const location: [number, number] = [-72.05891, 44.360718];

describe("withinHalfMile", () => {
  it("returns bounds within a half mile radius of the provided location", () => {
    const bounds = withinHalfMile(location);
    expect(bounds.getNorthEast()).toEqual({ lat: -72.050577, lng: 44.360718 });
    expect(bounds.getSouthWest()).toEqual({
      lat: -72.06724299999999,
      lng: 44.360718
    });
  });
});

describe("boundsForMap", () => {
  it("returns bounds within a half mile of the current location if provided", () => {
    const bounds = boundsForMap([marker], defaultCenter);
    expect(bounds).toEqual({
      _northEast: { lat: 25.008333, lng: 25 },
      _southWest: { lat: 24.991667, lng: 25 }
    });
  });

  it("returns bounds within a half mile of the default center if no current location", () => {
    const bounds = boundsForMap([], defaultCenter);
    expect(bounds).toEqual({
      _northEast: { lat: -72.050577, lng: 44.360718 },
      _southWest: { lat: -72.06724299999999, lng: 44.360718 }
    });
  });
});

const stop: Stop = {
  accessibility: ["wheelchair"],
  address: "123 Main St., Boston MA",
  /* eslint-disable camelcase */
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
  /* eslint-enable camelcase */
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

const stopData: StopWithRoutes = {
  stop,
  // eslint-disable-next-line camelcase
  routes: [{ group_name: "subway", routes }],
  distance: "3ft"
};
describe("isMarkerVisible", () => {
  it("marker is visible if marker has mode and modes are selected", () => {
    const isVisible = isMarkerVisible(stopData, true, ["subway"]);
    expect(isVisible).toBeTruthy();
  });
  it("marker is not visible if marker doesn't have mode and modes are selected", () => {
    const isVisible = isMarkerVisible(stopData, true, ["commuter_rail"]);
    expect(isVisible).toBeFalsy();
  });
  it("marker is visible if there is no stop data, or filter markers", () => {
    expect(isMarkerVisible(undefined, true, [])).toBeTruthy();
    expect(isMarkerVisible({} as any, false, [])).toBeTruthy();
  });
});

describe("buildStopsForMarker", () => {
  it("takes a StopWithRoutes[] and turns it into a map for tooltips of [stop_id] -> { routes: all_routes, distanceFormatted: distance, stop: stop }", () => {
    const tooltipData = buildStopsForMarkers([stopData]);
    expect(tooltipData[stop.id]).toEqual({
      distanceFormatted: "3ft",
      routes,
      stop
    });
  });
});
