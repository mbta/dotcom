import React from "react";
import { mount } from "enzyme";
import Fares, { fareNames } from "../../components/sidebar/Fares";

import { createReactRoot } from "../../../app/helpers/testUtils";
import { Stop } from "../../../__v3api";
import { RetailLocationWithDistance } from "../../components/__stop";

/* eslint-disable camelcase */

const stop: Stop = {
  type: "station",
  "station?": true,
  parking_lots: [],
  note: null,
  name: "South Station",
  longitude: -71.055242,
  latitude: 42.352271,
  "is_child?": false,
  id: "place-sstat",
  "has_fare_machine?": true,
  "has_charlie_card_vendor?": false,
  closed_stop_info: null,
  address: "700 Atlantic Ave, Boston, MA 02110",
  municipality: "Boston",
  bike_storage: [],
  fare_facilities: [
    "fare_vending_machine",
    "fare_media_assistant",
    "ticket_window"
  ],
  accessibility: [
    "accessible",
    "escalator_both",
    "elevator",
    "fully_elevated_platform"
  ]
};

const headerId = "#header-fares";
const bodyId = "#fares";

const retailLocation: RetailLocationWithDistance = {
  distance: "123 ft",
  location: {
    name: "Store Name",
    address: "123 Main St., Boston MA",
    phone: "617-555-1234",
    latitude: 42.0,
    longitude: -71.0,
    payment: ["credit_card"]
  }
};

describe("Fares", () => {
  it("renders", () => {
    createReactRoot();
    const wrapper = mount(
      <Fares stop={stop} retailLocations={[retailLocation]} />
    );
    wrapper.find(headerId).simulate("click");
    const body = wrapper.find(bodyId);
    expect(body.text()).toContain(stop.name);
  });

  it("lists fare facilities if fare facilities exist", () => {
    createReactRoot();
    const wrapper = mount(<Fares stop={stop} retailLocations={[]} />);
    wrapper.find(headerId).simulate("click");
    const body = wrapper.find(bodyId);
    expect(body.text()).toContain(`You may purchase fares at ${stop.name}`);
    stop.fare_facilities.forEach(facility => {
      const fareName = fareNames[facility];
      expect(typeof fareName).toEqual("string");
      expect(body.text()).toContain(fareName);
    });
  });

  it("does not list fare facilities if facilities list is empty", () => {
    createReactRoot();
    const stopWithoutFacilities = { ...stop, fare_facilities: [] };
    const wrapper = mount(
      <Fares stop={stopWithoutFacilities} retailLocations={[]} />
    );
    wrapper.find(headerId).simulate("click");
    const body = wrapper.find(bodyId);
    expect(body.text()).toContain(`Fares cannot be purchased at ${stop.name}`);
    Object.keys(fareNames).forEach(name =>
      expect(body.text()).not.toContain(name)
    );
  });

  it("renders nearby retail locations", () => {
    createReactRoot();
    const wrapper = mount(
      <Fares stop={stop} retailLocations={[retailLocation]} />
    );
    wrapper.find(headerId).simulate("click");
    const body = wrapper.find(bodyId);
    expect(body.text()).toContain("Retail Sales Locations");
    expect(body.text()).toContain(retailLocation.distance);
    expect(body.text()).toContain(retailLocation.location.name);
    expect(body.text()).toContain(retailLocation.location.address);
  });

  it("does not render nearby retail locations if list is empty", () => {
    createReactRoot();
    const wrapper = mount(<Fares stop={stop} retailLocations={[]} />);
    wrapper.find(headerId).simulate("click");
    const body = wrapper.find(bodyId);
    expect(body.text()).not.toContain("Retail Sales Locations");
  });
});
