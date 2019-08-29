import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import StopWithRoutesCard, {
  renderRoutesLabel
} from "../components/StopWithRoutesCard";
import { createReactRoot } from "../../app/helpers/testUtils";
import { importData, importRealtimeResponse } from "./helpers/testUtils";
import { transformStops } from "../helpers/process-realtime-data";

const realtimeData = importRealtimeResponse();
const stopsWithDistances = importData();
const stopsWithRoutes = transformStops(
  stopsWithDistances.distances,
  [],
  realtimeData
);

describe("StopWithRoutesCard", () => {
  it("it renders a stop card", () => {
    const { routes, stop } = stopsWithRoutes[0];

    createReactRoot();
    const tree = renderer
      .create(
        <StopWithRoutesCard
          stop={stop}
          routes={routes}
          distance=".1 mi"
          dispatch={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("it selects a stop by triggering the stop card action on click", () => {
    const mockDispatch = jest.fn();
    const { routes, stop } = stopsWithRoutes[0];

    const wrapper = shallow(
      <StopWithRoutesCard
        stop={stop}
        routes={routes}
        distance=".1 mi"
        dispatch={mockDispatch}
      />
    );

    wrapper.find(".m-tnm-sidebar__stop-card").simulate("click");
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "CLICK_STOP_CARD",
      payload: { stopId: "place-mlmnl" }
    });
  });

  it("it selects a stop by triggering the stop card action via ENTER key", () => {
    const mockDispatch = jest.fn();
    const { routes, stop } = stopsWithRoutes[0];

    const wrapper = shallow(
      <StopWithRoutesCard
        stop={stop}
        routes={routes}
        distance=".1 mi"
        dispatch={mockDispatch}
      />
    );

    wrapper
      .find(".m-tnm-sidebar__stop-card")
      .simulate("keyPress", { key: "Enter" });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "CLICK_STOP_CARD",
      payload: { stopId: "place-mlmnl" }
    });
  });
});

it("renderRoutesLabel with commuter rail specific label", () => {
  const { routes } = stopsWithRoutes[0];
  const routesForStop = routes[0].routes;
  const wrapper = shallow(renderRoutesLabel(routesForStop, "commuter_rail"));
  expect(wrapper.text()).toEqual("Commuter Rail");
});

it("renderRoutesLabel with commuter rail specific label", () => {
  const { routes } = stopsWithRoutes[0];
  const routesForStop = routes[0].routes;
  const wrapper = shallow(renderRoutesLabel(routesForStop, "bus"));
  expect(wrapper.contains("Bus: ")).toBeTruthy();
});

it("renderRoutesLabel for subway", () => {
  const { routes } = stopsWithRoutes[0];
  const routesForStop = routes[0].routes;
  const wrapper = shallow(renderRoutesLabel(routesForStop, "subway"));
  expect(wrapper.text()).not.toEqual("Commuter Rail");
  expect(wrapper.contains("Bus: ")).toBeFalsy();
});
