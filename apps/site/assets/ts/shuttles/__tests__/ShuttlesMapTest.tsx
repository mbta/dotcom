import React from "react";
import renderer from "react-test-renderer";

import { createReactRoot } from "../../app/helpers/testUtils";
import ShuttlesMap from "../components/ShuttlesMap";

import _diversionsData from "./diversionData.json";
import { Diversion } from "../components/__shuttles";

const diversionsData = _diversionsData as Diversion;

it("it renders", () => {
  createReactRoot();
  const tree = renderer
    .create(
      <ShuttlesMap
        shapes={diversionsData.shapes}
        stops={diversionsData.stops}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
