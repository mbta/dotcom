import React from "react";
import { mount, ReactWrapper } from "enzyme";
import ShuttlesMap from "../components/ShuttlesMap";
import { Diversion } from "../components/__shuttles";
import _diversionsData from "./diversionData.json";
import { TileServerUrl } from "../../leaflet/components/__mapdata";

const diversionsData = _diversionsData as Diversion;
const centerStop = diversionsData.stops[0];

const tileServerUrl: TileServerUrl =
  "https://mbta-map-tiles-dev.s3.amazonaws.com";

beforeAll(() => {
  /* mock the react-leaflet Map component so we can deep render without error */
  jest.mock("react-leaflet/lib/Map");
});

describe("the shuttles map without a center prop", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(
      <ShuttlesMap
        tileServerUrl={tileServerUrl}
        shapes={diversionsData.shapes}
        stops={diversionsData.stops}
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
    expect(mapDataProps.markers.length).toEqual(diversionsData.stops.length);
    expect(mapDataProps.markers.map((m: any) => m.shape_id)).toEqual(
      diversionsData.stops.map(s => s.id)
    );
  });

  it("uses the given shapes", () => {
    const mapDataProps = wrapper
      .find(".m-shuttles-map")
      .childAt(0)
      .prop("mapData");
    expect(mapDataProps.polylines.length).toEqual(diversionsData.shapes.length);
    expect(mapDataProps.polylines.map((p: any) => p.id)).toEqual(
      diversionsData.shapes.map((s, i) => `${s.id}-${i}`)
    );
  });

  it("has zoom level 13", () => {
    const mapDataProps = wrapper
      .find(".m-shuttles-map")
      .childAt(0)
      .prop("mapData");
    expect(mapDataProps.zoom).toEqual(13);
  });
});

describe("the shuttles map with a centerStop prop", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(
      <ShuttlesMap
        tileServerUrl={tileServerUrl}
        shapes={diversionsData.shapes}
        stops={diversionsData.stops}
        centerStop={centerStop}
      />
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("matches snapshot", () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("uses the given center", () => {
    const mapDataProps = wrapper
      .find(".m-shuttles-map")
      .childAt(0)
      .prop("mapData");
    const centerCoordinates = {
      latitude: centerStop.latitude,
      longitude: centerStop.longitude
    };
    expect(mapDataProps.default_center).toEqual(centerCoordinates);
  });

  it("has zoom level 18", () => {
    const mapDataProps = wrapper
      .find(".m-shuttles-map")
      .childAt(0)
      .prop("mapData");
    expect(mapDataProps.zoom).toEqual(18);
  });
});
