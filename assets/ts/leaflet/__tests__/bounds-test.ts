import { MapMarker as Marker } from "../components/__mapdata";
import getBounds from "../bounds";

const markers: Marker[] = [
  {
    icon: "vehicle-bordered-expanded",
    id: "vehicle-R-545CDFC5",
    latitude: 42.39786911010742,
    longitude: -71.13092041015625,
    rotation_angle: 90,
    tooltip_text: "Alewife train is on the way to Alewife",
    tooltip: null
  },
  {
    icon: "stop-circle-bordered-expanded",
    id: "stop-place-alfcl",
    latitude: 42.395428,
    longitude: -71.142483,
    rotation_angle: 0,
    tooltip: null,
    tooltip_text: "Alewife"
  }
];

describe("getBounds", () => {
  it("creates bounds from the list of markers", () => {
    expect(getBounds(markers)).toEqual({
      _northEast: {
        lat: markers[0].latitude,
        lng: markers[0].longitude
      },
      _southWest: {
        lat: markers[1].latitude,
        lng: markers[1].longitude
      }
    });
  });
});
