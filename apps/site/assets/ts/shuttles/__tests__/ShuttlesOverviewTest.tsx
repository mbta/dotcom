import React from "react";
import renderer from "react-test-renderer";
import { mount, ReactWrapper } from "enzyme";
import { createReactRoot } from "../../app/helpers/testUtils";
import ShuttlesOverview from "../components/ShuttlesOverview";
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

it("it renders", () => {
  createReactRoot();
  const tree = renderer
    .create(<ShuttlesOverview places={route.direction_destinations} />)
    .toJSON();
  expect(tree).toBeTruthy();
  expect(tree).toMatchSnapshot();
});

describe("ShuttlesOverview direction control", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<ShuttlesOverview places={route.direction_destinations} />);
  });

  it("shows 3 filtering choices", () => {
    expect(wrapper.find("button")).toHaveLength(3);
  });

  it("displays a button for each direction", () => {
    Object.values(route.direction_destinations).forEach(headsign => {
      expect(
        wrapper.containsMatchingElement(<button>{headsign}</button>)
      ).toEqual(true);
    });
  });
});
