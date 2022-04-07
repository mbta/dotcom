import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import stopData from "../stopData.json";
import Accessibility from "../../components/sidebar/Accessibility";
import { Stop } from "../../../__v3api";
import { StopPageData, TypedRoutes } from "../../components/__stop";
import { createReactRoot } from "../../../app/helpers/testUtils";

const data = JSON.parse(JSON.stringify(stopData)) as StopPageData;
/* eslint-disable camelcase */

const stop: Stop = {
  type: "station",
  "station?": true,
  parking_lots: [],
  note: null,
  name: "South Station",
  bike_storage: [],
  fare_facilities: [],
  longitude: -71.055242,
  latitude: 42.352271,
  "is_child?": false,
  id: "place-sstat",
  "has_fare_machine?": true,
  "has_charlie_card_vendor?": false,
  closed_stop_info: null,
  address: "700 Atlantic Ave, Boston, MA 02110",
  municipality: "Boston",
  accessibility: [
    "accessible",
    "escalator_both",
    "elevator",
    "fully_elevated_platform"
  ]
};

describe("Accessibility", () => {
  it("it renders", () => {
    createReactRoot();
    const tree = renderer
      .create(
        <Accessibility
          routes={data.routes}
          stop={stop}
          isExpanded
          isFocused={false}
          dispatch={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("it renders without extra data on accessible", () => {
    createReactRoot();
    const stopWithoutFeatures = { ...stop, accessibility: ["accessible"] };
    const wrapper = mount(
      <Accessibility
        routes={data.routes}
        stop={stopWithoutFeatures}
        isExpanded
        isFocused={false}
        dispatch={() => {}}
      />
    );
    expect(wrapper.find("#accessibility-level").text()).toContain(
      "South Station is accessible."
    );
    expect(wrapper.find("#accessibility-features").exists()).toBeFalsy();
  });

  it("it renders with unknown accessibility", () => {
    createReactRoot();
    const stopWithoutFeatures = { ...stop, accessibility: ["unknown"] };
    const wrapper = mount(
      <Accessibility
        routes={data.routes}
        stop={stopWithoutFeatures}
        isExpanded
        isFocused={false}
        dispatch={() => {}}
      />
    );
    expect(wrapper.find("#accessibility-level").text()).toContain(
      "Minor to moderate accessibility barriers exist at South Station. Bus operator may need to relocate bus for safe boarding and exiting."
    );
    expect(wrapper.find("#accessibility-features").exists()).toBeFalsy();
  });

  it("it renders with no information about accessibility data", () => {
    createReactRoot();
    const stopWithoutFeatures = { ...stop, accessibility: [] };
    const wrapper = mount(
      <Accessibility
        routes={data.routes}
        stop={stopWithoutFeatures}
        isExpanded
        isFocused={false}
        dispatch={() => {}}
      />
    );
    expect(wrapper.find("#accessibility-level").text()).toContain(
      "Significant accessibility barriers exist at South Station. Customers using wheeled mobility devices may need to board at street level. Bus operator will need to relocate bus for safe boarding and exiting."
    );
    expect(wrapper.find("#accessibility-features").exists()).toBeFalsy();
  });

  it("it renders with information about a partially inaccessible stop", () => {
    createReactRoot();
    const stopWithoutFeatures = { ...stop, accessibility: ["tty_phone"] };
    const wrapper = mount(
      <Accessibility
        routes={data.routes}
        stop={stopWithoutFeatures}
        isExpanded
        isFocused={false}
        dispatch={() => {}}
      />
    );
    expect(wrapper.find("#accessibility-level").text()).toContain(
      "Significant accessibility barriers exist at South Station. Customers using wheeled mobility devices may need to board at street level. Bus operator will need to relocate bus for safe boarding and exiting."
    );
    expect(wrapper.find("#accessibility-features").exists()).toBeTruthy();
  });

  it("it renders special case for Ashmont/Mattapan Trolley", () => {
    createReactRoot();
    const stopAshmont = { ...stop, id: "place-asmnl" };
    const wrapper = mount(
      <Accessibility
        routes={data.routes}
        stop={stopAshmont}
        isExpanded
        isFocused={false}
        dispatch={() => {}}
      />
    );
    expect(wrapper.find("#accessibility-level").text()).toContain(
      "Significant accessibility barriers exist at South Station but customers can board or exit the Mattapan Trolley using a mobile lift."
    );
    expect(wrapper.find("#accessibility-features").text()).toContain(
      "Escalator"
    );
  });

  it("it renders other special cases", () => {
    createReactRoot();
    const stopAshmont = { ...stop, id: "place-asmnl" };
    const wrapper = mount(
      <Accessibility
        routes={data.routes}
        stop={stopAshmont}
        isExpanded
        isFocused={false}
        dispatch={() => {}}
      />
    );
    expect(wrapper.find("#accessibility-level").text()).toContain(
      "Significant accessibility barriers exist at South Station but customers can board or exit the Mattapan Trolley using a mobile lift."
    );
    expect(wrapper.find("#accessibility-features").text()).toContain(
      "Escalator"
    );
  });

  it("it handles unknown accessibility types", () => {
    createReactRoot();
    const stopNewFeature = {
      ...stop,
      accessibility: ["accessible", "unknown_accessible_feature"]
    };
    const wrapper = mount(
      <Accessibility
        routes={data.routes}
        stop={stopNewFeature}
        isExpanded
        isFocused={false}
        dispatch={() => {}}
      />
    );
    expect(wrapper.find("#accessibility-features").text()).toContain(
      "unknown accessible feature"
    );
  });

  it("it handles types where the accessibility level is not accessible (lacks 'accessible' or 'unknown')", () => {
    createReactRoot();
    const stopNoLevel = {
      ...stop,
      accessibility: ["escalator_up"]
    };
    const wrapper = mount(
      <Accessibility
        routes={data.routes}
        stop={stopNoLevel}
        isExpanded
        isFocused={false}
        dispatch={() => {}}
      />
    );
    expect(wrapper.find("#accessibility-level").text()).toContain(
      "Significant accessibility barriers exist"
    );
    expect(wrapper.find("#accessibility-features").exists()).toBeTruthy();
  });

  it("it handles types where the accessibility level is not accessible (lacks 'accessible' or 'unknown') without any bus routes", () => {
    createReactRoot();
    const routesNoBus: TypedRoutes[] = [
      {
        group_name: "subway",
        routes: [
          {
            route: {
              type: 1,
              name: "Orange Line",
              header: "Orange Line",
              long_name: "Orange Line",
              id: "Orange",
              direction_names: {
                "0": "South",
                "1": "North"
              },
              direction_destinations: {
                "0": "Ashmont/Braintree",
                "1": "Alewife"
              },
              description: "rapid_transit",
              alerts: []
            },
            directions: []
          }
        ]
      }
    ];
    const stopNoLevel = {
      ...stop,
      accessibility: ["escalator_up"]
    };
    const wrapper = mount(
      <Accessibility
        routes={routesNoBus}
        stop={stopNoLevel}
        isExpanded
        isFocused={false}
        dispatch={() => {}}
      />
    );
    const accessLevel = wrapper.find("#accessibility-level").text();
    expect(accessLevel).toContain("Significant accessibility barriers exist");
    expect(accessLevel).not.toContain("Bus");
    expect(wrapper.find("#accessibility-features").exists()).toBeTruthy();
  });
});
