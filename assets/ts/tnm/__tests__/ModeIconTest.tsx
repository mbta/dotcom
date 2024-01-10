import React from "react";
import renderer from "react-test-renderer";
import ModeIcon from "../components/ModeIcon";

it("renders a small icon if supplied a type", () => {
  const tree = renderer.create(<ModeIcon type="green_line" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a station icon if supplied a type that doesn't have an imported icon", () => {
  const tree = renderer.create(<ModeIcon type="unknown" />).toJSON();
  expect(tree).toMatchSnapshot();
});
