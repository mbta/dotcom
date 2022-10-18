import React from "react";
import * as redux from "react-redux";
import { mount, ReactWrapper } from "enzyme";
import { cloneDeep, merge } from "lodash";
import {
  RouteType,
  HeadsignWithCrowding,
  Schedule,
  Prediction
} from "../../../../__v3api";
import { LineDiagramStop } from "../../__schedule";
import simpleLineDiagram from "./lineDiagramData/simple.json"; // not a full line diagram
import outwardLineDiagram from "./lineDiagramData/outward.json"; // not a full line diagram
import { createLineDiagramCoordStore } from "../graphics/graphic-helpers";
import StopCard from "../StopCard";
import { TripPrediction } from "../../__trips";
import StopPredictions from "../StopPredictions";

const lineDiagram = (simpleLineDiagram as unknown) as LineDiagramStop[];
let lineDiagramBranchingOut = (outwardLineDiagram as unknown) as LineDiagramStop[];

const route = {
  type: 3 as RouteType,
  name: "route 1",
  long_name: "route 1 long name",
  color: "F00B42",
  id: "route-1",
  direction_names: {
    0: "Outbound",
    1: "Inbound"
  },
  direction_destinations: {
    0: "Begin",
    1: "End"
  },
  description: "key_bus_route",
  "custom_route?": false,
  header: "",
  alerts: []
};

lineDiagram.forEach(({ route_stop }) => {
  route_stop.route = cloneDeep(route);
});

lineDiagramBranchingOut.forEach(({ route_stop }) => {
  route_stop.route = cloneDeep(route);
});

let lineDiagramBranchingIn = cloneDeep(lineDiagramBranchingOut).reverse();
const CRroute = merge(cloneDeep(route), { type: 2 as RouteType });
lineDiagramBranchingIn.forEach(({ route_stop }) => {
  route_stop.route = CRroute;
  if (route_stop["is_terminus?"]) {
    route_stop["is_beginning?"] = !route_stop["is_beginning?"];
  }
});

const handleStopClick = () => {};
const liveData = { headsigns: [], vehicles: [] };
const store = createLineDiagramCoordStore(lineDiagram);

describe("StopCard", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(
      <redux.Provider store={store}>
        <StopCard
          stop={lineDiagram[0]}
          onClick={handleStopClick}
          liveData={liveData}
        />
      </redux.Provider>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renders and matches snapshot", () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("has a tooltip for a transit connection", () => {
    const stopConnections = wrapper.find(".m-schedule-diagram__connections a");
    stopConnections.forEach(connectionLink => {
      const props = connectionLink.props();
      expect(props.title).toBeTruthy();
      expect(Object.entries(props)).toContainEqual(["data-toggle", "tooltip"]);
    });
  });

  it("indicates detours, stop closures, etc", () => {
    expect(wrapper.exists(".m-schedule-diagram__alert")).toBeTruthy();
    expect(wrapper.find(".m-schedule-diagram__alert").text()).toContain(
      "Detour"
    );
  });
});

const predictionHeadsign: HeadsignWithCrowding = {
  name: "Somewhere",
  time_data_with_crowding_list: [
    {
      time_data: {
        delay: 0,
        scheduled_time: ["4:30", " ", "PM"],
        prediction: {
          time: ["14", " ", "min"],
          status: null,
          track: null
        } as Prediction
      },
      crowding: null,
      predicted_schedule: {
        schedule: {} as Schedule,
        prediction: {} as TripPrediction
      }
    }
  ],
  train_number: null
};

const lineDiagramNoPredictions = (simpleLineDiagram as unknown) as LineDiagramStop[];
let lineDiagramBranchingOutNoPredictions = (outwardLineDiagram as unknown) as LineDiagramStop[];

const routeNoPredictions = {
  type: 1 as RouteType,
  name: "route 1",
  long_name: "route 1 long name",
  color: "F00B42",
  id: "route-1",
  direction_names: {
    0: "Outbound",
    1: "Inbound"
  },
  direction_destinations: {
    0: "Begin",
    1: "End"
  },
  description: "key_bus_route",
  "custom_route?": false,
  header: "",
  alerts: []
};

lineDiagramNoPredictions.forEach(({ route_stop }) => {
  route_stop.route = cloneDeep(routeNoPredictions);
});

lineDiagramBranchingOutNoPredictions.forEach(({ route_stop }) => {
  route_stop.route = cloneDeep(routeNoPredictions);
});

const handleStopClickNoPredictions = () => {};
const liveDataNoPredictions = { headsigns: [], vehicles: [] };
const storeNoPredictions = createLineDiagramCoordStore(
  lineDiagramNoPredictions
);

describe("StopCard", () => {
  let noPredictionsWrapper: ReactWrapper;
  beforeEach(() => {
    noPredictionsWrapper = mount(
      <redux.Provider store={storeNoPredictions}>
        <StopCard
          stop={lineDiagramNoPredictions[0]}
          onClick={handleStopClickNoPredictions}
          liveData={liveDataNoPredictions}
        />
      </redux.Provider>
    );
  });

  afterEach(() => {
    noPredictionsWrapper.unmount();
  });
  it("no button on each stop card", () => {
    expect(
      noPredictionsWrapper.exists(".m-schedule-diagram__footer > button")
    ).toBe(false);
  });
});

const routeSubway = {
  type: 1 as RouteType,
  name: "route 1",
  long_name: "route 1 long name",
  color: "F00B42",
  id: "route-1",
  direction_names: {
    0: "Outbound",
    1: "Inbound"
  },
  direction_destinations: {
    0: "Begin",
    1: "End"
  },
  description: "key_bus_route",
  "custom_route?": false,
  header: "",
  alerts: []
};
const lineDiagramSubway = (simpleLineDiagram as unknown) as LineDiagramStop[];
let lineDiagramBranchingOutSubway = (outwardLineDiagram as unknown) as LineDiagramStop[];
lineDiagramSubway.forEach(({ route_stop }) => {
  route_stop.route = cloneDeep(routeSubway);
});

lineDiagramBranchingOutSubway.forEach(({ route_stop }) => {
  route_stop.route = cloneDeep(routeSubway);
});

const handleStopClickSubway = () => {};
const liveDataSubway = { headsigns: [predictionHeadsign], vehicles: [] };
const storeSubway = createLineDiagramCoordStore(lineDiagramSubway);

describe("StopCard", () => {
  let subwayWrapper: ReactWrapper;
  beforeEach(() => {
    subwayWrapper = mount(
      <redux.Provider store={storeSubway}>
        <StopCard
          stop={lineDiagramSubway[0]}
          onClick={handleStopClickSubway}
          liveData={liveDataSubway}
        />
      </redux.Provider>
    );
  });

  afterEach(() => {
    subwayWrapper.unmount();
  });
  it("includes a button to open Schedule Finder on each stop with departures text", () => {
    expect(
      subwayWrapper.exists(".m-schedule-diagram__footer > button")
    ).toBeTruthy();
    expect(
      subwayWrapper.find(".m-schedule-diagram__footer > button").text()
    ).toContain("View upcoming departures");
  });
});

const liveDataWithPrediction = {
  headsigns: [predictionHeadsign],
  vehicles: []
};
it("indicates predictions if available", () => {
  const wrapper = mount(
    <redux.Provider store={store}>
      <StopCard
        stop={lineDiagram[2]}
        onClick={handleStopClick}
        liveData={liveDataWithPrediction}
      />
    </redux.Provider>
  );

  expect(wrapper.exists(StopPredictions)).toBeTruthy();
  const predictions = wrapper.find(StopPredictions);
  expect(predictions.text()).toContain("Somewhere");
  expect(
    predictions.find(".m-schedule-diagram__prediction-time").text()
  ).toContain("14");
  expect(
    predictions.find(".m-schedule-diagram__prediction-time").text()
  ).toContain("min");
});

it.each`
  index | expectedAlerts
  ${0}  | ${0}
  ${1}  | ${1}
  ${2}  | ${1}
  ${3}  | ${0}
`(
  "shows $expectedAlerts high priority or high severity alerts for stop $index",
  ({ index, expectedAlerts }) => {
    const wrapperWithAlerts = mount(
      <redux.Provider store={store}>
        <StopCard
          stop={lineDiagram[index]}
          onClick={handleStopClick}
          liveData={liveData}
        />
      </redux.Provider>
    );
    const alerts = wrapperWithAlerts.find(
      ".m-schedule-diagram__stop-link .c-svg__icon-alerts-triangle"
    );
    expect(alerts.length).toEqual(expectedAlerts);
  }
);

it.each`
  index | expectedNames                      | expectedFeatures
  ${0}  | ${[]}                              | ${["Parking"]}
  ${1}  | ${["Orange Line", "Green Line C"]} | ${[]}
  ${2}  | ${["Route 62", "Route 67"]}        | ${["Accessible"]}
  ${3}  | ${["Atlantis"]}                    | ${["Parking", "Accessible"]}
`(
  "has appropriate tooltip content for stop $index",
  ({ index, expectedNames, expectedFeatures }) => {
    const wrapper = mount(
      <redux.Provider store={store}>
        <StopCard
          stop={lineDiagram[index]}
          onClick={handleStopClick}
          liveData={liveData}
        />
      </redux.Provider>
    );

    const connections = wrapper.find(".m-schedule-diagram__connections");

    const names = connections
      .find("a")
      .map(c => c.getDOMNode<HTMLElement>().dataset.originalTitle);
    expect(names).toEqual(expectedNames);

    const features = wrapper.find(".m-schedule-diagram__features");

    const featureNames = features
      .find("span[data-toggle='tooltip']")
      .map(c => c.getDOMNode<HTMLElement>().dataset.originalTitle);
    expect(featureNames).toEqual(expectedFeatures);
  }
);
