import React from "react";
import renderer from "react-test-renderer";
import { createReactRoot } from "../../app/helpers/testUtils";
import TripPlannerResults from "../components/TripPlannerResults";
import { TileServerUrl } from "../../leaflet/components/__mapdata";

const html = "<div>Lots of content about the itinerary</div>";
const tab_html = "<div>HTML for the accordion button</div>";
const access_html = "<div>Accessible</div>";
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
  const tree = renderer
    .create(
      <TripPlannerResults
        itineraryData={[{ html, access_html, tab_html, id: 1, map }]}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
