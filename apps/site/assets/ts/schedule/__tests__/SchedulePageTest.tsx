import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import { createReactRoot } from "../../app/helpers/testUtils";
import SchedulePage from "../components/SchedulePage";
import ScheduleFinderModal from "../components/schedule-finder/ScheduleFinderModal";
import { TypedRoutes } from "../../stop/components/__stop";
import ScheduleNote from "../components/ScheduleNote";
import { EnhancedRoute } from "../../__v3api";
import lineDiagramData from "./lineDiagramData.json"; // Not a full line diagram
import { LineDiagramStop, ServiceInSelector } from "../components/__schedule";
const lineDiagram = lineDiagramData as LineDiagramStop[];
import * as scheduleStoreModule from "../store/ScheduleStore";

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

const stops = {
  "1": [
    {
      name: "SL",
      id: "741",
      is_closed: false,
      zone: "1"
    },
    {
      name: "Abc",
      id: "123",
      is_closed: false,
      zone: null
    },
    {
      name: "Wellington",
      id: "place-welln",
      is_closed: true,
      zone: null
    }
  ],
  "0": [
    {
      name: "Wellington",
      id: "place-welln",
      is_closed: true,
      zone: null
    },
    {
      name: "Abc",
      id: "123",
      is_closed: false,
      zone: null
    },
    {
      name: "SL",
      id: "741",
      is_closed: false,
      zone: "1"
    }
  ]
};

const service: ServiceInSelector = {
  added_dates: [],
  added_dates_notes: {},
  description: "Weekday schedule",
  end_date: "2019-06-25",
  id: "BUS319-D-Wdy-02",
  removed_dates: [],
  removed_dates_notes: {},
  start_date: "2019-06-25",
  type: "weekday",
  typicality: "typical_service",
  valid_days: [1, 2, 3, 4, 5],
  name: "weekday",
  rating_start_date: "2019-06-25",
  rating_end_date: "2019-10-25",
  rating_description: "Test",
  "default_service?": true
};

const services = [service];

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
          route,
          services,
          stops,
          direction_id: 0,
          shape_map: {},
          route_patterns: {},
          line_diagram: lineDiagram,
          today: "2019-12-05",
          variant: null
        }}
        updateURL={() => {}}
        modalOpen={false}
        modalMode="schedule"
        closeModal={() => {}}
        changeDirection={() => {}}
        selectedDirection={0}
        selectedOrigin={null}
        changeOrigin={() => {}}
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
  ],
  alternate_text: null
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
        route,
        services,
        stops,
        direction_id: 0,
        shape_map: {},
        route_patterns: {},
        line_diagram: lineDiagram,
        today: "2019-12-05",
        variant: null
      }}
      updateURL={() => {}}
      modalOpen={false}
      modalMode={"origin"}
      selectedOrigin={null}
      changeDirection={() => {}}
      selectedDirection={0}
      closeModal={() => {}}
      changeOrigin={() => {}}
    />
  );
  expect(
    tree.root.findByType(ScheduleNote).props.scheduleNote.offpeak_service
  ).toBe("8-12 minutes");
});

it("it renders with Schedule modal", () => {
  const stubFn = jest
    .spyOn(scheduleStoreModule, "getCurrentState")
    .mockImplementation(() => {
      return {
        selectedDirection: 0,
        selectedOrigin: "place-welln",
        modalMode: "schedule",
        modalOpen: true
      };
    });

  const wrapper = mount(
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
        route,
        services,
        stops,
        direction_id: 0,
        shape_map: {},
        route_patterns: {},
        line_diagram: lineDiagram,
        today: "2019-12-05",
        variant: null
      }}
      updateURL={() => {}}
      modalOpen={true}
      modalMode={"schedule"}
      selectedOrigin={"place-welln"}
      changeDirection={() => {}}
      selectedDirection={0}
      closeModal={() => {}}
      changeOrigin={() => {}}
    />
  );

  expect(wrapper.find(ScheduleFinderModal).exists()).toEqual(true);

  wrapper.unmount();
});

it("it handles change in origin", () => {
  const stubFn = jest
    .spyOn(scheduleStoreModule, "getCurrentState")
    .mockImplementation(() => {
      return {
        selectedDirection: 0,
        selectedOrigin: "place-welln",
        modalMode: "schedule",
        modalOpen: true
      };
    });

  const wrapper = mount(
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
        route,
        services,
        stops,
        direction_id: 0,
        shape_map: {},
        route_patterns: {},
        line_diagram: lineDiagram,
        today: "2019-12-05",
        variant: null
      }}
      updateURL={() => {}}
      modalOpen={true}
      modalMode={"schedule"}
      selectedOrigin={"place-welln"}
      changeDirection={() => {}}
      selectedDirection={0}
      closeModal={() => {}}
      changeOrigin={() => {}}
    />
  );

  const storeHandlerStub = jest.spyOn(scheduleStoreModule, "storeHandler");

  // trigger selection in origin
  wrapper
    .find("SelectContainer")
    .at(1)
    // @ts-ignore -- types for `invoke` seem to be too restrictive
    .invoke("handleClick")();

  expect(storeHandlerStub).toHaveBeenCalledWith({
    type: "OPEN_MODAL",
    newStoreValues: {
      modalMode: "origin"
    }
  });

  wrapper.unmount();
});
