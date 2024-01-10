import React from "react";
import renderer from "react-test-renderer";
import { createReactRoot } from "../../../app/helpers/testUtils";
import ContentTeasers from "../ContentTeasers";

it("it doesn't render if there are no teasers", () => {
  createReactRoot();
  const tree = renderer.create(<ContentTeasers teasers={null} />).toJSON();
  expect(tree).toBeNull();
});
