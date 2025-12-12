import React from "react";
import lineDiagramData from "./test-data/lineDiagramData.json"; // Not a full line diagram
import {
  ServiceInSelector,
  RoutePatternsByDirection,
  StopTreeData,
  SchedulePageData
} from "../__schedule";
import { EnhancedRoute } from "../../../__v3api";
import { MapData } from "../../../leaflet/components/__mapdata";
import * as scheduleLoader from "../../schedule-loader";
import * as scheduleStoreModule from "../../store/ScheduleStore";
import * as routePatternsByDirectionData from "./test-data/routePatternsByDirectionData.json";
import * as useStop from "../../../hooks/useStop";
import { FetchStatus } from "../../../helpers/use-fetch";
import { screen, waitFor } from "@testing-library/react";
import { EnhancedJourney } from "../__trips";
import * as upcomingDepartures from "../schedule-finder/upcoming-departures/UpcomingDepartures";
import * as useHoursOfOperation from "../../../hooks/useHoursOfOperation";

jest.mock("../../../helpers/use-fetch", () => ({
  __esModule: true,
  hasData: () => false,
  isLoading: () => true,
  isNotStarted: () => false,
  default: jest.fn().mockImplementation(() => [{ status: 2 }, jest.fn()]),
  FetchStatus: { Data: 3 }
}));

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

const { stop_tree: stopTreeData } = (lineDiagramData as unknown) as {
  stop_tree: StopTreeData;
};

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

const route: EnhancedRoute = {
  alerts: [],
  description: "rapid_transit",
  direction_destinations: { 0: "Oak Grove", 1: "Forest Hills" },
  direction_names: { 0: "Inbound", 1: "Outbound" },
  header: "",
  id: "Orange",
  name: "Orange",
  long_name: "Orange Line",
  type: 1,
  line_id: null
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

const teasers = `<div><a href="http://some-link">Some teaser from CMS</a></div>`;

const pdfs = [
  {
    url: "https://mbta.com/example-pdf.pdf",
    title: "Route 1 schedule PDF"
  }
];

const fareLink = "/fares/bus-fares";

const holidays = [
  {
    name: "Memorial Day",
    date: "May 27, 2019"
  }
];

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

const scheduleNoteData = {
  saturday_service: "8-12 minutes",
  sunday_service: "8-12 minutes",
  peak_service: "5 minutes",
  offpeak_service: "12-15 minutes",
  exceptions: [
    { service: "26 minutes", type: "weekend mornings and late night" }
  ],
  alternate_text: null
};

const mapData: MapData = {
  zoom: 16,
  width: 600,
  tile_server_url: "https://mbta-map-tiles-dev.s3.amazonaws.com",
  polylines: [],
  markers: [
    {
      icon: "vehicle-bordered-expanded",
      id: "vehicle-R-545CDFC5",
      latitude: 42.39786911010742,
      longitude: -71.13092041015625,
      rotation_angle: 90,
      tooltip_text: "Alewife train is on the way to Alewife",
      tooltip: null
    },
    {
      icon: "stop-circle-bordered-expanded",
      id: "stop-place-alfcl",
      latitude: 42.395428,
      longitude: -71.142483,
      rotation_angle: 0,
      tooltip: null,
      tooltip_text: "Alewife"
    }
  ],
  height: 600,
  default_center: {
    longitude: -71.05891,
    latitude: 42.360718
  }
};

const routePatternsByDirection = routePatternsByDirectionData as RoutePatternsByDirection;

const routes: RoutePatternsByDirection = {
  "1": routePatternsByDirection["1"]
};

jest.mock("../ScheduleDirection", () => {
  return {
    __esModule: true,
    default: () => {
      return <div>ScheduleDirection</div>;
    }
  };
});

let store = scheduleStoreModule.createScheduleStore(0);

describe("schedule-loader", () => {
  beforeEach(() => {
    store = scheduleStoreModule.createScheduleStore(0);
    jest.spyOn(useStop, "useStop").mockImplementation(stopId => {
      return {
        status: FetchStatus.Data,
        data: {
          stopId: stopId
        } as any
      };
    });

    jest
      .spyOn(useHoursOfOperation, "useHoursOfOperationByStop")
      .mockImplementation(() => {
        return null;
      });

    jest
      .spyOn(upcomingDepartures, "fetchData")
      .mockImplementation((routeid, a, s, d) => {
        return new Promise<EnhancedJourney[]>(resolve => {
          resolve([]);
        });
      });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("Does not render line diagram because route information is empty", () => {
    const schedulePageData = {
      route_patterns: {},
      route_stop_lists: [],
      hours: "",
      teasers: "<div>Test Teasers</div>",
      direction_id: 1,
      route,
      stops,
      connections: [],
      fares: [],
      fare_link: "",
      holidays: [],
      pdfs: [],
      stop_tree: stopTreeData,
      alerts: [],
      schedule_note: null,
      services: [],
      today: "",
      "service_today?": true,
      variant: null
    } as SchedulePageData;

    document.body.innerHTML = `<div id="react-root-schedule-page">
    <script id="js-schedule-page-data" type="text/plain" data-branches-are-empty="true">${JSON.stringify(
      schedulePageData
    )}</script>
    <script id="js-map-data"
          data-channel-id="test-channel"
          type="text/plain">
          ${JSON.stringify(mapData)}
    </script>
    </div>`;

    scheduleLoader.default();

    expect(screen.queryByText("Stations & Departures")).toBeNull();
    expect(screen.getByText("Test Teasers")).toBeInTheDocument();
  });

  it("it renders component conditionally (ScheduleNote instead of ScheduleFinder in this case)", async () => {
    const schedulePageData = {
      route_patterns: routes,
      route_stop_lists: [],
      schedule_note: scheduleNoteData,
      connections: [],
      fares,
      fare_link: fareLink,
      hours,
      holidays,
      pdfs,
      teasers,
      route,
      services,
      stops,
      direction_id: 1,
      today: "2019-12-05",
      stop_tree: stopTreeData,
      alerts: [],
      "service_today?": true,
      variant: null
    } as SchedulePageData;

    document.body.innerHTML = `<div id="react-root-schedule-page">
    <script id="js-schedule-page-data" type="text/plain">${JSON.stringify(
      schedulePageData
    )}</script>
    <script id="js-map-data"
          data-channel-id="test-channel"
          type="text/plain">
          ${JSON.stringify(mapData)}
    </script>
    </div>`;

    scheduleLoader.default();

    const hoursNode = await waitFor(() => screen.getByText("Today's Service"));
    const noteNode = await waitFor(() =>
      screen.queryByText(
        "Choose a stop to get schedule information and real-time departure predictions."
      )
    );

    expect(hoursNode).toBeInTheDocument();
    expect(noteNode).toBeNull();
  });

  it("it only shows teasers and upcoming holidays because it is a suspended route", () => {
    const schedulePageData = {
      route_patterns: {},
      direction_id: 1,
      route,
      stops,
      hours,
      connections: [
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
              }
            }
          ]
        }
      ],
      fares,
      holidays,
      teasers,
      stop_tree: stopTreeData,
      alerts: [],
      pdfs
    };

    document.body.innerHTML = `<div id="react-root-schedule-page">
  <script id="js-schedule-page-data" type="text/plain">${JSON.stringify(
    schedulePageData
  )}</script>
  <script id="js-map-data"
        data-channel-id="test-channel"
        type="text/plain">
        ${JSON.stringify(mapData)}
  </script>
  </div>`;

    scheduleLoader.default();

    expect(document.body.innerHTML.indexOf("Fares")).toEqual(-1);
    expect(document.body.innerHTML.indexOf("PDF Schedules")).toEqual(-1);
    expect(document.body.innerHTML.indexOf("Connections")).toEqual(-1);
    expect(document.body.innerHTML.indexOf("Hours of Operation")).toEqual(-1);

    expect(document.body.innerHTML.indexOf("Some teaser from CMS")).not.toEqual(
      -1
    );
    expect(document.body.innerHTML.indexOf("Upcoming Holidays")).not.toEqual(
      -1
    );
  });
});
