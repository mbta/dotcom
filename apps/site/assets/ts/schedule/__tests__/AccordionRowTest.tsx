import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { DirectionId, RouteType } from "../../__v3api";
import { TripInfo } from "../components/__trips";
import AccordionRow from "../components/schedule-finder/AccordionRow";
import tripData from "./tripInfo.json";

const tripInfo: TripInfo = tripData as TripInfo;

const journey = {
  trip: {
    shape_id: "010070",
    route_pattern_id: "1-_-0",
    name: "",
    id: "41894293",
    headsign: "Harvard",
    direction_id: 0 as DirectionId,
    "bikes_allowed?": true
  },
  route: {
    type: 3 as RouteType,
    name: "1",
    long_name: "Harvard - Dudley via Massachusetts Avenue",
    id: "1",
    direction_names: {
      "0": "Outbound",
      "1": "Inbound"
    },
    direction_destinations: {
      "0": "Harvard",
      "1": "Dudley"
    },
    description: "key_bus_route",
    "custom_route?": false,
    color: "FFC72C"
  },
  realtime: {
    scheduled_time: ["1:47", " ", "PM"],
    prediction: {
      track: null,
      time: ["8", " ", "min"],
      status: null,
      seconds: 491
    },
    delay: 7
  },
  departure: {
    time: "01:47 PM",
    schedule: {
      time: "2019-12-04T13:47:00-05:00",
      stop_sequence: 17,
      stop: null,
      pickup_type: 0,
      "last_stop?": false,
      "flag?": false,
      "early_departure?": true
    },
    prediction: {
      track: null,
      time: "2019-12-04T13:54:17-05:00",
      stop_sequence: 17,
      stop: null,
      status: null,
      schedule_relationship: null,
      id: "prediction-41894293-99-17",
      direction_id: 0 as DirectionId,
      "departing?": true,
      delay: 5
    }
  },
  tripInfo: {
    route_type: 3 as RouteType,
    vehicle_stop_name: "",
    vehicle: null,
    times: [],
    stop_count: 25,
    status: "operating at normal schedule",
    origin_id: "place-dudly",
    fare: {
      fare_link: "/fares/bus-fares",
      price: "$1.70"
    },
    duration: 21,
    destination_id: "110"
  }
};

const state = {
  data: tripInfo,
  isLoading: false,
  error: false
};

const contentComponent = () => <></>;

describe("AccordionRow", () => {
  it("renders the expanded AccordionRow markup", () => {
    const wrapper: ReactWrapper = mount(
      <table>
        <tbody>
          <AccordionRow
            state={state}
            journey={journey}
            contentComponent={contentComponent}
            expanded={true}
            toggle={() => {}}
          />
        </tbody>
      </table>
    );
    expect(wrapper.debug()).toMatchSnapshot();
    wrapper.unmount();
  });

  it("renders the collapsed AccordionRow markup", () => {
    const wrapper: ReactWrapper = mount(
      <table>
        <tbody>
          <AccordionRow
            state={state}
            journey={journey}
            contentComponent={contentComponent}
            expanded={false}
            toggle={() => {}}
          />
        </tbody>
      </table>
    );
    expect(wrapper.debug()).toMatchSnapshot();
    wrapper.unmount();
  });
});
