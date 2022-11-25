import React from "react";
import renderer from "react-test-renderer";
import { createReactRoot } from "../../../app/helpers/testUtils";
import AdditionalLineInfo from "../AdditionalLineInfo";
import { TypedRoutes } from "../../../stop/components/__stop";
import { EnhancedRoute } from "../../../__v3api";

const pdfs = [
  {
    url: "https://mbta.com/example-pdf.pdf",
    title: "Route 1 schedule PDF"
  }
];

const teasers = `<div><a href="http://some-link">Some teaser from CMS></a></div>`;

const connections: TypedRoutes[] = [];

const fares = [
  {
    title: "CharlieCard",
    price: "$2.25"
  },
  {
    title: "CharlieTicket or Cash",
    price: "$2.75"
  }
];

const fareLink = "/fares/bus-fares";
const holidays = [
  {
    name: "Memorial Day",
    date: "May 27, 2019"
  }
];

const route: EnhancedRoute = {
  alerts: [],
  description: "",
  direction_destinations: { 0: "Oak Grove", 1: "Forest Hills" },
  direction_names: { 0: "Inbound", 1: "Outbound" },
  header: "",
  id: "Orange",
  name: "Orange",
  long_name: "Orange Line",
  type: 1
};

it("it renders", () => {
  createReactRoot();
  const tree = renderer
    .create(
      <AdditionalLineInfo
        teasers={teasers}
        pdfs={pdfs}
        connections={connections}
        fares={fares}
        fareLink={fareLink}
        route={route}
        holidays={holidays}
        hours={""}
        scheduleNote={null}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
