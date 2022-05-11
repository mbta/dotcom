import React from "react";
import renderer, { act } from "react-test-renderer";
import { createReactRoot } from "../../app/helpers/testUtils";
import TripCompareResults from "../components/TripCompareResults";
import Accordion, { AccordionNoJS } from "../../components/Accordion";
import { TileServerUrl } from "../../leaflet/components/__mapdata";

const html = "<div>Lots of content about the itinerary</div>";
const tab_html = "<div>HTML for the accordion button</div>";
const access_html = "<div>Accessible</div>";
const fares_estimate_html = "<div>HTML content for fares</div>";
const fare_calculator_html = "<div>HTML content for fare calculator</div>";
const tile_server_url: TileServerUrl = "";

const positions: [number, number][] = [
  [42.3564, -71.06242],
  [42.35628, -71.06226]
];
const map = {
  zoom: null,
  markers: [],
  tile_server_url,
  default_center: { longitude: 0, latitude: 0 },
  height: 400,
  width: 400,
  polylines: [
    {
      color: "#428608",
      "dotted?": false,
      id: "",
      positions,
      weight: 5
    }
  ]
};

it("it renders", () => {
  createReactRoot();
  const tree = renderer.create(
    <TripCompareResults
      itineraryData={[
        {
          html,
          access_html,
          fares_estimate_html,
          tab_html,
          fare_calculator_html,
          id: 1,
          source: "NEW",
          map
        }
      ]}
      itineraryHeader="header"
    />
  );
  tree.update(
    <TripCompareResults
      itineraryData={[
        {
          html,
          access_html,
          fares_estimate_html,
          tab_html,
          fare_calculator_html,
          id: 1,
          source: "NEW",
          map
        }
      ]}
      itineraryHeader="header"
    />
  );
  expect(tree.toJSON()).toMatchSnapshot();
});

it("it renders ItineraryBody when clicking to expand", () => {
  createReactRoot();
  const tree = renderer.create(
    <TripCompareResults
      itineraryData={[
        {
          html,
          access_html,
          fares_estimate_html,
          tab_html,
          fare_calculator_html,
          id: 1,
          source: "NEW",
          map
        }
      ]}
      itineraryHeader="header"
    />
  );

  const button = tree.root.findAllByType("button")[0];
  act(button.props.onClick);

  expect(tree.root.findAllByType(Accordion).length).toBe(1);
  expect(tree.root.findAllByType(AccordionNoJS).length).toBe(1);

  expect(
    tree.root.findAllByProps({
      html: "<div>Lots of content about the itinerary</div>"
    }).length
  ).toBe(2);
});

it("it switches between current and redesigned modes", () => {
  createReactRoot();
  const tree = renderer.create(
    <TripCompareResults
      itineraryData={[
        {
          html,
          access_html,
          fares_estimate_html,
          tab_html,
          fare_calculator_html,
          id: 1,
          source: "NEW",
          map
        }
      ]}
      itineraryHeader="header"
    />
  );

  const button = tree.root.findByProps({
    className: "m-alerts__mode-button"
  });
  act(button.props.onClick);

  expect(tree.root.findAllByType(Accordion).length).toBe(0);
  expect(tree.root.findAllByType(AccordionNoJS).length).toBe(0);

  expect(
    tree.root.findAllByProps({
      html: "<div>Lots of content about the itinerary</div>"
    }).length
  ).toBe(0);
});
