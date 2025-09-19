import { mount } from "enzyme";
import React from "react";
import { TileLayer } from "react-leaflet";
import {
  MapData,
  MapMarker as Marker
} from "../../../leaflet/components/__mapdata";
import Map, { iconOpts, reducer } from "../Map";

/* eslint-disable camelcase */
const data: MapData = {
  zoom: 16,
  width: 600,
  tile_server_url: "https://mbta-map-tiles-dev.s3.amazonaws.com",
  polylines: [],
  stop_markers: [
    {
      icon: "stop-circle-bordered-expanded",
      id: "stop-place-alfcl",
      latitude: 42.395428,
      longitude: -71.142483,
      rotation_angle: 0,
      tooltip: null,
      tooltip_text: "Alewife",
      shape_id: "1"
    }
  ],
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
      tooltip_text: "Alewife",
      shape_id: "1"
    }
  ],
  height: 600,
  default_center: {
    longitude: -71.05891,
    latitude: 42.360718
  }
};
/* eslint-enable camelcase */

describe("Schedule Map", () => {
  it("renders", () => {
    const wrapper = mount(
      <Map
        data={data}
        channel="vehicles:Red:0"
        currentShapes={["1", "2"]}
        currentStops={["stop-place-alfcl", "22", "33"]}
      />
    );
    expect(() => wrapper.render()).not.toThrow();
  });

  it("renders and matches snapshot", () => {
    const wrapper = mount(
      <Map
        data={data}
        channel="vehicles:Red:0"
        currentShapes={["1", "2"]}
        currentStops={["stop-place-alfcl", "22", "33"]}
      />
    );
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("adds class name after map load", () => {
    const wrapper = mount(
      <Map
        data={data}
        channel="vehicles:Red:0"
        currentShapes={["1", "2"]}
        currentStops={["stop-place-alfcl", "22", "33"]}
      />
    );

    expect(wrapper.html()).not.toContain("map--loaded");

    const onMapLoad: Function = wrapper.find(TileLayer).prop("onload");
    expect(onMapLoad).toBeInstanceOf(Function);

    // simulate the map load event being fired
    onMapLoad();

    expect(wrapper.html()).toContain("map--loaded");
  });
});

describe("reducer", () => {
  const newMarker: Marker = {
    icon: "vehicle-bordered-expanded",
    id: "vehicle-R-545CDFC6",
    latitude: 42.39786911010742,
    longitude: -71.13092041015625,
    // eslint-disable-next-line camelcase
    rotation_angle: 90,
    // eslint-disable-next-line camelcase
    tooltip_text: "Alewife train is on the way to Alewife",
    tooltip: null,
    // eslint-disable-next-line camelcase
    shape_id: "1"
  };

  it("resets markers", () => {
    const result = reducer(
      { markers: data.markers },
      {
        event: "reset",
        data: [{ marker: newMarker }]
      }
    );

    expect(result.markers.map(m => m.id)).toEqual([
      data.markers[1].id,
      newMarker.id
    ]);
  });

  it("adds vehicles", () => {
    const result = reducer(
      { markers: data.markers },
      {
        event: "add",
        data: [{ marker: newMarker }]
      }
    );
    expect(result.markers.map(m => m.id)).toEqual(
      data.markers.map(m => m.id).concat(newMarker.id)
    );
  });

  it("updates markers", () => {
    const result = reducer(
      { markers: data.markers },
      {
        event: "update",
        data: [{ marker: { ...data.markers[0], latitude: 43.0 } }]
      }
    );

    expect(result.markers.map(m => m.id)).toEqual(data.markers.map(m => m.id));
    expect(data.markers[0].latitude).toEqual(42.39786911010742);
    expect(result.markers[0].latitude).toEqual(43.0);
  });

  it("handles empty data actions", () => {
    const result = reducer(
      { markers: data.markers },
      { event: "update", data: [] }
    );

    expect(result.markers).toEqual(data.markers);
  });

  it("removes markers", () => {
    const result = reducer(
      { markers: data.markers },
      {
        event: "remove",
        data: [data.markers[0].id!]
      }
    );

    expect(result.markers.map(m => m.id)).toEqual([data.markers[1].id]);
  });
});

describe("iconOpts", () => {
  it("handles stop markers", () => {
    expect(iconOpts(data.markers[1].icon)).toEqual({
      icon_size: [12, 12], // eslint-disable-line camelcase
      icon_anchor: [6, 6] // eslint-disable-line camelcase
    });
  });

  it("throws an error if it received an unknown icon type", () => {
    expect(() => iconOpts("unknown")).toThrowError();
  });

  it("does not throw error when icon is null", () => {
    expect(iconOpts(null)).toEqual({});
  });
});
