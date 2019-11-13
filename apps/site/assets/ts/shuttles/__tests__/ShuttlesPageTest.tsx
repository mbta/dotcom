import React from "react";
import renderer from "react-test-renderer";
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

it("it renders", () => {
  createReactRoot();
  const tree = renderer.create(<ShuttlesPage route={route} />).toJSON();
  expect(tree).toBeTruthy();
  expect(tree).toMatchSnapshot();
});
