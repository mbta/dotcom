import React from "react";
import { mount } from "enzyme";
import Map from "../components/Map";
import { MapData, MapMarker } from "../components/__mapdata";
import getBounds from "../bounds";
import { Marker } from "react-leaflet";

/* eslint-disable camelcase */
const marker: MapMarker = {
  icon: "test",
  id: "marker",
  latitude: 42.43668,
  longitude: -71.071097,
  rotation_angle: 0,
  tooltip: null,
  tooltip_text: null
};

const data: MapData = {
  default_center: {
    longitude: -72.05891,
    latitude: 44.360718
  },
  height: 250,
  markers: [marker],
  polylines: [],
  tile_server_url: "https://mbta-map-tiles-dev.s3.amazonaws.com",
  width: 735,
  zoom: 16
};

it("it renders using the marker's position and zoom", () => {
  const div = document.createElement("div");
  document.body.appendChild(div);
  const wrapper = mount(<Map mapData={data} />, {
    attachTo: div
  });
  expect(
    wrapper
      .render()
      .find(".leaflet-tile")
      .prop("src")
  ).toBe(`${data.tile_server_url}/osm_tiles/16/19829/24220.png`);
});

it("it renders using the marker's position and no zoom", () => {
  const div = document.createElement("div");
  document.body.appendChild(div);
  const wrapper = mount(
    <Map mapData={{ ...data, zoom: null }} bounds={getBounds([marker])} />,
    {
      attachTo: div
    }
  );
  expect(
    wrapper
      .render()
      .find(".leaflet-tile")
      .prop("src")
  ).toBe(`${data.tile_server_url}/osm_tiles/18/79319/96882.png`);
});

it("it renders using the default center position", () => {
  const dataWithoutMarkers: MapData = { ...data, markers: [] };
  const div = document.createElement("div");
  document.body.appendChild(div);
  const wrapper = mount(<Map mapData={dataWithoutMarkers} />, {
    attachTo: div
  });
  expect(
    wrapper
      .render()
      .find(".leaflet-tile")
      .prop("src")
  ).toBe(`${data.tile_server_url}/osm_tiles/16/19650/23738.png`);
});

it("it renders a marker with vehicle crowding info", () => {
  const dataWithCrowding: MapData = {
    ...data,
    markers: [{ ...marker, vehicle_crowding: "some_crowding" }]
  };
  const div = document.createElement("div");
  document.body.appendChild(div);
  const wrapper = mount(<Map mapData={dataWithCrowding} />, {
    attachTo: div
  });

  expect(wrapper.find(Marker)).toHaveLength(1);
});
/* eslint-disable camelcase */
