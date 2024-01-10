import React from "react";
import renderer from "react-test-renderer";
import { createReactRoot } from "../../../app/helpers/testUtils";
import UpcomingHolidays from "../UpcomingHolidays";

it("it doesn't render if there are no holidays", () => {
  createReactRoot();
  const tree = renderer.create(<UpcomingHolidays holidays={[]} />).toJSON();
  expect(tree).toBeNull();
});
