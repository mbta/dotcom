import React from "react";
import { mount, ReactWrapper } from "enzyme";
import ShuttlesMap from "../components/ShuttlesMap";
import { Diversion } from "../components/__shuttles";
import _diversionsData from "./diversionData.json";
import { TileServerUrl } from "../../leaflet/components/__mapdata";

const { shapes, stops } = _diversionsData as Diversion;
const affectedStops = stops.filter(stop => stop.type === "rail_affected");
const unaffectedStops = stops.filter(stop => stop.type === "rail_unaffected");

const tileServerUrl: TileServerUrl =
  "https://mbta-map-tiles-dev.s3.amazonaws.com";

beforeAll(() => {
  /* mock the react-leaflet Map component so we can deep render without error */
  jest.mock("react-leaflet/lib/Map");
});

describe("the shuttles map without a selected stop", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(
      <ShuttlesMap
        tileServerUrl={tileServerUrl}
        shapes={shapes}
        stops={stops}
      />
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("matches snapshot", () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("uses the given stops", () => {
    const mapDataProps = wrapper
      .find(".m-shuttles-map")
      .childAt(0)
      .prop("mapData");
    expect(mapDataProps.markers.length).toEqual(stops.length);
    expect(mapDataProps.markers.map((m: any) => m.shape_id)).toEqual(
      stops.map(s => s.id)
    );
  });

  it("uses the given shapes", () => {
    const mapDataProps = wrapper
      .find(".m-shuttles-map")
      .childAt(0)
      .prop("mapData");
    expect(mapDataProps.polylines.length).toEqual(shapes.length);
    expect(mapDataProps.polylines.map((p: any) => p.id)).toEqual(
      shapes.map((s, i) => `${s.id}-${i}`)
    );
  });

  it("bounds all affected rail stops, but not unaffected stops", () => {
    const bounds = wrapper
      .find(".m-shuttles-map")
      .childAt(0)
      .prop("bounds");

    affectedStops.forEach(({ latitude, longitude }) =>
      expect(bounds.contains([latitude, longitude])).toBe(true)
    );
    unaffectedStops.forEach(({ latitude, longitude }) =>
      expect(bounds.contains([latitude, longitude])).toBe(false)
    );
  });
});

describe("the shuttles map with a selected stop", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(
      <ShuttlesMap
        tileServerUrl={tileServerUrl}
        shapes={shapes}
        stops={stops}
        selectedStop={affectedStops[0]}
      />
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("matches snapshot", () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("bounds the selected stop, but not other affected stops", () => {
    const bounds = wrapper
      .find(".m-shuttles-map")
      .childAt(0)
      .prop("bounds");
    const { latitude: selectedLat, longitude: selectedLng } = affectedStops[0];

    expect(bounds.contains([selectedLat, selectedLng])).toBe(true);
    affectedStops
      .slice(1)
      .forEach(({ latitude, longitude }) =>
        expect(bounds.contains([latitude, longitude])).toBe(false)
      );
  });
});
