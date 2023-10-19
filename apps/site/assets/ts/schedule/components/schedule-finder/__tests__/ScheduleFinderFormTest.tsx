import React from "react";
import { shallow, mount } from "enzyme";
import { Route } from "../../../../__v3api";
import { SimpleStopMap } from "../../__schedule";
import ScheduleFinderForm from "../ScheduleFinderForm";
import SelectContainer from "../SelectContainer";

jest.mock("../../../../helpers/use-fetch", () => ({
  __esModule: true,
  hasData: () => false,
  isLoading: () => true,
  isNotStarted: () => false,
  default: jest.fn().mockImplementation(() => [{ status: 2 }, jest.fn()])
}));

const route: Route = {
  description: "",
  direction_destinations: { 0: "Oak Grove", 1: "Forest Hills" },
  direction_names: { 0: "Inbound", 1: "Outbound" },
  id: "Orange",
  long_name: "Orange Line",
  name: "Orange",
  type: 1,
  line_id: null
};

const oneDirectionRoute: Route = {
  description: "",
  direction_destinations: { 0: "Destination", 1: null },
  direction_names: { 0: "Outbound", 1: null },
  id: "route",
  long_name: "the route",
  name: "Route",
  type: 1,
  line_id: null
};

const stops: SimpleStopMap = {
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
      name: "Def",
      id: "456",
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

const noCall = () => {
  throw new Error("should not have been called");
};

describe("ScheduleFinderForm", () => {
  it("matches snapshot", () => {
    const wrapper = shallow(
      <ScheduleFinderForm
        onDirectionChange={noCall}
        onOriginChange={noCall}
        onOriginSelectClick={noCall}
        onSubmit={noCall}
        route={route}
        selectedDirection={0}
        selectedOrigin={null}
        stopsByDirection={stops}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("includes only valid directions in the direction picker", () => {
    const wrapper = shallow(
      <ScheduleFinderForm
        onDirectionChange={noCall}
        onOriginChange={noCall}
        onOriginSelectClick={noCall}
        onSubmit={noCall}
        route={oneDirectionRoute}
        selectedDirection={0}
        selectedOrigin={null}
        stopsByDirection={stops}
      />
    );

    const directions = wrapper
      .find("select")
      .first()
      .find("option");
    expect(directions).toHaveLength(1);
    expect(directions.text()).toContain("OUTBOUND");
  });

  it("shows an error if the form is submitted without an origin", () => {
    const submitted = jest.fn();
    const wrapper = shallow(
      <ScheduleFinderForm
        onDirectionChange={noCall}
        onOriginChange={noCall}
        onOriginSelectClick={noCall}
        onSubmit={submitted}
        route={route}
        selectedDirection={0}
        selectedOrigin={null}
        stopsByDirection={stops}
      />
    );

    wrapper.find("form").simulate("submit", { preventDefault: () => {} });

    expect(wrapper.text()).toContain("Please provide an origin");
    expect(submitted).not.toHaveBeenCalled();
    expect(
      wrapper
        .find(SelectContainer)
        .last()
        .props().error
    ).toEqual(true);
  });

  it("calls the submit handler and clears the error", () => {
    const submitted = jest.fn();
    const wrapper = shallow(
      <ScheduleFinderForm
        onDirectionChange={noCall}
        onOriginChange={noCall}
        onOriginSelectClick={noCall}
        onSubmit={submitted}
        route={route}
        selectedDirection={0}
        selectedOrigin={null}
        stopsByDirection={stops}
      />
    );

    // Show the error first
    wrapper.find("form").simulate("submit", { preventDefault: () => {} });
    wrapper.setProps({ selectedOrigin: "123" });
    wrapper.find("form").simulate("submit", { preventDefault: () => {} });

    expect(wrapper.text()).not.toContain("Please provide an origin");
    expect(submitted).toHaveBeenCalledTimes(1);
  });

  it("calls the origin select handler and clears the error", () => {
    const originClicked = jest.fn();
    const wrapper = shallow(
      <ScheduleFinderForm
        onDirectionChange={noCall}
        onOriginChange={noCall}
        onOriginSelectClick={originClicked}
        route={route}
        selectedDirection={0}
        selectedOrigin={null}
        stopsByDirection={stops}
      />
    );

    // Show the error first
    wrapper.find("form").simulate("submit", { preventDefault: () => {} });
    // Click on the SelectContainer for the origin select
    wrapper
      .find("SelectContainer")
      .last()
      // @ts-ignore -- types for `invoke` are too restrictive?
      .invoke("handleClick")();

    expect(wrapper.text()).not.toContain("Please provide an origin");
    expect(originClicked).toHaveBeenCalledTimes(1);
  });

  it("calls the direction and origin change handlers", () => {
    const directionChanged = jest.fn();
    const originChanged = jest.fn();
    const wrapper = shallow(
      <ScheduleFinderForm
        onDirectionChange={directionChanged}
        onOriginChange={originChanged}
        onOriginSelectClick={noCall}
        onSubmit={noCall}
        route={route}
        selectedDirection={0}
        selectedOrigin={null}
        stopsByDirection={stops}
      />
    );

    wrapper
      .find("select")
      .first()
      .simulate("change", { target: { value: 1 } });
    wrapper
      .find("select")
      .last()
      .simulate("change", { target: { value: "123" } });

    expect(directionChanged).toHaveBeenCalledWith(1);
    expect(originChanged).toHaveBeenCalledWith("123");
  });

  it("detects click and keyUp events in SelectContainer elements", () => {
    const originSpy = jest.fn();

    const wrapper = mount(
      <ScheduleFinderForm
        onDirectionChange={() => {}}
        onOriginChange={() => {}}
        onOriginSelectClick={originSpy}
        onSubmit={noCall}
        route={route}
        selectedDirection={0}
        selectedOrigin={null}
        stopsByDirection={stops}
      />
    );

    // detect click event:
    wrapper
      .find(SelectContainer)
      .at(1)
      .simulate("click");

    expect(originSpy).toHaveBeenCalledTimes(1);

    // detect keyUp event:
    originSpy.mockRestore();

    wrapper
      .find(".c-select-custom__container")
      .at(1)
      .simulate("keyUp", { key: "Enter" });

    expect(originSpy).toHaveBeenCalledTimes(1);

    originSpy.mockRestore();
    wrapper.unmount();
  });
});
