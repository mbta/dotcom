import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { LineDiagramVehicle } from "../components/__schedule";
import VehicleIcons from "../components/line-diagram/VehicleIcons";

describe("VehicleIcons", () => {
  const tooltipText = (wrapper: ShallowWrapper) =>
    wrapper.find("[tooltipText]").prop("tooltipText");

  it("renders a div with a status-based class for each vehicle", () => {
    const wrapper = shallow(
      <VehicleIcons
        routeType={0}
        stopName="Test"
        vehicles={[
          { id: "v1", headsign: null, status: "stopped", trip_name: null, crowding: null },
          { id: "v2", headsign: null, status: "incoming", trip_name: null, crowding: null }
        ]}
      />
    );
    const icons = wrapper.children();
    const baseClass = "m-schedule-diagram__vehicle";

    expect(icons.length).toBe(2);
    expect(icons.at(0).hasClass(`${baseClass}--stopped`)).toBe(true);
    expect(icons.at(1).hasClass(`${baseClass}--incoming`)).toBe(true);
  });

  it("uses a basic fallback if the route type is not known", () => {
    const wrapper = shallow(
      <VehicleIcons
        routeType={null}
        stopName="Test"
        vehicles={[
          { id: "v1", headsign: null, status: "incoming", trip_name: null, crowding: null }
        ]}
      />
    );

    expect(tooltipText(wrapper)).toContain("Vehicle is arriving at Test");
  });

  it("uses a vehicle name appropriate to the route type", () => {
    const vehicles: LineDiagramVehicle[] = [
      { id: "v1", headsign: null, status: "incoming", trip_name: null, crowding: null }
    ];
    const tramWrapper = shallow(
      <VehicleIcons routeType={0} stopName="Test" vehicles={vehicles} />
    );
    const busWrapper = shallow(
      <VehicleIcons routeType={3} stopName="Test" vehicles={vehicles} />
    );

    expect(tooltipText(tramWrapper)).toContain("Train is arriving at Test");
    expect(tooltipText(busWrapper)).toContain("Bus is arriving at Test");
  });

  it("includes the vehicle headsign if available", () => {
    const wrapper = shallow(
      <VehicleIcons
        routeType={0}
        stopName="Test"
        vehicles={[
          { id: "v1", headsign: "Dest", status: "incoming", trip_name: null, crowding: null }
        ]}
      />
    );

    expect(tooltipText(wrapper)).toContain("Dest train is arriving at Test");
  });

  it("includes the trip name as a train number for commuter rail", () => {
    const vehicles: LineDiagramVehicle[] = [
      { id: "v1", headsign: "Dest", status: "incoming", trip_name: "18", crowding: null }
    ];
    const crWrapper = shallow(
      <VehicleIcons routeType={2} stopName="Test" vehicles={vehicles} />
    );
    const busWrapper = shallow(
      <VehicleIcons routeType={3} stopName="Test" vehicles={vehicles} />
    );

    expect(tooltipText(crWrapper)).toContain("Dest train 18 is arriving at Test");
    expect(tooltipText(busWrapper)).toContain("Dest bus is arriving at Test");
  });

  it("includes the vehicle crowding status if available", () => {
    const wrapper = shallow(
      <VehicleIcons
        routeType={0}
        stopName="Test"
        vehicles={[
          { id: "v1", headsign: "Dest", status: "incoming", trip_name: null, crowding: "some_crowding" }
        ]}
      />
    );

    expect(tooltipText(wrapper)).toContain("Some crowding");
  });
});
