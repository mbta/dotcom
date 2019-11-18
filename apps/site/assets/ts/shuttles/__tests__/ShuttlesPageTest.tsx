import React from "react";
import renderer from "react-test-renderer";
import { shallow, mount, ShallowWrapper, ReactWrapper } from "enzyme";
import _diversionsData from "./diversionData.json";
import { createReactRoot } from "../../app/helpers/testUtils";
import { act } from "react-dom/test-utils";
import ShuttlesPage from "../components/ShuttlesPage";
import { Route } from "../../__v3api";
import { Diversion } from "../components/__shuttles";
import ShuttlesMap from "../components/ShuttlesMap";
import StationDropdown from "../components/StationDropdown";

const diversionsData = _diversionsData as Diversion;

const route: Route = {
  description: "",
  direction_destinations: { 0: "Alewife", 1: "Ashmont / Braintree" },
  direction_names: { 0: "Inbound", 1: "Outbound" },
  id: "Red",
  name: "Red",
  long_name: "Red Line",
  type: 1
};

const greenRoute: Route = {
  description: "",
  direction_names: { "0": "Westbound", "1": "Eastbound" },
  direction_destinations: {
    "0": "Boston College / Cleveland Circle / Riverside / Heath Street",
    "1": "Park Street / Government Center / North Station / Lechmere"
  },
  id: "Green",
  name: "Green",
  long_name: "Green Line",
  type: 0
};

const names = (r: Route) => Object.values(r.direction_names);
const destinations = (r: Route) => Object.values(r.direction_destinations);

it("the shuttles page renders", () => {
  createReactRoot();
  const tree = renderer
    .create(<ShuttlesPage route={route} diversions={diversionsData} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

describe("shuttle page", () => {
  let wrapper: ShallowWrapper;
  let greenWrapper: ShallowWrapper;

  beforeAll(() => {
    wrapper = shallow(
      <ShuttlesPage route={route} diversions={diversionsData} />
    );
    greenWrapper = shallow(
      <ShuttlesPage route={greenRoute} diversions={diversionsData} />
    );
  });

  it("shows direction names for combined 'Green' Line", () => {
    destinations(greenRoute).forEach(headsign => {
      expect(
        greenWrapper.containsMatchingElement(<button>{headsign}</button>)
      ).toEqual(false);
    });
    names(greenRoute).forEach(name => {
      expect(
        greenWrapper.containsMatchingElement(<button>{name}</button>)
      ).toEqual(true);
    });
  });

  it("shows direction destinations for all other lines", () => {
    destinations(route).forEach(headsign => {
      expect(
        wrapper.containsMatchingElement(<button>{headsign}</button>)
      ).toEqual(true);
    });
    names(route).forEach(name => {
      expect(wrapper.containsMatchingElement(<button>{name}</button>)).toEqual(
        false
      );
    });
  });
});

describe("the selected", () => {
  let wrapper: ReactWrapper;

  beforeAll(() => {
    wrapper = mount(<ShuttlesPage route={route} diversions={diversionsData} />);
  });

  it("direction by default shows all stops", () => {
    const maps = wrapper.find(ShuttlesMap);
    maps.forEach(map => {
      const numStops = map.prop("stops").length;
      expect(numStops).toBe(diversionsData.stops.length);
    });
  });

  it("direction by default shows all shapes", () => {
    const maps = wrapper.find(ShuttlesMap);
    maps.forEach(map => {
      const numShapes = map.prop("shapes").length;
      expect(numShapes).toBe(diversionsData.shapes.length);
    });
  });

  it.each`
    index | direction | name
    ${0}  | ${null}   | ${"All Directions"}
    ${1}  | ${0}      | ${route.direction_destinations["0"]}
    ${2}  | ${1}      | ${route.direction_destinations["1"]}
  `(
    "direction $direction <button> has name $name",
    ({ index, direction, name }) => {
      expect(
        wrapper
          .find("button")
          .at(index)
          .text()
      ).toEqual(name);
    }
  );

  it.each`
    index | direction | stops                                                                                                | shapes
    ${0}  | ${null}   | ${diversionsData.stops.length}                                                                       | ${diversionsData.shapes.length}
    ${1}  | ${0}      | ${diversionsData.stops.filter(stop => stop.direction_id === 0 || stop.direction_id === null).length} | ${diversionsData.shapes.filter(shape => shape.direction_id === 0).length}
    ${2}  | ${1}      | ${diversionsData.stops.filter(stop => stop.direction_id === 1 || stop.direction_id === null).length} | ${diversionsData.shapes.filter(shape => shape.direction_id === 1).length}
  `(
    "direction $direction <button> returns $stops stops and $shapes shapes",
    ({ index, direction, stops, shapes }) => {
      act(() => {
        wrapper
          .find("button")
          .at(index)
          .simulate("click");
      });

      wrapper.update();
      wrapper.find(ShuttlesMap).forEach(map => {
        expect(map.prop("stops").length).toEqual(stops);
        expect(map.prop("shapes").length).toEqual(shapes);
      });
    }
  );

  it("station <select> lists affected stations only", () => {
    const options = wrapper
      .find(StationDropdown)
      .find("select option")
      .map(node => node.text());
    const affected_stations = diversionsData.stops
      .sort()
      .filter(s => s.type === "rail_affected")
      .map(s => s.name);
    expect(options).toEqual(affected_stations);
  }, 2000);

  it("station by default shows first affected station on map", () => {
    let map = wrapper.find(ShuttlesMap).at(1);
    const first_station = diversionsData.stops
      .sort()
      .filter(s => s.type === "rail_affected")[0];
    expect(map.prop("center")).toEqual({
      latitude: first_station.latitude,
      longitude: first_station.longitude
    });
  });

  it("station <select> adjusts map center", () => {
    const first_station = diversionsData.stops
      .sort()
      .filter(s => s.type === "rail_affected")[0];
    const other_station = diversionsData.stops
      .sort()
      .filter(s => s.type === "rail_affected")[1];

    act(() => {
      wrapper
        .find("select")
        .simulate("change", { target: { value: other_station.id } });
    });

    wrapper.update();
    let map = wrapper.find(ShuttlesMap).at(1);
    expect(map.prop("center")).not.toEqual({
      latitude: first_station.latitude,
      longitude: first_station.longitude
    });
    expect(map.prop("center")).toEqual({
      latitude: other_station.latitude,
      longitude: other_station.longitude
    });
  });
});
