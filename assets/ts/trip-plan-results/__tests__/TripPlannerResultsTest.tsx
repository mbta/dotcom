import React from "react";
import renderer, { act } from "react-test-renderer";
import { createReactRoot } from "../../app/helpers/testUtils";
import TripPlannerResults from "../components/TripPlannerResults";
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
    <TripPlannerResults
      itineraryData={[
        {
          html,
          access_html,
          fares_estimate_html,
          tab_html,
          fare_calculator_html,
          id: 1,
          map,
          tags: []
        }
      ]}
    />
  );
  tree.update(
    <TripPlannerResults
      itineraryData={[
        {
          html,
          access_html,
          fares_estimate_html,
          tab_html,
          fare_calculator_html,
          id: 1,
          map,
          tags: []
        }
      ]}
    />
  );
  expect(tree.toJSON()).toMatchSnapshot();
});

it("it renders ItineraryBody when clicking to expand", () => {
  createReactRoot();
  const tree = renderer.create(
    <TripPlannerResults
      itineraryData={[
        {
          html,
          access_html,
          fares_estimate_html,
          tab_html,
          fare_calculator_html,
          id: 1,
          map,
          tags: []
        }
      ]}
    />
  );

  const button = tree.root.findAllByType("button")[0];

  act(button.props.onClick);

  expect(tree.root.findAllByType(Accordion).length).toBe(2);
  expect(tree.root.findAllByType(AccordionNoJS).length).toBe(2);

  expect(
    tree.root.findAllByProps({
      html: "<div>Lots of content about the itinerary</div>"
    }).length
  ).toBe(2);
});
