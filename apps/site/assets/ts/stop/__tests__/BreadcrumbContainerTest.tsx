import React from "react";
import renderer from "react-test-renderer";
import stopData from "./stopData.json";
import { StopPageData } from "../components/__stop";
import BreadcrumbContainer from "../components/BreadcrumbContainer";

const data = JSON.parse(JSON.stringify(stopData)) as StopPageData;

it("it renders", () => {
  document.body.innerHTML =
    '<div><div id="react-root"><div id="test"></div></div></div>';

  const tree = renderer
    .create(<BreadcrumbContainer stop={data.stop} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
