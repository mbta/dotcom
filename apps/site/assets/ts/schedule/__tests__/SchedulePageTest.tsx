import React from "react";
import renderer from "react-test-renderer";
import { createReactRoot } from "../../app/helpers/testUtils";
import SchedulePage from "../components/SchedulePage";
import { TypedRoutes } from "../../stop/components/__stop";
import ScheduleNote from "../components/ScheduleNote";

const pdfs = [
  {
    url: "https://mbta.com/example-pdf.pdf",
    title: "Route 1 schedule PDF"
  }
];

const teasers = `<div><a href="http://some-link">Some teaser from CMS></a></div>`;

const hours = `<div class="m-schedule-page__sidebar-hours">  <h3 class="hours-period-heading">Monday to Friday</h3>
<p class="hours-directions">
  <span class="hours-direction-name">Inbound</span>
  <span class="hours-time">04:17A-12:46A</span>
</p>
<p class="hours-directions">
  <span class="hours-direction-name">Outbound</span>
  <span class="hours-time">05:36A-01:08A</span>
</p>
</div>`;

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

const directionDestinations = { 0: "Oak Grove", 1: "Forest Hills" };
const directionNames = { 0: "Inbound", 1: "Outbound" };
const stops = [
  { name: "Malden Center", id: "place-mlmnl" },
  { name: "Wellington", id: "place-welln" }
];

it("it renders", () => {
  createReactRoot();
  const tree = renderer
    .create(
      <SchedulePage
        schedulePageData={{
          schedule_note: null,
          connections,
          fares,
          fare_link: fareLink, // eslint-disable-line @typescript-eslint/camelcase
          hours,
          holidays,
          pdfs,
          teasers,
          route_type: 1,
          direction_names: directionNames,
          direction_destinations: directionDestinations,
          stops
        }}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

const scheduleNoteData = {
  offpeak_service: "8-12 minutes",
  peak_service: "5 minutes",
  exceptions: [
    { service: "26 minutes", type: "weekend mornings and late night" }
  ]
};

it("it renders with conditional components", () => {
  createReactRoot();
  const tree = renderer.create(
    <SchedulePage
      schedulePageData={{
        schedule_note: scheduleNoteData,
        connections,
        fares,
        fare_link: fareLink,
        hours,
        holidays,
        pdfs,
        teasers,
        route_type: 1,
        direction_names: directionNames,
        direction_destinations: directionDestinations,
        stops
      }}
    />
  );
  expect(
    tree.root.findByType(ScheduleNote).props.scheduleNote.offpeak_service
  ).toBe("8-12 minutes");
});
