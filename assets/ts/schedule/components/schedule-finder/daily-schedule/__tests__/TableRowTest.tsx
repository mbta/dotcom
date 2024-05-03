import React from "react";
import { mount } from "enzyme";
import renderer from "react-test-renderer";
import { createReactRoot } from "../../../../../app/helpers/testUtils";
import { UserInput } from "../../../__schedule";
import { Journey } from "../../../__trips";
import TableRow, { fetchTripInfo, parseResults } from "../TableRow";

const journey = ({
  trip: {
    shape_id: "9890009",
    route_pattern_id: "CR-Providence-0-0",
    name: "801",
    id: "CR-Weekday-Fall-19-801",
    headsign: "Wickford Junction",
    direction_id: 0,
    "bikes_allowed?": true
  },
  route: {
    type: 2,
    name: "Providence/Stoughton Line",
    long_name: "Providence/Stoughton Line",
    id: "CR-Providence",
    direction_names: {
      "0": "Outbound",
      "1": "Inbound"
    },
    direction_destinations: {
      "0": "Stoughton or Wickford Junction",
      "1": "South Station"
    },
    description: "commuter_rail",
    "custom_route?": false
  },
  departure: {
    time: "05:30 AM",
    schedule: {
      time: "2019-11-26T05:30:00-05:00",
      stop_sequence: 1,
      stop: null,
      pickup_type: 0,
      "last_stop?": false,
      "flag?": false,
      "early_departure?": false
    },
    prediction: null
  }
} as unknown) as Journey;

const input = {
  route: "CR-Providence",
  origin: "place-sstat",
  date: "2019-11-26",
  direction: 0
} as UserInput;

describe("TableRow", () => {
  it("it renders", () => {
    createReactRoot();
    const tree = renderer.create(
      <TableRow
        input={input}
        journey={journey}
        isSchoolTrip={false}
        anySchoolTrips={false}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("renders a rail replacement bus using a CR row", () => {
    const body = '<div id="react-root"></div>';
    document.body.innerHTML = body;

    const railReplacementRoute = {
      ...journey.route,
      type: 3,
      description: "rail_replacement_bus"
    };
    const railReplacementJourney = {
      ...journey,
      route: railReplacementRoute
    } as Journey;

    const wrapper = mount(
      <table>
        <tbody>
          <TableRow
            input={input}
            journey={railReplacementJourney}
            isSchoolTrip={false}
            anySchoolTrips={false}
          />
        </tbody>
      </table>
    );

    expect(wrapper.find("td.schedule-table__cell").length).toBe(4);
  });
});

describe("fetchTripInfo", () => {
  it("returns a function that fetches the selected journey", () => {
    window.fetch = jest.fn();

    const fetcher = fetchTripInfo(journey.trip.id, input);

    expect(typeof fetcher).toBe("function");

    fetcher();

    expect(window.fetch).toHaveBeenCalledWith(
      "/schedules/finder_api/trip?id=CR-Weekday-Fall-19-801&route=CR-Providence&date=2019-11-26&direction=0&stop=place-sstat"
    );
  });
});

describe("parseResults", () => {
  it("passes the results through", () => {
    const response = {
      vehicle_stop_name: "",
      vehicle: null,
      times: [
        {
          schedule: {
            trip: {
              shape_id: "010070",
              route_pattern_id: "1-_-0",
              name: "",
              id: "45030860",
              headsign: "Harvard",
              direction_id: 0,
              "bikes_allowed?": true
            },
            time: "04:54 AM",
            stop_sequence: 19,
            stop: {
              type: "stop",
              "station?": false,
              platform_name: null,
              platform_code: null,
              parking_lots: [],
              parent_id: null,
              note: null,
              name: "Massachusetts Ave @ Prospect St",
              municipality: "Cambridge",
              longitude: -71.103404,
              latitude: 42.365291,
              "is_child?": false,
              id: "102",
              "has_fare_machine?": false,
              "has_charlie_card_vendor?": false,
              fare_facilities: [],
              description: null,
              closed_stop_info: null,
              child_ids: [],
              bike_storage: [],
              address: null,
              accessibility: ["accessible"]
            },
            pickup_type: 0,
            "last_stop?": false,
            "flag?": false,
            fare: {
              price: "$1.70",
              fare_link: "/fares/bus-fares"
            },
            "early_departure?": true
          },
          prediction: null
        },
        {
          schedule: {
            trip: {
              shape_id: "010070",
              route_pattern_id: "1-_-0",
              name: "",
              id: "45030860",
              headsign: "Harvard",
              direction_id: 0,
              "bikes_allowed?": true
            },
            time: "04:55 AM",
            stop_sequence: 20,
            stop: {
              type: "stop",
              "station?": false,
              platform_name: null,
              platform_code: null,
              parking_lots: [],
              parent_id: null,
              note: null,
              name: "Massachusetts Ave @ Bigelow St",
              municipality: "Cambridge",
              longitude: -71.106017,
              latitude: 42.366837,
              "is_child?": false,
              id: "104",
              "has_fare_machine?": false,
              "has_charlie_card_vendor?": false,
              fare_facilities: [],
              description: null,
              closed_stop_info: null,
              child_ids: [],
              bike_storage: [],
              address: null,
              accessibility: ["unknown"]
            },
            pickup_type: 0,
            "last_stop?": false,
            "flag?": false,
            fare: {
              price: "$1.70",
              fare_link: "/fares/bus-fares"
            },
            "early_departure?": true
          },
          prediction: null
        }
      ],
      status: "operating at normal schedule",
      route_type: 3,
      origin_id: "102",
      fare: {
        price: "$1.70",
        fare_link: "/fares/bus-fares"
      },
      duration: 3,
      destination_id: "110"
    };

    expect(parseResults((response as unknown) as JSON)).toEqual(response);
  });
});
