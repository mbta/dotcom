import React from "react";
import renderer from "react-test-renderer";
import { shallow, mount } from "enzyme";
import stopData from "./stopData.json";
import { StopPageData, TypedRoutes } from "../components/__stop";
import Header from "../components/Header";
import { createReactRoot } from "../../app/helpers/testUtils";
import { EnhancedRoute } from "../../__v3api";

const data = JSON.parse(JSON.stringify(stopData)) as StopPageData;

it("renders", () => {
  createReactRoot();
  const tree = renderer
    .create(
      <Header
        stop={data.stop}
        routes={data.routes}
        zoneNumber={data.zone_number}
        tabs={data.tabs}
        dispatch={undefined}
        selectedTab="info"
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it("renders with green line routes", () => {
  /* eslint-disable camelcase */
  const routes: TypedRoutes[] = [
    {
      group_name: "subway",
      routes: [
        {
          route: {
            type: 1,
            name: "Green Line",
            header: "Green Line",
            long_name: "Green Line",
            id: "Green",
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
          },
          directions: []
        },
        {
          route: {
            type: 1,
            name: "B Line",
            header: "B Line",
            long_name: "B Line",
            id: "Green-B",
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
          },
          directions: []
        },
        {
          route: {
            type: 1,
            name: "C Line",
            header: "C Line",
            long_name: "C Line",
            id: "Green-C",
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
          },
          directions: []
        },
        {
          route: {
            type: 1,
            name: "D Line",
            header: "D Line",
            long_name: "D Line",
            id: "Green-D",
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
          },
          directions: []
        },
        {
          route: {
            type: 1,
            name: "E Line",
            header: "E Line",
            long_name: "E Line",
            id: "Green-E",
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
          },
          directions: []
        }
      ]
    }
  ];
  /* eslint-enable camelcase */

  const tree = renderer
    .create(
      <Header
        stop={data.stop}
        routes={routes}
        zoneNumber={data.zone_number}
        tabs={data.tabs}
        dispatch={undefined}
        selectedTab="info"
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it("renders all subway routes", () => {
  /* eslint-disable camelcase */
  const routes: TypedRoutes[] = [
    {
      group_name: "subway",
      routes: [
        {
          route: {
            type: 1,
            name: "Red Line",
            header: "Red Line",
            long_name: "Red Line",
            id: "Red",
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
          },
          directions: []
        },
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
          },
          directions: []
        },
        {
          route: {
            type: 1,
            name: "Blue Line",
            header: "Blue Line",
            long_name: "Blue Line",
            id: "Blue",
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
          },
          directions: []
        },
        {
          route: {
            type: 1,
            name: "Mattapan Line",
            header: "Mattapan Line",
            long_name: "Mattapan Line",
            id: "Mattapan",
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
          },
          directions: []
        }
      ]
    }
  ];
  /* eslint-enable camelcase */

  const tree = renderer
    .create(
      <Header
        stop={data.stop}
        routes={routes}
        zoneNumber={data.zone_number}
        tabs={data.tabs}
        dispatch={undefined}
        selectedTab="info"
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it("renders a ferry route", () => {
  /* eslint-disable camelcase */
  const routes: TypedRoutes[] = [
    {
      group_name: "ferry",
      routes: [
        {
          route: {
            type: 4,
            name: "Charlestown Ferry",
            header: "Charlestown Ferry",
            long_name: "Charlestown Ferry",
            id: "Boat-F4",
            direction_names: { "0": "Outbound", "1": "Inbound" },
            direction_destinations: { "0": "Charlestown", "1": "Long Wharf" },
            description: "ferry",
            alerts: []
          },
          directions: []
        }
      ]
    }
  ];
  /* eslint-enable camelcase */

  const tree = renderer
    .create(
      <Header
        stop={data.stop}
        routes={routes}
        zoneNumber={data.zone_number}
        tabs={data.tabs}
        dispatch={undefined}
        selectedTab="info"
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it("upcases name of non-bus stops", () => {
  /* eslint-disable camelcase */
  const routes: TypedRoutes[] = [
    {
      group_name: "bus",
      routes: [
        {
          route: {
            type: 3,
            name: "Bus",
            header: "Bus",
            long_name: "Bus",
            id: "Bus",
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
          },
          directions: []
        }
      ]
    },
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
          },
          directions: []
        }
      ]
    }
  ];
  /* eslint-enable camelcase */

  const wrapper = shallow(
    <Header
      stop={data.stop}
      routes={routes}
      zoneNumber={data.zone_number}
      tabs={data.tabs}
      dispatch={undefined}
      selectedTab="info"
    />
  );
  expect(wrapper.find(".m-stop-page__name")).toHaveLength(1);
  expect(wrapper.find(".m-stop-page__name--upcase")).toHaveLength(1);
});

it("does not upcase name of bus-only stops", () => {
  /* eslint-disable camelcase */
  const routes: TypedRoutes[] = [
    {
      group_name: "bus",
      routes: [
        {
          route: {
            type: 3,
            name: "Bus",
            header: "Bus",
            long_name: "Bus",
            id: "Bus",
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
          },
          directions: []
        }
      ]
    }
  ];
  /* eslint-enable camelcase */

  const wrapper = shallow(
    <Header
      stop={data.stop}
      routes={routes}
      zoneNumber={data.zone_number}
      tabs={data.tabs}
      dispatch={undefined}
      selectedTab="info"
    />
  );
  expect(wrapper.find(".m-stop-page__name")).toHaveLength(1);
  expect(wrapper.find(".m-stop-page__name--upcase")).toHaveLength(0);
});

it("separates bus and silver line pills", () => {
  /* eslint-disable camelcase */
  const busRoute: EnhancedRoute = {
    type: 3,
    name: "Bus",
    header: "Bus",
    long_name: "Bus",
    id: "Bus",
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
  };

  const routesWithoutSilverLine: TypedRoutes[] = [
    {
      group_name: "bus",
      routes: [
        { route: { ...busRoute, id: "1" }, directions: [] },
        { route: { ...busRoute, id: "2" }, directions: [] }
      ]
    }
  ];

  const routesWithSilverLine: TypedRoutes[] = [
    {
      group_name: "bus",
      routes: [
        { route: busRoute, directions: [] },
        { route: { ...busRoute, id: "746", name: "SL1" }, directions: [] }
      ]
    }
  ];
  /* eslint-enable camelcase */

  expect(
    mount(
      <Header
        stop={data.stop}
        routes={routesWithoutSilverLine}
        zoneNumber=""
        tabs={[]}
        dispatch={undefined}
        selectedTab="info"
      />
    )
      .find(".m-stop-page__header-feature")
      .filterWhere(pill => pill.prop("href") === "#route-card-list").length
  ).toEqual(1);

  expect(
    mount(
      <Header
        stop={data.stop}
        routes={routesWithSilverLine}
        zoneNumber=""
        tabs={[]}
        dispatch={() => {}}
        selectedTab="info"
      />
    )
      .find(".m-stop-page__header-feature")
      .filterWhere(pill => pill.prop("href") === "#route-card-list").length
  ).toEqual(2);
});

it("dispatches clickRoutePillAction when route pill is clicked", () => {
  /* eslint-disable camelcase */
  const routes: TypedRoutes[] = [
    {
      group_name: "bus",
      routes: [
        {
          route: {
            type: 3,
            name: "Bus",
            header: "Bus",
            long_name: "Bus",
            id: "Bus",
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
          },
          directions: []
        }
      ]
    }
  ];
  /* eslint-enable camelcase */
  const spy = jest.fn();
  const wrapper = mount(
    <Header
      stop={data.stop}
      routes={routes}
      zoneNumber={data.zone_number}
      tabs={data.tabs}
      dispatch={spy}
      selectedTab="info"
    />
  );

  const pills = wrapper.find(".m-stop-page__header-feature");
  expect(pills).toHaveLength(3);
  pills.at(0).simulate("click");
  expect(spy).toHaveBeenCalledWith({
    type: "CLICK_ROUTE_PILL",
    payload: { mode: "bus" }
  });
});

it("dispatches clickRoutePillAction when zone pill is clicked", () => {
  const spy = jest.fn();
  const wrapper = mount(
    <Header
      stop={data.stop}
      routes={data.routes}
      zoneNumber={data.zone_number}
      tabs={data.tabs}
      dispatch={spy}
      selectedTab="info"
    />
  );

  const pills = wrapper
    .find(".m-stop-page__header-feature")
    .filterWhere(pill => pill.prop("href") === "#route-card-list");
  expect(pills).toHaveLength(4);
  expect(pills.last().text()).toEqual("Zone 1A");
  pills.last().simulate("click");
  expect(spy).toHaveBeenCalledWith({
    type: "CLICK_ROUTE_PILL",
    payload: { mode: "commuter_rail" }
  });
});
