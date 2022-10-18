import { mount, ReactWrapper } from "enzyme";
import React from "react";
import * as redux from "react-redux";
import { aroundNow } from "../../../../models/__tests__/alert-test";
import {
  Alert,
  HeadsignWithCrowding,
  InformedEntitySet,
  Prediction,
  Schedule
} from "../../../../__v3api";
import { RouteStop, StopTree } from "../../__schedule";
import { TripPrediction } from "../../__trips";
import { createStopTreeCoordStore } from "../graphics/useTreeStopPositions";
import StopPredictions from "../StopPredictions";
import TreeStopCard from "../TreeStopCard";

const stopTree: StopTree = {
  byId: {
    a: {
      id: "a",
      value: ({
        id: "a",
        connections: [{ id: "Orange", name: "Orange Line" }],
        stop_features: ["parking_lot"]
      } as unknown) as RouteStop
    },
    b: {
      id: "b",
      value: ({
        id: "b",
        connections: [],
        stop_features: []
      } as unknown) as RouteStop
    },
    c: {
      id: "c",
      value: ({
        id: "c",
        connections: [],
        stop_features: []
      } as unknown) as RouteStop
    }
  },
  edges: {
    a: { next: ["b"], previous: [] },
    b: { next: ["c"], previous: ["a"] },
    c: { next: [], previous: ["b"] }
  },
  startingNodes: ["a"]
};
const store = createStopTreeCoordStore(stopTree);

const alertA: Alert = {
  id: "MOCK-ALERT-A",
  severity: 7,
  priority: "high",
  lifecycle: "new",
  effect: "detour",
  informed_entity: { stop: ["a"] } as InformedEntitySet,
  active_period: aroundNow()
} as Alert;
const alertB: Alert = {
  id: "MOCK-ALERT-B",
  severity: 7,
  priority: "high",
  lifecycle: "new",
  effect: "detour",
  informed_entity: { stop: ["b"] } as InformedEntitySet,
  active_period: aroundNow()
} as Alert;

const handleStopClick = () => {};

describe("TreeStopCard", () => {
  const liveData = { headsigns: [], vehicles: [] };

  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <redux.Provider store={store}>
        <TreeStopCard
          stopTree={stopTree}
          stopId={"a"}
          alerts={[alertA, alertB]}
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

  it("includes a button to open Schedule Finder on each stop", () => {
    expect(wrapper.exists(".m-schedule-diagram__footer > button")).toBeTruthy();
    expect(
      wrapper.find(".m-schedule-diagram__footer > button").text()
    ).toContain("View schedule");
  });

  it("should show high priority or high severity alerts", () => {
    const wrapperWithAlerts = mount(
      <redux.Provider store={store}>
        <TreeStopCard
          stopTree={stopTree}
          stopId={"a"}
          alerts={[alertA, alertB]}
          onClick={handleStopClick}
          liveData={liveData}
        />
      </redux.Provider>
    );
    const alerts = wrapperWithAlerts.find(
      ".m-schedule-diagram__stop-link .c-svg__icon-alerts-triangle"
    );
    expect(alerts.length).toEqual(1);
  });

  it("should show tooltip content", () => {
    const wrapper = mount(
      <redux.Provider store={store}>
        <TreeStopCard
          stopTree={stopTree}
          stopId={"a"}
          alerts={[alertA, alertB]}
          onClick={handleStopClick}
          liveData={liveData}
        />
      </redux.Provider>
    );

    const connections = wrapper.find(".m-schedule-diagram__connections");

    const names = connections
      .find("a")
      .map(c => c.getDOMNode<HTMLElement>().dataset.originalTitle);
    expect(names).toEqual(["Orange Line"]);

    const features = wrapper.find(".m-schedule-diagram__features");

    const featureNames = features
      .find("span[data-toggle='tooltip']")
      .map(c => c.getDOMNode<HTMLElement>().dataset.originalTitle);
    expect(featureNames).toEqual(["Parking"]);
  });

  it("indicates detours, stop closures, etc", () => {
    expect(wrapper.exists(".m-schedule-diagram__alert")).toBeTruthy();
    expect(wrapper.find(".m-schedule-diagram__alert").text()).toContain(
      "Detour"
    );
  });

  it("indicates predictions if available", () => {
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
    const liveDataWithPrediction = {
      headsigns: [predictionHeadsign],
      vehicles: []
    };
    const wrapper = mount(
      <redux.Provider store={store}>
        <TreeStopCard
          stopTree={stopTree}
          stopId={"a"}
          alerts={[alertA, alertB]}
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
});
