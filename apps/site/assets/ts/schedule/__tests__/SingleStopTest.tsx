import React from "react";
import { mount } from "enzyme";
import { cloneDeep, merge } from "lodash";
import SingleStop from "../components/line-diagram/SingleStop";
import { LiveData } from "../components/line-diagram/LineDiagram";
import { LineDiagramStop, RouteStopRoute } from "../components/__schedule";

const basicStop: LineDiagramStop = {
  alerts: [],
  stop_data: [{ branch: null, type: "stop" }],
  route_stop: {
    id: "place-xxx",
    name: "Example Stop",
    zone: null,
    branch: null,
    route: null,
    connections: [],
    stop_features: [],
    "is_beginning?": false,
    "is_terminus?": false,
    closed_stop_info: null,
    station_info: {
      accessibility: [],
      address: null,
      bike_storage: [],
      child_ids: [],
      closed_stop_info: null,
      fare_facilities: [],
      "has_charlie_card_vendor?": false,
      "has_fare_machine?": false,
      id: "place-xxx",
      "is_child?": false,
      latitude: 0,
      longitude: 0,
      municipality: null,
      name: "Example Stop",
      note: null,
      parent_id: null,
      parking_lots: [],
      "station?": true,
      type: "station"
    }
  }
};

const crRouteStub: RouteStopRoute = {
  "custom_route?": false,
  description: "",
  direction_destinations: { 0: "", 1: "" },
  direction_names: { 0: "", 1: "" },
  id: "cr-route",
  long_name: "",
  name: "",
  type: 2
};

const crStop: LineDiagramStop = merge(cloneDeep(basicStop), {
  route_stop: { route: crRouteStub }
});

const liveData: LiveData = {
  headsigns: [
    {
      name: "DestA",
      time_data_with_crowding_list: [
        {
          time_data: {
            delay: 0,
            prediction: {
              status: null,
              time: ["arriving"],
              track: null
            },
            scheduled_time: null
          },
          crowding: null
        }
      ],
      train_number: null
    },
    {
      name: "DestB",
      time_data_with_crowding_list: [
        {
          time_data: {
            delay: 0,
            prediction: {
              status: null,
              time: ["2", " ", "min"],
              track: null
            },
            scheduled_time: null
          },
          crowding: null
        }
      ],
      train_number: null
    }
  ],
  vehicles: [
    {
      id: "veh1",
      headsign: "DestA",
      status: "stopped",
      trip_name: "",
      crowding: null
    },
    {
      id: "veh2",
      headsign: null,
      status: "incoming",
      trip_name: null,
      crowding: null
    }
  ]
};

const crLiveData: LiveData = {
  headsigns: [
    {
      name: "DestA",
      time_data_with_crowding_list: [
        {
          time_data: {
            delay: 5,
            prediction: {
              status: null,
              time: ["5:05", " ", "PM"],
              track: "3"
            },
            scheduled_time: ["5:00", " ", "PM"]
          },
          crowding: null
        }
      ],
      train_number: "404"
    },
    {
      name: "DestB",
      time_data_with_crowding_list: [
        {
          time_data: {
            delay: 0,
            prediction: null,
            scheduled_time: ["5:30", " ", "PM"]
          },
          crowding: null
        }
      ],
      train_number: "504"
    }
  ],
  vehicles: [
    {
      id: "veh1",
      headsign: "DestA",
      status: "in_transit",
      trip_name: "404",
      crowding: null
    }
  ]
};

describe("SingleStop", () => {
  it("renders and matches snapshot", () => {
    let wrapper = mount(
      <SingleStop
        stop={basicStop}
        onClick={() => {}}
        color="000"
        liveData={undefined}
      />
    );

    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders with live data", () => {
    let wrapper = mount(
      <SingleStop
        stop={basicStop}
        onClick={() => {}}
        color="000"
        liveData={liveData}
      />
    );

    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders with Commuter Rail live data", () => {
    let wrapper = mount(
      <SingleStop
        stop={crStop}
        onClick={() => {}}
        color="000"
        liveData={crLiveData}
      />
    );

    expect(wrapper.debug()).toMatchSnapshot();
  });
});
