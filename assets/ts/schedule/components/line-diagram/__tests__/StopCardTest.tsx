import { mount } from "enzyme";
import React from "react";
import * as redux from "react-redux";
import * as StopTreeHelpers from "../../../../helpers/stop-tree";
import { aroundNow } from "../../../../models/__tests__/alert-test";
import { Alert, InformedEntitySet, Route } from "../../../../__v3api";
import { RouteStop, StopTree } from "../../__schedule";
import { createStopTreeCoordStore } from "../graphics/useTreeStopPositions";
import StopCard from "../StopCard";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { testRouteStopListFromStopTree } from "../../../../app/helpers/testUtils";

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
    },
    d: {
      id: "d",
      value: ({
        id: "d",
        connections: [],
        stop_features: [],
        branch: {},
        name: "Test",
        route: { id: "d", name: "Test" }
      } as unknown) as RouteStop
    },
    e: {
      id: "e",
      value: ({
        id: "e",
        connections: [{ id: "Green-Test" }],
        stop_features: [],
        branch: {},
        name: "Should Not Display This String",
        route: { id: "Green-E", name: "Green-E", type: 0 }
      } as unknown) as RouteStop
    },
    f: {
      id: "f",
      value: ({
        id: "f",
        connections: [],
        stop_features: [],
        branch: {},
        name: "Commuter Test",
        route: { id: "f", name: "Commuter Test", type: 2 }
      } as unknown) as RouteStop
    }
  },
  edges: {
    a: { next: ["b"], previous: [] },
    b: { next: ["c", "d", "e", "f"], previous: ["a"] },
    c: { next: [], previous: ["b"] },
    d: { next: [], previous: ["b"] },
    e: { next: [], previous: ["b"] },
    f: { next: [], previous: ["b"] }
  },
  startingNodes: ["a"]
};
const store = createStopTreeCoordStore(stopTree);
const testRouteStopList = testRouteStopListFromStopTree(stopTree);

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
const alertC: Alert = {
  id: "MOCK-ALERT-C",
  severity: 7,
  priority: "high",
  lifecycle: "upcoming",
  effect: "detour",
  informed_entity: { stop: ["a"] } as InformedEntitySet,
  active_period: aroundNow()
} as Alert;

const handleStopClick = () => {};

describe("StopCard", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders and matches snapshot", () => {
    const wrapper = mount(
      <redux.Provider store={store}>
        <StopCard
          stopTree={stopTree}
          routeStopList={testRouteStopList}
          stopId={"a"}
          alerts={[alertA, alertB]}
          onClick={handleStopClick}
        />
      </redux.Provider>
    );

    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("shows a View departures button", () => {
    jest.spyOn(StopTreeHelpers, "stopForId").mockImplementation(
      () =>
        (({
          route: { type: 3 } as Route,
          stop_features: [],
          connections: []
        } as unknown) as RouteStop)
    );

    const wrapper = mount(
      <redux.Provider store={store}>
        <StopCard
          stopTree={stopTree}
          routeStopList={testRouteStopList}
          stopId={"a"}
          alerts={[]}
          onClick={handleStopClick}
        />
      </redux.Provider>
    );

    expect(wrapper.exists(".m-schedule-diagram__footer > button")).toBeTruthy();
    expect(
      wrapper.find(".m-schedule-diagram__footer > button").text()
    ).toContain("View departures");
  });

  it("should show high priority or high severity alerts", () => {
    const wrapperWithAlerts = mount(
      <redux.Provider store={store}>
        <StopCard
          stopTree={stopTree}
          routeStopList={testRouteStopList}
          stopId={"a"}
          alerts={[alertA, alertB]}
          onClick={handleStopClick}
        />
      </redux.Provider>
    );
    const alerts = wrapperWithAlerts.find(
      ".m-schedule-diagram__stop-link .c-svg__icon-alerts-triangle"
    );
    expect(alerts.length).toEqual(1);
  });

  it("should not show upcoming alerts", () => {
    const { container } = render(
      <redux.Provider store={store}>
        <StopCard
          stopTree={stopTree}
          routeStopList={testRouteStopList}
          stopId={"a"}
          alerts={[alertC]}
          onClick={handleStopClick}
        />
      </redux.Provider>
    );

    expect(container.querySelector(".c-svg__icon-alerts-triangle")).toBeNull();
  });

  it("should show tooltip content", () => {
    const wrapper = mount(
      <redux.Provider store={store}>
        <StopCard
          stopTree={stopTree}
          routeStopList={testRouteStopList}
          stopId={"a"}
          alerts={[alertA, alertB]}
          onClick={handleStopClick}
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
    const wrapper = mount(
      <redux.Provider store={store}>
        <StopCard
          stopTree={stopTree}
          routeStopList={testRouteStopList}
          stopId={"a"}
          alerts={[alertA, alertB]}
          onClick={handleStopClick}
        />
      </redux.Provider>
    );

    expect(wrapper.exists(".m-schedule-diagram__alert")).toBeTruthy();
    expect(wrapper.find(".m-schedule-diagram__alert").text()).toContain(
      "Detour"
    );
  });

  it("should display the line name on the card if there is a branch", () => {
    render(
      <redux.Provider store={store}>
        <StopCard
          stopTree={stopTree}
          routeStopList={testRouteStopList}
          stopId={"d"}
          alerts={[]}
          onClick={() => {}}
        />
      </redux.Provider>
    );

    expect(screen.queryByText("Test Branch")).not.toBeNull();
  });

  it("should display the correct green line name if there is a branch", () => {
    render(
      <redux.Provider store={store}>
        <StopCard
          stopTree={stopTree}
          routeStopList={testRouteStopList}
          stopId={"e"}
          alerts={[]}
          onClick={() => {}}
        />
      </redux.Provider>
    );

    expect(screen.queryByText("Green Line E Branch")).not.toBeNull();
  });

  it("should display the line name on the card if there is a branch and it is a commuter rail", () => {
    render(
      <redux.Provider store={store}>
        <StopCard
          stopTree={stopTree}
          routeStopList={testRouteStopList}
          stopId={"f"}
          alerts={[]}
          onClick={() => {}}
        />
      </redux.Provider>
    );

    expect(screen.queryByText("Commuter Test Line")).not.toBeNull();
  });

  it("should display the green line connections from the route", () => {
    const { container } = render(
      <redux.Provider store={store}>
        <StopCard
          stopTree={stopTree}
          routeStopList={testRouteStopList}
          stopId={"e"}
          alerts={[]}
          onClick={() => {}}
        />
      </redux.Provider>
    );

    expect(
      container.querySelectorAll("[href='/schedules/Green-Test/line']").length
    ).toBe(1);
  });

  it("should call the onClick function when the user clicks on the footer button", async () => {
    const clickSpy = jest.fn();
    render(
      <redux.Provider store={store}>
        <StopCard
          stopTree={stopTree}
          routeStopList={testRouteStopList}
          stopId={"b"}
          alerts={[]}
          onClick={clickSpy}
        />
      </redux.Provider>
    );

    const buttons = screen.getAllByRole("button");
    await userEvent.click(buttons[buttons.length - 1]);

    await waitFor(() => {
      expect(clickSpy).toHaveBeenCalled();
    });
  });
});
