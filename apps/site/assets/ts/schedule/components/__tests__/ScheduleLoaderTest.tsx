import React from "react";
import { Provider } from "react-redux";
import lineDiagramData from "./test-data/lineDiagramData.json"; // Not a full line diagram
import {
  LineDiagramStop,
  ServiceInSelector,
  RoutePatternsByDirection,
  ShapesById
} from "../__schedule";
import { EnhancedRoute } from "../../../__v3api";
import { mount, ReactWrapper } from "enzyme";
import { store } from "../../store/ScheduleStore";
import { MapData, StaticMapData } from "../../../leaflet/components/__mapdata";
import ScheduleLoader from "../ScheduleLoader";
import ScheduleFinder from "../ScheduleFinder";
import ScheduleFinderModal from "../schedule-finder/ScheduleFinderModal";
import ScheduleNote from "../ScheduleNote";
import * as scheduleStoreModule from "../../store/ScheduleStore";
import * as scheduleLoader from "../../schedule-loader";
import * as routePatternsByDirectionData from "./test-data/routePatternsByDirectionData.json";

jest.mock("../../../helpers/use-fetch", () => ({
  __esModule: true,
  hasData: () => false,
  isLoading: () => true,
  isNotStarted: () => false,
  default: jest.fn().mockImplementation(() => [{ status: 2 }, jest.fn()])
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

const lineDiagram = lineDiagramData as LineDiagramStop[];

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
  description: "",
  direction_destinations: { 0: "Oak Grove", 1: "Forest Hills" },
  direction_names: { 0: "Inbound", 1: "Outbound" },
  header: "",
  id: "Orange",
  name: "Orange",
  long_name: "Orange Line",
  type: 1
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
  type: 2
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
  offpeak_service: "8-12 minutes",
  peak_service: "5 minutes",
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

const shapesById = {
  "shape-1": {
    stop_ids: ["stop"],
    priority: 3,
    polyline: "xyz",
    name: "Shape 1",
    id: "shape-1",
    direction_id: 0
  },
  "shape-2": {
    stop_ids: ["stop"],
    priority: 3,
    polyline: "xyz",
    name: "Shape 2",
    id: "shape-2",
    direction_id: 1
  },
  "shape-3": {
    stop_ids: ["stop"],
    priority: 3,
    polyline: "xyz",
    name: "Shape 3",
    id: "shape-3",
    direction_id: 0
  }
} as ShapesById;

jest.mock("../ScheduleDirection", () => {
  return {
    __esModule: true,
    default: () => {
      return <div>ScheduleDirection</div>;
    }
  };
});

describe("ScheduleLoader", () => {
  let wrapper: ReactWrapper;

  it("Renders additional line information", () => {
    wrapper = mount(
      <Provider store={store}>
        <ScheduleLoader
          component="ADDITIONAL_LINE_INFORMATION"
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
            line_diagram: lineDiagram,
            today: "2019-12-05",
            variant: null
          }}
          updateURL={() => {}}
        />
      </Provider>
    );
    expect(wrapper.html()).not.toBeNull();
    wrapper.unmount();
  });

  it("Renders ScheduleFinder", () => {
    wrapper = mount(
      <Provider store={store}>
        <ScheduleLoader
          component="SCHEDULE_FINDER"
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
            line_diagram: lineDiagram,
            today: "2019-12-05",
            variant: null
          }}
          updateURL={() => {}}
        />
      </Provider>
    );
    expect(wrapper.find(ScheduleFinder).exists()).toEqual(true);
    expect(wrapper.find(ScheduleNote).exists()).toEqual(false);

    wrapper.unmount();
  });

  it("Renders ScheduleNote", () => {
    wrapper = mount(
      <Provider store={store}>
        <ScheduleLoader
          component="SCHEDULE_NOTE"
          schedulePageData={{
            schedule_note: scheduleNoteData,
            connections: [],
            fares,
            fare_link: fareLink, // eslint-disable-line camelcase
            hours,
            holidays,
            pdfs,
            teasers,
            route: routeNotSubway,
            services,
            stops,
            direction_id: 0,
            route_patterns: routePatternsByDirection,
            line_diagram: lineDiagram,
            today: "2019-12-05",
            variant: null
          }}
          updateURL={() => {}}
        />
      </Provider>
    );
    expect(wrapper.find(ScheduleNote).exists()).toEqual(true);
    expect(wrapper.find(ScheduleFinder).exists()).toEqual(false);

    wrapper.unmount();
  });

  it("Does Not Render ScheduleNote", () => {
    wrapper = mount(
      <Provider store={store}>
        <ScheduleLoader
          component="SCHEDULE_NOTE"
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
            line_diagram: lineDiagram,
            today: "2019-12-05",
            variant: null
          }}
          updateURL={() => {}}
        />
      </Provider>
    );
    expect(wrapper.find(ScheduleNote).exists()).toEqual(false);
    expect(wrapper.find(ScheduleFinder).exists()).toEqual(false);

    wrapper.unmount();
  });

  it("Renders ScheduleNote with Schedule modal", () => {
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

    wrapper = mount(
      <Provider store={store}>
        <ScheduleLoader
          component="SCHEDULE_NOTE"
          schedulePageData={{
            schedule_note: scheduleNoteData,
            connections: [],
            fares,
            fare_link: fareLink, // eslint-disable-line camelcase
            hours,
            holidays,
            pdfs,
            teasers,
            route: routeNotSubway,
            services,
            stops,
            direction_id: 0,
            route_patterns: routePatternsByDirection,
            line_diagram: lineDiagram,
            today: "2019-12-05",
            variant: null
          }}
          updateURL={() => {}}
        />
      </Provider>
    );
    expect(wrapper.find(ScheduleFinderModal).exists()).toEqual(true);

    wrapper.unmount();
  });

  it("Renders empty component", () => {
    wrapper = mount(
      <Provider store={store}>
        <ScheduleLoader
          component=""
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
            line_diagram: lineDiagram,
            today: "2019-12-05",
            variant: null
          }}
          updateURL={() => {}}
        />
      </Provider>
    );
    expect(wrapper.html()).toEqual("");
    wrapper.unmount();
  });

  it("Shows the modal with pre-populated values", () => {
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

    wrapper = mount(
      <Provider store={store}>
        <ScheduleLoader
          component="SCHEDULE_FINDER"
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
            line_diagram: lineDiagram,
            today: "2019-12-05",
            variant: null
          }}
          updateURL={() => {}}
        />
      </Provider>
    );
    expect(wrapper.find(ScheduleFinderModal).exists()).toEqual(true);

    wrapper.unmount();
  });

  it("Shows the ScheduleDirection component", () => {
    document.body.innerHTML = `<div id="react-root">
  <script id="js-map-data" type="text/plain">${JSON.stringify(mapData)}</script>
  <script id="static-map-data" type="text/plain">${JSON.stringify(
    staticMapData
  )}</script>
  </div>`;

    wrapper = mount(
      <Provider store={store}>
        <ScheduleLoader
          component="SCHEDULE_DIRECTION"
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
            line_diagram: lineDiagram,
            today: "2019-12-05",
            variant: null
          }}
          updateURL={() => {}}
        />
      </Provider>
    );
    expect(wrapper.find("div").html()).toMatch("ScheduleDirection");

    wrapper.unmount();
  });

  it("Opens the schedule modal", () => {
    wrapper = mount(
      <Provider store={store}>
        <ScheduleLoader
          component="SCHEDULE_FINDER"
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
            line_diagram: lineDiagram,
            today: "2019-12-05",
            variant: null
          }}
          updateURL={() => {}}
        />
      </Provider>
    );

    const getCurrentStateStub = jest
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

    wrapper
      .find("form")
      .first()
      .simulate("submit", { preventDefault: () => {} });

    expect(storeHandlerStub).toHaveBeenCalledTimes(1);

    wrapper.unmount();
  });

  it("Opens the origin modal", () => {
    wrapper = mount(
      <Provider store={store}>
        <ScheduleLoader
          component="SCHEDULE_FINDER"
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
            line_diagram: lineDiagram,
            today: "2019-12-05",
            variant: null
          }}
          updateURL={() => {}}
        />
      </Provider>
    );

    const storeHandlerStub = jest.spyOn(scheduleStoreModule, "storeHandler");

    const getCurrentStateStub = jest
      .spyOn(scheduleStoreModule, "getCurrentState")
      .mockImplementation(() => {
        return {
          selectedDirection: 0,
          selectedOrigin: "place-welln",
          modalMode: "origin",
          modalOpen: false
        };
      });

    wrapper
      .find("SelectContainer")
      .last()
      // @ts-ignore -- types for `invoke` seem to be too restrictive
      .invoke("handleClick")();

    // first call is with INITIALIZE
    expect(storeHandlerStub).toHaveBeenNthCalledWith(2, {
      type: "OPEN_MODAL",
      newStoreValues: {
        modalMode: "origin"
      }
    });

    wrapper.unmount();
  });

  it("Shows the schedule modal on load", () => {
    window.history.replaceState(
      {},
      "",
      "/?schedule_finder%5Bdirection_id%5D=0&schedule_finder%5Borigin%5D=place-welln"
    );

    const storeHandlerStub = jest.spyOn(scheduleStoreModule, "storeHandler");

    wrapper = mount(
      <Provider store={store}>
        <ScheduleLoader
          component="SCHEDULE_FINDER"
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
            line_diagram: lineDiagram,
            today: "2019-12-05",
            variant: null
          }}
          updateURL={() => {}}
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

    wrapper.unmount();

    // now check with the opposite direction:
    window.history.replaceState(
      {},
      "",
      "/?schedule_finder%5Bdirection_id%5D=1&schedule_finder%5Borigin%5D=place-welln"
    );
    wrapper = mount(
      <Provider store={store}>
        <ScheduleLoader
          component="SCHEDULE_FINDER"
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
            line_diagram: lineDiagram,
            today: "2019-12-05",
            variant: null
          }}
          updateURL={() => {}}
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

    wrapper.unmount();
  });

  it("Closes the schedule modal", () => {
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

    const storeHandlerStub = jest.spyOn(scheduleStoreModule, "storeHandler");

    wrapper = mount(
      <Provider store={store}>
        <ScheduleLoader
          component="SCHEDULE_FINDER"
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
            line_diagram: lineDiagram,
            today: "2019-12-05",
            variant: null
          }}
          updateURL={() => {}}
        />
      </Provider>
    );

    wrapper.find("#modal-close").simulate("click");

    expect(storeHandlerStub).toHaveBeenCalledWith({
      type: "CLOSE_MODAL",
      newStoreValues: {}
    });

    wrapper.unmount();
  });

  it("Handles change of direction", () => {
    wrapper = mount(
      <Provider store={store}>
        <ScheduleLoader
          component="SCHEDULE_FINDER"
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
            line_diagram: lineDiagram,
            today: "2019-12-05",
            variant: null
          }}
          updateURL={() => {}}
        />
      </Provider>
    );

    const storeHandlerStub = jest.spyOn(scheduleStoreModule, "storeHandler");

    wrapper
      .find("select")
      .first()
      .simulate("change", { target: { value: 1 } });

    expect(storeHandlerStub).toHaveBeenNthCalledWith(2, {
      type: "CHANGE_DIRECTION",
      newStoreValues: {
        selectedDirection: 1,
        selectedOrigin: null
      }
    });
    wrapper.unmount();
  });

  it("Opens the origin modal when clicking on the origin drop-down in the schedule modal", () => {
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

    wrapper = mount(
      <Provider store={store}>
        <ScheduleLoader
          component="SCHEDULE_NOTE"
          schedulePageData={{
            schedule_note: scheduleNoteData,
            connections: [],
            fares,
            fare_link: fareLink, // eslint-disable-line camelcase
            hours,
            holidays,
            pdfs,
            teasers,
            route: routeNotSubway,
            services,
            stops,
            direction_id: 0,
            route_patterns: routePatternsByDirection,
            line_diagram: lineDiagram,
            today: "2019-12-05",
            variant: null
          }}
          updateURL={() => {}}
        />
      </Provider>
    );

    const storeHandlerStub = jest.spyOn(scheduleStoreModule, "storeHandler");

    // select the origin drop-down to open the origin modal
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

  it("Changes the origin", () => {
    wrapper = mount(
      <Provider store={store}>
        <ScheduleLoader
          component="SCHEDULE_FINDER"
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
            line_diagram: lineDiagram,
            today: "2019-12-05",
            variant: null
          }}
          updateURL={() => {}}
        />
      </Provider>
    );

    const storeHandlerStub = jest.spyOn(scheduleStoreModule, "storeHandler");

    //change the origin
    wrapper
      .find("select")
      .at(1)
      .simulate("change", { target: { value: "123" } });

    expect(storeHandlerStub).toHaveBeenCalledTimes(3);

    storeHandlerStub.mockRestore();
    wrapper.unmount();
  });

  it("Checks if it is a unidirectional route", () => {
    const changeDirectionStub = jest.spyOn(scheduleStoreModule, "storeHandler");

    wrapper = mount(
      <Provider store={store}>
        <ScheduleLoader
          component="SCHEDULE_FINDER"
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
            line_diagram: lineDiagram,
            today: "2019-12-05",
            variant: null
          }}
          updateURL={() => {}}
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
    wrapper.unmount();
  });

  it("Does not render line diagram because route information is empty", () => {
    const schedulePageData = {
      route_patterns: {},
      direction_id: 1,
      route,
      stops,
      connections: [],
      fares: [],
      holidays: [],
      pdfs: []
    };

    document.body.innerHTML = `<div id="react-root">
  <script id="js-schedule-page-data" type="text/plain">${JSON.stringify(
    schedulePageData
  )}</script>
  </div>`;

    const renderAdditionalLineInformationStub = jest.spyOn(
      scheduleLoader,
      "renderAdditionalLineInformation"
    );
    const renderDirectionOrMapPageStub = jest.spyOn(
      scheduleLoader,
      "renderDirectionOrMap"
    );

    scheduleLoader.default(); //onLoad

    expect(renderAdditionalLineInformationStub).toHaveBeenCalled();
    expect(renderDirectionOrMapPageStub).not.toHaveBeenCalled();
  });

  it("it renders component conditionally (ScheduleNote instead of ScheduleFinder in this case)", () => {
    const schedulePageData = {
      route_patterns: routes,
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
      line_diagram: lineDiagram,
      today: "2019-12-05",
      variant: null
    };

    document.body.innerHTML = `<div id="react-root">
  <script id="js-schedule-page-data" type="text/plain">${JSON.stringify(
    schedulePageData
  )}</script>
  </div>
  <div id="react-schedule-note-root"></div>
  <div id="react-schedule-finder-root"></div>`;

    scheduleLoader.default();

    const scheduleNoteNode = document.getElementById(
      "react-schedule-note-root"
    ) as HTMLElement;

    const scheduleFinderNode = document.getElementById(
      "react-schedule-finder-root"
    ) as HTMLElement;

    expect(scheduleNoteNode.innerHTML === "").toBe(false);
    expect(scheduleFinderNode.innerHTML === "").toBe(true);
  });

  it("it renders with Schedule modal open", () => {
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

    const schedulePageData = {
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
      route_patterns: {},
      line_diagram: lineDiagram,
      today: "2019-12-05",
      variant: null
    };

    wrapper = mount(
      <Provider store={store}>
        <ScheduleLoader
          component="SCHEDULE_FINDER"
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
            line_diagram: lineDiagram,
            today: "2019-12-05",
            variant: null
          }}
          updateURL={() => {}}
        />
      </Provider>
    );

    expect(wrapper.find(ScheduleFinderModal).exists()).toEqual(true);
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

    wrapper = mount(
      <Provider store={store}>
        <ScheduleLoader
          component="SCHEDULE_FINDER"
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
            line_diagram: lineDiagram,
            today: "2019-12-05",
            variant: null
          }}
          updateURL={() => {}}
        />
      </Provider>
    );

    const storeHandlerSpy = jest.spyOn(scheduleStoreModule, "storeHandler");

    // trigger selection in origin
    // first 2 SelectContainer's are from the ScheduleFinder 'covered' by the modal at this point
    wrapper
      .find("SelectContainer")
      .at(3)
      // @ts-ignore -- types for `invoke` seem to be too restrictive
      .invoke("handleClick")();

    expect(storeHandlerSpy).toHaveBeenCalledWith({
      type: "OPEN_MODAL",
      newStoreValues: {
        modalMode: "origin"
      }
    });

    stubFn.mockRestore();
    storeHandlerSpy.mockRestore();
    wrapper.unmount();
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
      pdfs
    };

    document.body.innerHTML = `<div id="react-root">
  <script id="js-schedule-page-data" type="text/plain">${JSON.stringify(
    schedulePageData
  )}</script>
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
