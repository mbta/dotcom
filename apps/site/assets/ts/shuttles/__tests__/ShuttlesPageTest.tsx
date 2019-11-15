import React from "react";
import renderer from "react-test-renderer";
import { mount, ReactWrapper } from "enzyme";
import { createReactRoot } from "../../app/helpers/testUtils";
import ShuttlesPage from "../components/ShuttlesPage";
import { Route } from "../../__v3api";

const route: Route = {
  description: "",
  direction_destinations: { 0: "Oak Grove", 1: "Forest Hills" },
  direction_names: { 0: "Inbound", 1: "Outbound" },
  id: "Orange",
  name: "Orange",
  long_name: "Orange Line",
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

it("it renders", () => {
  createReactRoot();
  const tree = renderer.create(<ShuttlesPage route={route} />).toJSON();
  expect(tree).toBeTruthy();
  expect(tree).toMatchSnapshot();
});

describe("it passes to ShuttlesOverview", () => {
  let wrapper: ReactWrapper;
  let greenWrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<ShuttlesPage route={route} />);
    greenWrapper = mount(<ShuttlesPage route={greenRoute} />);
  });

  it("direction names for Green Line case", () => {
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

  it("direction destinations for non-Green Line case", () => {
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
