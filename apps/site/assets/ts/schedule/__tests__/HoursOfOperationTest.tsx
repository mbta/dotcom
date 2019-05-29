import React from "react";
import renderer from "react-test-renderer";
import { createReactRoot } from "../../app/helpers/testUtils";
import HoursOfOperation from "../components/HoursOfOperation";

it("it doesn't render if there are no hours", () => {
  createReactRoot();
  const tree = renderer.create(<HoursOfOperation hours="" />).toJSON();
  expect(tree).toBeNull();
});
