import React from "react";
import renderer from "react-test-renderer";
import Feedback from "../Feedback";
import { createReactRoot } from "../../app/helpers/testUtils";

test("it renders", () => {
  createReactRoot();
  document.title = "Some title";

  const tree = renderer.create(<Feedback />).toJSON();
  expect(tree).toMatchSnapshot();
});
