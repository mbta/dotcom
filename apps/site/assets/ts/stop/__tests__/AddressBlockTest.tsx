import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import stopData from "./stopData.json";
import { StopPageData } from "../components/__stop";
import { Stop } from "../../__v3api";
import AddressBlock from "../components/AddressBlock";

const data = JSON.parse(JSON.stringify(stopData)) as StopPageData;

it("renders", () => {
  document.body.innerHTML =
    '<div><div id="react-root"><div id="test"></div></div></div>';

  const tree = renderer
    .create(
      <AddressBlock
        routes={data.routes}
        stop={data.stop}
        encoder={window.encodeURIComponent}
        streetViewUrl={null}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it("uses lat/lng when window.encodeURIComponent isn't available", () => {
  expect(data.stop.address).toEqual("700 Atlantic Ave, Boston, MA 02110");
  expect(data.stop.latitude).toEqual(42.352271);
  expect(data.stop.longitude).toEqual(-71.055242);
  const encodedAddress = window.encodeURIComponent(data.stop.address!);
  const latLng = `${data.stop.latitude},${data.stop.longitude}`;
  expect(
    shallow(
      <AddressBlock
        routes={[]}
        stop={data.stop}
        encoder={window.encodeURIComponent}
        streetViewUrl={null}
      />
    )
      .find(".btn.btn-primary")
      .prop("href")
  ).toEqual(
    `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`
  );

  expect(
    shallow(<AddressBlock routes={[]} stop={data.stop} streetViewUrl={null} />)
      .find(".btn.btn-primary")
      .prop("href")
  ).toEqual(`https://www.google.com/maps/dir/?api=1&destination=${latLng}`);
});

it("does not render address if stop has no address", () => {
  expect(
    shallow(<AddressBlock routes={[]} stop={data.stop} streetViewUrl={null} />)
      .find(".m-stop-page__address")
      .exists()
  ).toEqual(true);

  const stopWithoutAddress: Stop = { ...data.stop, address: null };

  const wrapper = shallow(
    <AddressBlock routes={[]} stop={stopWithoutAddress} streetViewUrl={null} />
  );

  expect(wrapper.find(".m-stop-page__address").exists()).toEqual(false);
  expect(wrapper.find(".m-stop-page__address-links").exists()).toEqual(true);
});
