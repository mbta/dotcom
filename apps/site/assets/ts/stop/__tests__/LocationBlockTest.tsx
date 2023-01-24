import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import stopData from "./stopData.json";
import { StopPageData } from "../components/__stop";
import { Stop } from "../../__v3api";
import LocationBlock from "../components/LocationBlock";

const data = JSON.parse(JSON.stringify(stopData)) as StopPageData;

it("renders", () => {
  document.body.innerHTML =
    '<div><div id="react-root"><div id="test"></div></div></div>';

  const tree = renderer
    .create(
      <LocationBlock
        routes={data.routes}
        stop={data.stop}
        streetViewUrl={null}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it("uses lat/lng when linking to the trip planner", () => {
  expect(data.stop.latitude).toEqual(42.352271);
  expect(data.stop.longitude).toEqual(-71.055242);
  const latLng = `${data.stop.latitude},${data.stop.longitude}`;
  expect(
    shallow(<LocationBlock routes={[]} stop={data.stop} streetViewUrl={null} />)
      .find(".btn.btn-primary")
      .prop("href")
  ).toEqual(`/trip-planner/from/${latLng},${data.stop.name}`);
});

it("falls back to municipality if stop has no address", () => {
  const stopWithoutAddress = { ...data.stop, address: null };

  const wrapper = shallow(
    <LocationBlock routes={[]} stop={stopWithoutAddress} streetViewUrl={null} />
  );

  expect(wrapper.find(".m-stop-page__location .h3").text()).toEqual("Boston");
});

it("does not render location if stop has no address or municipality", () => {
  const stopWithoutLocation = {
    ...data.stop,
    address: null,
    municipality: null
  };

  const wrapper = shallow(
    <LocationBlock
      routes={[]}
      stop={stopWithoutLocation}
      streetViewUrl={null}
    />
  );

  expect(wrapper.find(".m-stop-page__location").exists()).toEqual(false);
  expect(wrapper.find(".m-stop-page__location-links").exists()).toEqual(true);
});
