import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import _diversionsData from "./diversionData.json";
import ShuttlesPage from "../components/ShuttlesPage";
import { Route } from "../../__v3api";
import { Diversion } from "../components/__shuttles";
import { TileServerUrl } from "../../leaflet/components/__mapdata";
import ShuttlesMap from "../components/ShuttlesMap";
import StopDropdown from "../components/StopDropdown";
import renderer from "react-test-renderer";
import DirectionButtons from "../components/DirectionButtons";

const diversionsData = _diversionsData as Diversion;
const tileServerUrl: TileServerUrl =
  "https://mbta-map-tiles-dev.s3.amazonaws.com";

const route: Route = {
  color: "red",
  description: "",
  direction_destinations: { 0: "Alewife", 1: "Ashmont / Braintree" },
  direction_names: { 0: "Inbound", 1: "Outbound" },
  id: "Red",
  name: "Red",
  long_name: "Red Line",
  type: 1
};

const greenRoute: Route = {
  color: "green",
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

jest.mock("react-leaflet/lib/Map");
let wrapper: ShallowWrapper;
let greenWrapper: ShallowWrapper;

/* use shallow instead of mount. mount throws Uncaught [RangeError: Maximum call stack size exceeded]
from a dependency, fast-deep-equal, used to memoize the Map component ShuttlesMap is based on. */
beforeEach(() => {
  wrapper = shallow(
    <ShuttlesPage
      route={route}
      diversions={diversionsData}
      tileServerUrl={tileServerUrl}
    />
  );
  greenWrapper = shallow(
    <ShuttlesPage
      route={greenRoute}
      diversions={diversionsData}
      tileServerUrl={tileServerUrl}
    />
  );
});

afterEach(() => {
  wrapper!.unmount();
  greenWrapper!.unmount();
});

it("the shuttles page renders", () => {
  const tree = renderer
    .create(
      <ShuttlesPage
        route={route}
        diversions={diversionsData}
        tileServerUrl={tileServerUrl}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("the shuttles page shows direction names for combined 'Green' Line", () => {
  destinations(greenRoute).forEach(headsign => {
    expect(
      greenWrapper
        .find(DirectionButtons)
        .dive()
        .containsMatchingElement(<button>{headsign}</button>)
    ).toEqual(false);
  });
  names(greenRoute).forEach(name => {
    expect(
      greenWrapper
        .find(DirectionButtons)
        .dive()
        .containsMatchingElement(<button>{name}</button>)
    ).toEqual(true);
  });
});

it("the shuttles page shows direction destinations for all other lines", () => {
  destinations(route).forEach(headsign => {
    expect(
      wrapper
        .find(DirectionButtons)
        .dive()
        .containsMatchingElement(<button>{headsign}</button>)
    ).toEqual(true);
  });
  names(route).forEach(name => {
    expect(
      wrapper
        .find(DirectionButtons)
        .dive()
        .containsMatchingElement(<button>{name}</button>)
    ).toEqual(false);
  });
});

it("the shuttles page by default shows all stops", () => {
  wrapper.find(ShuttlesMap).forEach(
    (node: any): void => {
      const numStops = node.prop("stops").length;
      expect(numStops).toBe(diversionsData.stops.length);
    }
  );
});

it("the shuttles page by default shows all shapes", () => {
  wrapper.find(ShuttlesMap).forEach(
    (node: any): void => {
      const numShapes = node.prop("shapes").length;
      expect(numShapes).toBe(diversionsData.shapes.length);
    }
  );
});

it("the shuttles page <select> lists affected stops only", () => {
  const options = wrapper
    .find(StopDropdown)
    .dive()
    .find("select option")
    .map((node: ShallowWrapper) => node.text());
  const affectedStops = diversionsData.stops
    .sort()
    .filter(s => s.type === "rail_affected")
    .map(s => s.name);
  expect(options).toEqual(affectedStops);
});

it("the shuttles page detail map by default views first affected stop", () => {
  let map = wrapper.find(ShuttlesMap).at(1);
  const firstStation = diversionsData.stops
    .sort()
    .filter(s => s.type === "rail_affected")[0];
  expect(map.prop("selectedStop")!.id).toEqual(firstStation.id);
});
