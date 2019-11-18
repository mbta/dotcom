import React from "react";
import renderer from "react-test-renderer";
import { mount, ReactWrapper } from "enzyme";
import _diversionsData from "./diversionData.json";
import { createReactRoot } from "../../app/helpers/testUtils";
import StationDropdown from "../components/StationDropdown";
import { Diversion } from "../components/__shuttles";

const diversionsData = _diversionsData as Diversion;
// placeholder stops/stations
const stations = diversionsData.stops;

it("the station dropdown renders", () => {
  createReactRoot();
  const tree = renderer
    .create(<StationDropdown stations={stations} onSelect={s => true} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
