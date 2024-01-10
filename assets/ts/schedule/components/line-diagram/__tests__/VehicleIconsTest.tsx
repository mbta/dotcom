import React from "react";
import * as redux from "react-redux";
import { mount, ReactWrapper } from "enzyme";
import { LineDiagramVehicle, RouteStop } from "../../__schedule";
import VehicleIcons from "../VehicleIcons";

// mock the redux state
jest.spyOn(redux, "useSelector").mockImplementation(selector =>
  selector({
    "test-stop": [12, 80]
  })
);
const stop = { id: "test-stop", name: "Test Stop" } as RouteStop;
const vehicles = [
  { id: "vehicle-1", status: "in_transit", tooltip: "vehicle 1 tooltip text" },
  { id: "vehicle-2", status: "incoming", tooltip: "vehicle 2 tooltip text" },
  { id: "vehicle-3", status: "stopped", tooltip: "vehicle 3 tooltip text" }
] as LineDiagramVehicle[];

const tooltipText = (wrapper: ReactWrapper) =>
  wrapper.find("[tooltipText]").prop("tooltipText");

describe("VehicleIcons with no vehicles", () => {
  it("doesn't render", () => {
    const wrapper = mount(<VehicleIcons stop={stop} vehicles={null} />);

    expect(wrapper.html()).toBeFalsy();
  });
});

describe("VehicleIcons with vehicles", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<VehicleIcons stop={stop} vehicles={vehicles} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renders and matches snapshot", () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders each vehicle", () => {
    const vehicleNodes = wrapper.find(".m-schedule-diagram__vehicle");
    expect(vehicleNodes).toHaveLength(vehicles.length);
  });

  it.each`
    index | tooltip
    ${0}  | ${"vehicle 1 tooltip text"}
    ${1}  | ${"vehicle 2 tooltip text"}
    ${2}  | ${"vehicle 3 tooltip text"}
  `("positions vehicles according to status $status", ({ index, tooltip }) => {
    const node = wrapper.find(".m-schedule-diagram__vehicle").at(index);
    expect(tooltipText(node)).toContain(tooltip);
  });

  it.each`
    index | expectedPosition | status
    ${0}  | ${30}            | ${"in_transit"}
    ${1}  | ${55}            | ${"incoming"}
    ${2}  | ${70}            | ${"stopped"}
  `(
    "positions vehicles according to status $status",
    ({ index, expectedPosition }) => {
      const node = wrapper.find(".m-schedule-diagram__vehicle").at(index);
      const { top } = node.get(0).props.style; // e.g. "30px"
      const top_number = parseInt(top.substring(0, 2)); // e.g. 30
      expect(top_number).toEqual(expectedPosition);
    }
  );
});

it("VehicleIcons includes the vehicle crowding status if available", () => {
  const wrapper = mount(
    <VehicleIcons
      stop={stop}
      vehicles={[
        {
          id: "v1",
          status: "incoming",
          crowding: "some_crowding",
          tooltip: "tooltip text"
        }
      ]}
    />
  );
  expect(tooltipText(wrapper)).toContain("Some crowding");
});
