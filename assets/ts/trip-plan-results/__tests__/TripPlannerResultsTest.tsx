import React from "react";
import { render, screen } from "@testing-library/react";
import TripPlannerResults from "../components/TripPlannerResults";
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

test("TripPlannerResults shows a number of itineraries", () => {
  const itineraryData = [
    {
      html,
      access_html,
      fares_estimate_html,
      tab_html,
      fare_calculator_html,
      id: 1,
      map,
      tag: "best"
    },
    {
      html,
      access_html,
      fares_estimate_html,
      tab_html,
      fare_calculator_html,
      id: 2,
      map,
      tag: null
    },
    {
      html,
      access_html,
      fares_estimate_html,
      tab_html,
      fare_calculator_html,
      id: 3,
      map,
      tag: null
    }
  ];
  const { container } = render(
    <TripPlannerResults itineraryData={itineraryData} />
  );
  expect(
    container.querySelectorAll(".m-trip-plan-results__itinerary")
  ).toHaveLength(itineraryData.length);
});

it("it renders ItineraryBody when clicking to expand", () => {
  render(
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
          tag: null
        }
      ]}
    />
  );

  screen.getByRole("button", { name: "Show map and trip details" }).click();
  expect(
    screen.getByText("Lots of content about the itinerary")
  ).toBeInTheDocument();
});
