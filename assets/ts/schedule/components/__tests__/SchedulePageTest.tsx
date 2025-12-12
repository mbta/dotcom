import React from "react";
import * as reactRedux from "react-redux";
import lineDiagramData from "./test-data/lineDiagramData.json"; // Not a full line diagram
import {
  ServiceInSelector,
  RoutePatternsByDirection,
  StopTreeData
} from "../__schedule";
import { EnhancedRoute } from "../../../__v3api";
import { MapData, StaticMapData } from "../../../leaflet/components/__mapdata";
import {
  SchedulePage,
  changeOrigin,
  changeDirection,
  handleOriginSelectClick
} from "../SchedulePage";
import * as schedulePage from "../SchedulePage";
import * as routePatternsByDirectionData from "./test-data/routePatternsByDirectionData.json";
import * as useStop from "../../../hooks/useStop";
import { FetchStatus } from "../../../helpers/use-fetch";
import { act, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EnhancedJourney } from "../__trips";
import * as upcomingDepartures from "../schedule-finder/upcoming-departures/UpcomingDepartures";
import * as useHoursOfOperation from "../../../hooks/useHoursOfOperation";
import { renderWithProviders } from "../../../__tests__/test-render-helper";

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

const ferryRoute: EnhancedRoute = {
  alerts: [],
  description: "",
  direction_destinations: { 0: "Long Warf", 1: "Charlestown" },
  direction_names: { 0: "Inbound", 1: "Outbound" },
  header: "",
  id: "Boat-F4",
  name: "Charlestown Ferry",
  long_name: "Charlestown Ferry",
  type: 4,
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

describe("SchedulePage", () => {
  beforeEach(() => {
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
    renderWithProviders(
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
          variant: null,
          "service_today?": true
        }}
      />
    );

    expect(screen.getByText("PDF Schedules and Maps")).toBeInTheDocument();
  });

  it("Renders ScheduleFinder", () => {
    renderWithProviders(
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
          "service_today?": true,
          variant: null
        }}
      />
    );
    expect(screen.getByText("Schedule Finder")).toBeInTheDocument();
  });

  it("Renders the map and schedule finder", () => {
    renderWithProviders(
      <SchedulePage
        mapData={mapData}
        noBranches={false}
        staticMapData={staticMapData}
        schedulePageData={{
          schedule_note: scheduleNoteData,
          connections: [],
          fares,
          fare_link: fareLink, // eslint-disable-line camelcase
          hours,
          holidays,
          pdfs,
          teasers,
          route: ferryRoute,
          services,
          stops,
          direction_id: 0,
          route_patterns: routePatternsByDirection,
          today: "2019-12-05",
          stop_tree: stopTreeData,
          route_stop_lists: [testRouteStopList],
          alerts: [],
          "service_today?": true,
          variant: null
        }}
      />
    );

    expect(screen.getByText("Schedule Finder")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Get schedule information for your next Charlestown Ferry trip."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Route Map")).toBeInTheDocument();
    expect(screen.getByText("View map as a PDF")).toBeInTheDocument();
    expect(screen.queryByText("Today's Service")).toBeNull();
    expect(screen.queryByText(/Choose a stop to get schedule.*/)).toBeNull();
  });

  it("Renders ScheduleNote with Schedule modal", async () => {
    act(() => {
      renderWithProviders(
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
            "service_today?": true,
            variant: null
          }}
        />,
        {
          preloadedState: {
            selectedDirection: 0,
            selectedOrigin: "place-welln",
            modalMode: "schedule",
            modalOpen: true
          }
        }
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
    jest.spyOn(reactRedux, "useSelector").mockImplementation(() => {
      return {} as any;
    });

    const { container } = renderWithProviders(
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
          "service_today?": true,
          variant: null
        }}
      />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("Shows the modal with pre-populated values", async () => {
    act(() => {
      renderWithProviders(
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
            "service_today?": true,
            variant: null
          }}
        />,
        {
          preloadedState: {
            selectedDirection: 0,
            selectedOrigin: "place-welln",
            modalMode: "schedule",
            modalOpen: true
          }
        }
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
    renderWithProviders(
      <SchedulePage
        mapData={mapData}
        noBranches={false}
        staticMapData={staticMapData}
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
          "service_today?": true,
          variant: null
        }}
      />
    );
    expect(screen.getByText("ScheduleDirection")).toBeInTheDocument();
  });

  it("Opens the schedule modal", async () => {
    const user = userEvent.setup();
    const dispatchSpy = jest.fn();
    jest.spyOn(reactRedux, "useDispatch").mockImplementation(() => {
      return dispatchSpy;
    });

    renderWithProviders(
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
          "service_today?": true,
          variant: null
        }}
      />,
      {
        preloadedState: {
          selectedDirection: 0,
          selectedOrigin: "place-welln",
          modalMode: "schedule",
          modalOpen: false
        }
      }
    );

    const originSelect = screen.getByTestId("schedule-finder-origin-select");

    await user.click(originSelect);

    expect(dispatchSpy).toHaveBeenCalledTimes(2);
  });

  it("Opens the origin modal", async () => {
    const user = userEvent.setup();
    const dispatchSpy = jest.fn();
    jest.spyOn(reactRedux, "useDispatch").mockImplementation(() => {
      return dispatchSpy;
    });
    renderWithProviders(
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
          "service_today?": true,
          variant: null
        }}
      />
    );

    jest.spyOn(reactRedux, "useSelector").mockImplementation(() => {
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
    expect(dispatchSpy).toHaveBeenNthCalledWith(2, {
      type: "OPEN_MODAL",
      newStoreValues: {
        modalMode: "origin"
      }
    });
  });

  it("Closes the schedule modal", async () => {
    const user = userEvent.setup();
    const dispatchSpy = jest.fn();
    jest.spyOn(reactRedux, "useDispatch").mockImplementation(() => {
      return dispatchSpy;
    });

    act(() => {
      renderWithProviders(
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
            "service_today?": true,
            variant: null
          }}
        />,
        {
          preloadedState: {
            selectedDirection: 0,
            selectedOrigin: "place-welln",
            modalMode: "schedule",
            modalOpen: true
          }
        }
      );
    });

    await user.click(screen.getByText("Close"));

    expect(dispatchSpy).toHaveBeenCalledWith({
      type: "CLOSE_MODAL",
      newStoreValues: {}
    });
  });

  it("Handles change of direction", async () => {
    const user = userEvent.setup();
    const changeDirectionSpy = jest.spyOn(schedulePage, "changeDirection");
    renderWithProviders(
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
          "service_today?": true,
          variant: null
        }}
      />
    );

    const directionSelect = screen.getByTestId(
      "schedule-finder-direction-select"
    );

    await user.selectOptions(directionSelect, "1");

    expect(changeDirectionSpy).toHaveBeenNthCalledWith(
      1,
      1,
      expect.any(Function)
    );
  });

  it("Opens the origin modal when clicking on the origin drop-down in the schedule modal", async () => {
    const user = userEvent.setup();
    const changeOriginSpy = jest.spyOn(schedulePage, "handleOriginSelectClick");

    renderWithProviders(
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
          "service_today?": true,
          variant: null
        }}
      />,
      {
        preloadedState: {
          selectedDirection: 0,
          selectedOrigin: "place-welln",
          modalMode: "schedule",
          modalOpen: true
        }
      }
    );
    const originSelect = await waitFor(() =>
      screen.getByTestId("schedule-finder-origin-select")
    );

    await user.click(originSelect);

    await waitFor(() =>
      expect(changeOriginSpy).toHaveBeenCalledWith(expect.any(Function))
    );
  });

  it("Changes the origin", async () => {
    const user = userEvent.setup();
    renderWithProviders(
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
          "service_today?": true,
          variant: null
        }}
      />
    );

    const dispatchSpy = jest.fn();
    jest.spyOn(reactRedux, "useDispatch").mockImplementation(() => {
      return dispatchSpy;
    });
    const originSelect = screen.getByTestId("schedule-finder-origin-select");
    await user.selectOptions(originSelect, "123");

    expect(dispatchSpy).toHaveBeenCalledTimes(2);
  });

  it("Checks if it is a unidirectional route", () => {
    const dispatchSpy = jest.fn();
    jest.spyOn(reactRedux, "useDispatch").mockImplementation(() => {
      return dispatchSpy;
    });

    renderWithProviders(
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
          "service_today?": true,
          variant: null
        }}
      />
    );

    expect(dispatchSpy).toHaveBeenNthCalledWith(1, {
      type: "CHANGE_DIRECTION",
      newStoreValues: {
        selectedDirection: 1,
        selectedOrigin: null
      }
    });
  });

  it("it renders with Schedule modal open", () => {
    renderWithProviders(
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
          "service_today?": true,
          variant: null
        }}
      />,
      {
        preloadedState: {
          selectedDirection: 0,
          selectedOrigin: "place-welln",
          modalMode: "schedule",
          modalOpen: true
        }
      }
    );
    screen.getAllByText("Schedule Finder").forEach(node => {
      expect(node).toBeInTheDocument();
    });
  });

  it("it handles change in origin", async () => {
    const user = userEvent.setup();
    const changeOriginSpy = jest.spyOn(schedulePage, "changeOrigin");

    renderWithProviders(
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
          "service_today?": true,
          variant: null
        }}
      />,
      {
        preloadedState: {
          selectedDirection: 0,
          selectedOrigin: "place-welln",
          modalMode: "schedule",
          modalOpen: true
        }
      }
    );

    const originSelects = screen.getAllByTestId(
      "schedule-finder-origin-select"
    );
    expect(originSelects).toHaveLength(2);

    await user.selectOptions(originSelects[0], "123");

    await waitFor(() =>
      expect(changeOriginSpy).toHaveBeenCalledWith("123", expect.any(Function))
    );
  });

  describe("changeOrigin", () => {
    it("should call the dispatch function twice", () => {
      const dispatchSpy = jest.fn();
      const testOrigin = "test-origin";
      changeOrigin(testOrigin, dispatchSpy);
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: "CHANGE_ORIGIN",
        newStoreValues: {
          selectedOrigin: testOrigin
        }
      });
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: "OPEN_MODAL",
        newStoreValues: {
          modalMode: "schedule"
        }
      });
    });
  });

  describe("changeDirection", () => {
    it("should call the dispatch function setting the new direction in the state", () => {
      const dispatchSpy = jest.fn();
      const testDirection = 1;
      changeDirection(testDirection, dispatchSpy);
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: "CHANGE_DIRECTION",
        newStoreValues: {
          selectedDirection: testDirection,
          selectedOrigin: null
        }
      });
    });
  });

  describe("handleOriginSelectClick", () => {
    it("should call the dispatch function setting the new direction in the state", () => {
      const dispatchSpy = jest.fn();
      handleOriginSelectClick(dispatchSpy);
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: "OPEN_MODAL",
        newStoreValues: {
          modalMode: "origin"
        }
      });
    });
  });
});
