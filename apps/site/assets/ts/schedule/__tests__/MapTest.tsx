import React from "react";
import { mount } from "enzyme";
import Map, { getBounds, iconOpts, reducer } from "../components/Map";
import {
  MapData,
  MapMarker as Marker
} from "../../leaflet/components/__mapdata";

/* eslint-disable @typescript-eslint/camelcase */
const data: MapData = {
  zoom: 16,
  width: 600,
  tile_server_url: "https://mbta-map-tiles-dev.s3.amazonaws.com",
  polylines: [],
  markers: [
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
  ],
  height: 600,
  default_center: {
    longitude: -71.05891,
    latitude: 42.360718
  }
};
/* eslint-enable typescript/camelcase */

describe("getBounds", () => {
  it("creates bounds from the list of markers", () => {
    expect(getBounds(data.markers)).toEqual({
      _northEast: {
        lat: data.markers[0].latitude,
        lng: data.markers[0].longitude
      },
      _southWest: {
        lat: data.markers[1].latitude,
        lng: data.markers[1].longitude
      }
    });
  });
});

describe("Schedule Map", () => {
  it("renders", () => {
    const wrapper = mount(<Map data={data} channel="vehicles:Red:0" />);
    expect(() => wrapper.render()).not.toThrow();
  });
});

describe("reducer", () => {
  const newMarker: Marker = {
    icon: "vehicle-bordered-expanded",
    id: "vehicle-R-545CDFC6",
    latitude: 42.39786911010742,
    longitude: -71.13092041015625,
    // eslint-disable-next-line typescript/camelcase
    rotation_angle: 90,
    // eslint-disable-next-line typescript/camelcase
    tooltip_text: "Alewife train is on the way to Alewife",
    tooltip: null
  };

  it("resets markers", () => {
    const result = reducer(data.markers, {
      event: "reset",
      data: [{ marker: newMarker }]
    });

    expect(result.map(m => m.id)).toEqual([data.markers[1].id, newMarker.id]);
  });

  it("adds vehicles", () => {
    const result = reducer(data.markers, {
      event: "add",
      data: [{ marker: newMarker }]
    });
    expect(result.map(m => m.id)).toEqual(
      data.markers.map(m => m.id).concat(newMarker.id)
    );
  });

  it("updates markers", () => {
    const result = reducer(data.markers, {
      event: "update",
      data: [{ marker: { ...data.markers[0], latitude: 43.0 } }]
    });

    expect(result.map(m => m.id)).toEqual(data.markers.map(m => m.id));
    expect(data.markers[0].latitude).toEqual(42.39786911010742);
    expect(result[0].latitude).toEqual(43.0);
  });

  it("removes markers", () => {
    const result = reducer(data.markers, {
      event: "remove",
      data: [data.markers[0].id!]
    });

    expect(result.map(m => m.id)).toEqual([data.markers[1].id]);
  });
});

describe("iconOpts", () => {
  it("throws an error if it received an unknown icon type", () => {
    expect(() => iconOpts("unknown")).toThrowError();
  });

  it("does not throw error when icon is null", () => {
    expect(iconOpts(null)).toEqual({});
  });
});
