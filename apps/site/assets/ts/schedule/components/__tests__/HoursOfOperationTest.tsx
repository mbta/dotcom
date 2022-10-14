import React from "react";
import renderer from "react-test-renderer";
import { createReactRoot } from "../../../app/helpers/testUtils";
import { EnhancedRoute } from "../../../__v3api";
import HoursOfOperation from "../HoursOfOperation";

it("it doesn't render if there are no hours", () => {
  createReactRoot();
  const route = { id: "Silver", description: "Bus Service" } as EnhancedRoute;
  const tree = renderer
    .create(<HoursOfOperation hours="" pdfs={[]} route={route} />)
    .toJSON();
  expect(tree).toBeNull();
});
