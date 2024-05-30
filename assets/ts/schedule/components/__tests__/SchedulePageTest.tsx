import React from "react";
import { Provider } from "react-redux";
import lineDiagramData from "./test-data/lineDiagramData.json"; // Not a full line diagram
import {
  ServiceInSelector,
  RoutePatternsByDirection,
  StopTreeData,
  SchedulePageData
} from "../__schedule";
import { EnhancedRoute } from "../../../__v3api";
import { MapData, StaticMapData } from "../../../leaflet/components/__mapdata";
import { SchedulePage } from "../SchedulePage";
import * as scheduleStoreModule from "../../store/ScheduleStore";
import * as routePatternsByDirectionData from "./test-data/routePatternsByDirectionData.json";
import * as useStop from "../../../hooks/useStop";
import { FetchStatus } from "../../../helpers/use-fetch";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as scheduleModalContent from "../schedule-finder/ScheduleModalContent";
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
const testRouteStopList = Object.values(stopTreeData.by_id).map(
  node => node.value
);

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

const routeNotSubway: EnhancedRoute = {
  alerts: [],
  description: "",
  direction_destinations: { 0: "Oak Grove", 1: "Forest Hills" },
  direction_names: { 0: "Inbound", 1: "Outbound" },
  header: "",
  id: "Silver",
  name: "Silver 1",
  long_name: "Silver Line",
  type: 2,
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

const staticMapData: StaticMapData = {
  img_src: "http://example.com/map.png",
  pdf_url: "http://example.com/map.pdf"
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

describe("SchedulePage", () => {
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

  it("Renders additional line information", () => {
    render(
      <Provider store={store}>
        <SchedulePage
          mapData={mapData}
          noBranches={false}
          schedulePageData={{
            schedule_note: null,
            connections: [],
            fares,
            fare_link: fareLink, // eslint-disable-line camelcase
            hours,
            holidays,
            pdfs,
            teasers,
            route,
            services,
            stops,
            direction_id: 0,
            route_patterns: routePatternsByDirection,
            today: "2019-12-05",
            stop_tree: stopTreeData,
            route_stop_lists: [testRouteStopList],
            alerts: [],
            variant: null
          }}
        />
      </Provider>
    );

    expect(screen.getByText("PDF Schedules and Maps")).toBeInTheDocument();
  });

  it("Renders ScheduleFinder", () => {
    render(
      <Provider store={store}>
        <SchedulePage
          mapData={mapData}
          noBranches={false}
          schedulePageData={{
            schedule_note: null,
            connections: [],
            fares,
            fare_link: fareLink, // eslint-disable-line camelcase
            hours,
            holidays,
            pdfs,
            teasers,
            route,
            services,
            stops,
            direction_id: 0,
            route_patterns: routePatternsByDirection,
            today: "2019-12-05",
            stop_tree: stopTreeData,
            route_stop_lists: [testRouteStopList],
            alerts: [],
            variant: null
          }}
        />
      </Provider>
    );
    expect(screen.getByText("Schedule Finder")).toBeInTheDocument();
  });

  it("Renders ScheduleNote with Schedule modal", async () => {
    jest
      .spyOn(scheduleStoreModule, "getCurrentState")
      .mockImplementation(() => {
        return {
          selectedDirection: 0,
          selectedOrigin: "place-welln",
          modalMode: "schedule",
          modalOpen: true
        };
      });

    act(() => {
      render(
        <Provider store={store}>
          <SchedulePage
            mapData={mapData}
            noBranches={false}
            schedulePageData={{
              schedule_note: scheduleNoteData,
              connections: [],
              fares,
              fare_link: fareLink, // eslint-disable-line camelcase
              hours,
              holidays,
              pdfs,
              teasers,
              route: route,
              services,
              stops,
              direction_id: 0,
              route_patterns: routePatternsByDirection,
              today: "2019-12-05",
              stop_tree: stopTreeData,
              route_stop_lists: [testRouteStopList],
              alerts: [],
              variant: null
            }}
          />
        </Provider>
      );
    });

    const scheduleNode = await waitFor(() =>
      screen.getByText("Schedule Finder")
    );
    const todaysNode = await waitFor(() => screen.getByText("Today's Service"));
    expect(scheduleNode).toBeInTheDocument();
    expect(todaysNode).toBeInTheDocument();
  });

  it("Renders empty component", () => {
    jest
      .spyOn(scheduleStoreModule, "getCurrentState")
      .mockImplementation(() => {
        return {} as any;
      });

    const { container } = render(
      <Provider store={store}>
        <SchedulePage
          mapData={mapData}
          noBranches={false}
          schedulePageData={{
            schedule_note: scheduleNoteData,
            connections: [],
            fares,
            fare_link: fareLink, // eslint-disable-line camelcase
            hours,
            holidays,
            pdfs,
            teasers,
            route,
            services,
            stops,
            direction_id: 0,
            route_patterns: routePatternsByDirection,
            today: "2019-12-05",
            stop_tree: stopTreeData,
            route_stop_lists: [testRouteStopList],
            alerts: [],
            variant: null
          }}
        />
      </Provider>
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("Shows the modal with pre-populated values", async () => {
    jest
      .spyOn(scheduleStoreModule, "getCurrentState")
      .mockImplementation(() => {
        return {
          selectedDirection: 0,
          selectedOrigin: "place-welln",
          modalMode: "schedule",
          modalOpen: true
        };
      });

    act(() => {
      render(
        <Provider store={store}>
          <SchedulePage
            mapData={mapData}
            noBranches={false}
            schedulePageData={{
              schedule_note: scheduleNoteData,
              connections: [],
              fares,
              fare_link: fareLink, // eslint-disable-line camelcase
              hours,
              holidays,
              pdfs,
              teasers,
              route,
              services,
              stops,
              direction_id: 0,
              route_patterns: routePatternsByDirection,
              today: "2019-12-05",
              stop_tree: stopTreeData,
              route_stop_lists: [testRouteStopList],
              alerts: [],
              variant: null
            }}
          />
        </Provider>
      );
    });
    const scheduleNode = await waitFor(() =>
      screen.getByText("Schedule Finder")
    );
    const todaysNode = await waitFor(() => screen.getByText("Today's Service"));
    expect(scheduleNode).toBeInTheDocument();
    expect(todaysNode).toBeInTheDocument();
  });

  it("Shows the ScheduleDirection component", () => {
    document.body.innerHTML = `<div id="react-root">
  <script id="js-map-data" type="text/plain">${JSON.stringify(mapData)}</script>
  <script id="static-map-data" type="text/plain">${JSON.stringify(
    staticMapData
  )}</script>
  </div>`;

    render(
      <Provider store={store}>
        <SchedulePage
          mapData={mapData}
          noBranches={false}
          schedulePageData={{
            schedule_note: null,
            connections: [],
            fares,
            fare_link: fareLink, // eslint-disable-line camelcase
            hours,
            holidays,
            pdfs,
            teasers,
            route,
            services: [],
            stops,
            direction_id: 0,
            route_patterns: routePatternsByDirection,
            today: "2019-12-05",
            stop_tree: stopTreeData,
            route_stop_lists: [testRouteStopList],
            alerts: [],
            variant: null
          }}
        />
      </Provider>
    );
    expect(screen.getByText("ScheduleDirection")).toBeInTheDocument();
  });

  it("Opens the schedule modal", async () => {
    const user = userEvent.setup();
    jest
      .spyOn(scheduleStoreModule, "getCurrentState")
      .mockImplementation(() => {
        return {
          selectedDirection: 0,
          selectedOrigin: "place-welln",
          modalMode: "schedule",
          modalOpen: false
        };
      });

    const storeHandlerStub = jest.spyOn(scheduleStoreModule, "storeHandler");

    render(
      <Provider store={store}>
        <SchedulePage
          mapData={mapData}
          noBranches={false}
          schedulePageData={{
            schedule_note: null,
            connections: [],
            fares,
            fare_link: fareLink, // eslint-disable-line camelcase
            hours,
            holidays,
            pdfs,
            teasers,
            route,
            services,
            stops,
            direction_id: 0,
            route_patterns: routePatternsByDirection,
            today: "2019-12-05",
            stop_tree: stopTreeData,
            route_stop_lists: [testRouteStopList],
            alerts: [],
            variant: null
          }}
        />
      </Provider>
    );

    const originSelect = screen.getByTestId("schedule-finder-origin-select");

    await user.click(originSelect);

    expect(storeHandlerStub).toHaveBeenCalledTimes(2);
  });

  it("Opens the origin modal", async () => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <SchedulePage
          mapData={mapData}
          noBranches={false}
          schedulePageData={{
            schedule_note: null,
            connections: [],
            fares,
            fare_link: fareLink, // eslint-disable-line camelcase
            hours,
            holidays,
            pdfs,
            teasers,
            route,
            services,
            stops,
            direction_id: 0,
            route_patterns: routePatternsByDirection,
            today: "2019-12-05",
            stop_tree: stopTreeData,
            route_stop_lists: [testRouteStopList],
            alerts: [],
            variant: null
          }}
        />
      </Provider>
    );

    const storeHandlerStub = jest.spyOn(scheduleStoreModule, "storeHandler");

    jest
      .spyOn(scheduleStoreModule, "getCurrentState")
      .mockImplementation(() => {
        return {
          selectedDirection: 0,
          selectedOrigin: "place-welln",
          modalMode: "origin",
          modalOpen: false
        };
      });

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(1);

    await user.click(buttons[1]);

    // first call is with INITIALIZE
    expect(storeHandlerStub).toHaveBeenNthCalledWith(2, {
      type: "OPEN_MODAL",
      newStoreValues: {
        modalMode: "origin"
      }
    });
  });

  it.skip("Shows the schedule modal on load", () => {
    window.history.replaceState(
      {},
      "",
      "/?schedule_finder%5Bdirection_id%5D=0&schedule_finder%5Borigin%5D=place-welln"
    );

    const storeHandlerStub = jest.spyOn(scheduleStoreModule, "storeHandler");

    render(
      <Provider store={store}>
        <SchedulePage
          mapData={mapData}
          noBranches={false}
          schedulePageData={{
            schedule_note: null,
            connections: [],
            fares,
            fare_link: fareLink, // eslint-disable-line camelcase
            hours,
            holidays,
            pdfs,
            teasers,
            route,
            services,
            stops,
            direction_id: 0,
            route_patterns: routePatternsByDirection,
            today: "2019-12-05",
            stop_tree: stopTreeData,
            route_stop_lists: [testRouteStopList],
            alerts: [],
            variant: null
          }}
        />
      </Provider>
    );

    expect(storeHandlerStub).toHaveBeenCalledWith({
      type: "INITIALIZE",
      newStoreValues: {
        selectedDirection: 0,
        selectedOrigin: "place-welln",
        modalMode: "schedule",
        modalOpen: true
      }
    });

    // now check with the opposite direction:
    window.history.replaceState(
      {},
      "",
      "/?schedule_finder%5Bdirection_id%5D=1&schedule_finder%5Borigin%5D=place-welln"
    );
    render(
      <Provider store={store}>
        <SchedulePage
          mapData={mapData}
          noBranches={false}
          schedulePageData={{
            schedule_note: null,
            connections: [],
            fares,
            fare_link: fareLink, // eslint-disable-line camelcase
            hours,
            holidays,
            pdfs,
            teasers,
            route,
            services,
            stops,
            direction_id: 0,
            route_patterns: routePatternsByDirection,
            today: "2019-12-05",
            stop_tree: stopTreeData,
            route_stop_lists: [testRouteStopList],
            alerts: [],
            variant: null
          }}
        />
      </Provider>
    );

    expect(storeHandlerStub).toHaveBeenCalledWith({
      type: "INITIALIZE",
      newStoreValues: {
        selectedDirection: 1,
        selectedOrigin: "place-welln",
        modalMode: "schedule",
        modalOpen: true
      }
    });
  });

  it("Closes the schedule modal", async () => {
    const user = userEvent.setup();
    jest
      .spyOn(scheduleStoreModule, "getCurrentState")
      .mockImplementation(() => {
        return {
          selectedDirection: 0,
          selectedOrigin: "place-welln",
          modalMode: "schedule",
          modalOpen: true
        };
      });

    const storeHandlerStub = jest.spyOn(scheduleStoreModule, "storeHandler");

    act(() => {
      render(
        <Provider store={store}>
          <SchedulePage
            mapData={mapData}
            noBranches={false}
            schedulePageData={{
              schedule_note: null,
              connections: [],
              fares,
              fare_link: fareLink, // eslint-disable-line camelcase
              hours,
              holidays,
              pdfs,
              teasers,
              route,
              services,
              stops,
              direction_id: 0,
              route_patterns: routePatternsByDirection,
              today: "2019-12-05",
              stop_tree: stopTreeData,
              route_stop_lists: [testRouteStopList],
              alerts: [],
              variant: null
            }}
          />
        </Provider>
      );
    });

    await user.click(screen.getByText("Close"));

    expect(storeHandlerStub).toHaveBeenCalledWith({
      type: "CLOSE_MODAL",
      newStoreValues: {}
    });
  });

  it("Handles change of direction", async () => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <SchedulePage
          mapData={mapData}
          noBranches={false}
          schedulePageData={{
            schedule_note: null,
            connections: [],
            fares,
            fare_link: fareLink, // eslint-disable-line camelcase
            hours,
            holidays,
            pdfs,
            teasers,
            route,
            services,
            stops,
            direction_id: 0,
            route_patterns: routePatternsByDirection,
            today: "2019-12-05",
            stop_tree: stopTreeData,
            route_stop_lists: [testRouteStopList],
            alerts: [],
            variant: null
          }}
        />
      </Provider>
    );

    const storeHandlerStub = jest.spyOn(scheduleStoreModule, "storeHandler");
    const directionSelect = screen.getByTestId(
      "schedule-finder-direction-select"
    );

    await user.selectOptions(directionSelect, "1");

    expect(storeHandlerStub).toHaveBeenNthCalledWith(1, {
      type: "CHANGE_DIRECTION",
      newStoreValues: {
        selectedDirection: 1,
        selectedOrigin: null
      }
    });
  });

  it("Opens the origin modal when clicking on the origin drop-down in the schedule modal", async () => {
    const user = userEvent.setup();
    jest
      .spyOn(scheduleStoreModule, "getCurrentState")
      .mockImplementation(() => {
        return {
          selectedDirection: 0,
          selectedOrigin: "place-welln",
          modalMode: "schedule",
          modalOpen: true
        };
      });

    render(
      <Provider store={store}>
        <SchedulePage
          mapData={mapData}
          noBranches={false}
          schedulePageData={{
            schedule_note: scheduleNoteData,
            connections: [],
            fares,
            fare_link: fareLink, // eslint-disable-line camelcase
            hours,
            holidays,
            pdfs,
            teasers,
            route,
            services,
            stops,
            direction_id: 0,
            route_patterns: routePatternsByDirection,
            today: "2019-12-05",
            stop_tree: stopTreeData,
            route_stop_lists: [testRouteStopList],
            alerts: [],
            variant: null
          }}
        />
      </Provider>
    );

    const storeHandlerStub = jest.spyOn(scheduleStoreModule, "storeHandler");

    const originSelect = await waitFor(() =>
      screen.getByTestId("schedule-finder-origin-select")
    );
    await user.click(originSelect);

    expect(storeHandlerStub).toHaveBeenCalledWith({
      type: "OPEN_MODAL",
      newStoreValues: {
        modalMode: "origin"
      }
    });
  });

  it("Changes the origin", async () => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <SchedulePage
          mapData={mapData}
          noBranches={false}
          schedulePageData={{
            schedule_note: null,
            connections: [],
            fares,
            fare_link: fareLink, // eslint-disable-line camelcase
            hours,
            holidays,
            pdfs,
            teasers,
            route,
            services,
            stops,
            direction_id: 0,
            route_patterns: routePatternsByDirection,
            today: "2019-12-05",
            stop_tree: stopTreeData,
            route_stop_lists: [testRouteStopList],
            alerts: [],
            variant: null
          }}
        />
      </Provider>
    );

    const storeHandlerStub = jest.spyOn(scheduleStoreModule, "storeHandler");
    const originSelect = screen.getByTestId("schedule-finder-origin-select");
    await user.selectOptions(originSelect, "123");

    expect(storeHandlerStub).toHaveBeenCalledTimes(2);

    storeHandlerStub.mockRestore();
  });

  it("Checks if it is a unidirectional route", () => {
    const changeDirectionStub = jest.spyOn(scheduleStoreModule, "storeHandler");

    render(
      <Provider store={store}>
        <SchedulePage
          mapData={mapData}
          noBranches={false}
          schedulePageData={{
            schedule_note: null,
            connections: [],
            fares,
            fare_link: fareLink, // eslint-disable-line camelcase
            hours,
            holidays,
            pdfs,
            teasers,
            route,
            services,
            stops,
            direction_id: 0,
            route_patterns: routes,
            today: "2019-12-05",
            stop_tree: stopTreeData,
            route_stop_lists: [testRouteStopList],
            alerts: [],
            variant: null
          }}
        />
      </Provider>
    );

    expect(changeDirectionStub).toHaveBeenNthCalledWith(1, {
      type: "CHANGE_DIRECTION",
      newStoreValues: {
        selectedDirection: 1,
        selectedOrigin: null
      }
    });

    changeDirectionStub.mockRestore();
  });

  // it("Does not render line diagram because route information is empty", () => {
  //   const schedulePageData = {
  //     route_patterns: {},
  //     route_stop_lists: [],
  //     hours: "",
  //     teasers: "<div>Test Teasers</div>",
  //     direction_id: 1,
  //     route,
  //     stops,
  //     connections: [],
  //     fares: [],
  //     fare_link: "",
  //     holidays: [],
  //     pdfs: [],
  //     stop_tree: stopTreeData,
  //     alerts: [],
  //     schedule_note: null,
  //     services: [],
  //     today: "",
  //     variant: null
  //   } as SchedulePageData;

  //   render(scheduleLoader.doRender(schedulePageData, true, mapData));

  //   expect(screen.queryByText("Stations & Departures")).toBeNull();
  //   expect(screen.getByText("Test Teasers")).toBeInTheDocument();
  // });

  // it("it renders component conditionally (ScheduleNote instead of ScheduleFinder in this case)", async () => {
  //   const schedulePageData = {
  //     route_patterns: routes,
  //     route_stop_lists: [],
  //     schedule_note: scheduleNoteData,
  //     connections: [],
  //     fares,
  //     fare_link: fareLink,
  //     hours,
  //     holidays,
  //     pdfs,
  //     teasers,
  //     route,
  //     services,
  //     stops,
  //     direction_id: 1,
  //     today: "2019-12-05",
  //     stop_tree: stopTreeData,
  //     alerts: [],
  //     variant: null
  //   } as SchedulePageData;

  //   render(scheduleLoader.doRender(schedulePageData, false, mapData));

  //   const hoursNode = await waitFor(() =>
  //     screen.getByText("Hours of Operation")
  //   );
  //   const noteNode = await waitFor(() =>
  //     screen.queryByText(
  //       "Choose a stop to get schedule information and real-time departure predictions."
  //     )
  //   );

  //   expect(hoursNode).toBeInTheDocument();
  //   expect(noteNode).toBeNull();
  // });

  it("it renders with Schedule modal open", () => {
    jest
      .spyOn(scheduleStoreModule, "getCurrentState")
      .mockImplementation(() => {
        return {
          selectedDirection: 0,
          selectedOrigin: "place-welln",
          modalMode: "schedule",
          modalOpen: true
        };
      });

    render(
      <Provider store={store}>
        <SchedulePage
          mapData={mapData}
          noBranches={false}
          schedulePageData={{
            schedule_note: null,
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
            direction_id: 0,
            route_patterns: routePatternsByDirection,
            today: "2019-12-05",
            stop_tree: stopTreeData,
            route_stop_lists: [testRouteStopList],
            alerts: [],
            variant: null
          }}
        />
      </Provider>
    );
    screen.getAllByText("Schedule Finder").forEach(node => {
      expect(node).toBeInTheDocument();
    });
  });

  it("it handles change in origin", async () => {
    const user = userEvent.setup();
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

    render(
      <Provider store={store}>
        <SchedulePage
          mapData={mapData}
          noBranches={false}
          schedulePageData={{
            schedule_note: null,
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
            direction_id: 0,
            route_patterns: routePatternsByDirection,
            today: "2019-12-05",
            stop_tree: stopTreeData,
            route_stop_lists: [testRouteStopList],
            alerts: [],
            variant: null
          }}
        />
      </Provider>
    );

    const storeHandlerSpy = jest.spyOn(scheduleStoreModule, "storeHandler");
    const originSelects = screen.getAllByTestId(
      "schedule-finder-origin-select"
    );
    expect(originSelects).toHaveLength(2);

    await user.click(originSelects[1]);

    expect(storeHandlerSpy).toHaveBeenCalledWith({
      type: "OPEN_MODAL",
      newStoreValues: {
        modalMode: "origin"
      }
    });

    stubFn.mockRestore();
    storeHandlerSpy.mockRestore();
  });

  // it("it only shows teasers and upcoming holidays because it is a suspended route", () => {
  //   const schedulePageData = {
  //     route_patterns: {},
  //     direction_id: 1,
  //     route,
  //     stops,
  //     hours,
  //     connections: [
  //       {
  //         group_name: "subway",
  //         routes: [
  //           {
  //             route: {
  //               type: 1,
  //               name: "Orange Line",
  //               header: "Orange Line",
  //               long_name: "Orange Line",
  //               id: "Orange",
  //               direction_names: {
  //                 "0": "South",
  //                 "1": "North"
  //               },
  //               direction_destinations: {
  //                 "0": "Ashmont/Braintree",
  //                 "1": "Alewife"
  //               },
  //               description: "rapid_transit",
  //               alerts: []
  //             }
  //           }
  //         ]
  //       }
  //     ],
  //     fares,
  //     holidays,
  //     teasers,
  //     stop_tree: stopTreeData,
  //     alerts: [],
  //     pdfs
  //   };

  //   document.body.innerHTML = `<div id="react-root-schedule-page">
  // <script id="js-schedule-page-data" type="text/plain">${JSON.stringify(
  //   schedulePageData
  // )}</script>
  // <script id="js-map-data"
  //       data-channel-id="test-channel"
  //       type="text/plain">
  //       ${JSON.stringify(mapData)}
  // </script>
  // </div>`;

  //   scheduleLoader.default();

  //   expect(document.body.innerHTML.indexOf("Fares")).toEqual(-1);
  //   expect(document.body.innerHTML.indexOf("PDF Schedules")).toEqual(-1);
  //   expect(document.body.innerHTML.indexOf("Connections")).toEqual(-1);
  //   expect(document.body.innerHTML.indexOf("Hours of Operation")).toEqual(-1);

  //   expect(document.body.innerHTML.indexOf("Some teaser from CMS")).not.toEqual(
  //     -1
  //   );
  //   expect(document.body.innerHTML.indexOf("Upcoming Holidays")).not.toEqual(
  //     -1
  //   );
  // });
});
