import React from "react";
import * as redux from "react-redux";
import { mount, ReactWrapper } from "enzyme";
import {
  LineDiagramVehicle,
  RouteStop,
  LineDiagramStop,
  RouteStopRoute
} from "../../__schedule";
import VehicleIcons from "../VehicleIcons";
import { createLineDiagramCoordStore } from "../graphics/graphic-helpers";
import {
  Prediction,
  PredictedOrScheduledTime,
  PredictedOrScheduledTimeWithCrowding,
  HeadsignWithCrowding
} from "../../../../__v3api";

// mock the redux state
jest.spyOn(redux, "useSelector").mockImplementation(selector =>
  selector({
    "test-stop": [12, 80]
  })
);
const stop = { id: "test-stop", name: "Test Stop" } as RouteStop;
const vehicles = [
  { id: "vehicle-1", status: "in_transit" },
  { id: "vehicle-2", status: "incoming" },
  { id: "vehicle-3", status: "stopped" }
] as LineDiagramVehicle[];
const store = createLineDiagramCoordStore([
  { route_stop: stop } as LineDiagramStop
]);

const tooltipText = (wrapper: ReactWrapper) =>
  wrapper.find("[tooltipText]").prop("tooltipText");

describe("VehicleIcons", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(
      <redux.Provider store={store}>
        <VehicleIcons stop={stop} vehicles={vehicles} headsigns={[]} />
      </redux.Provider>
    );
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

  it.each`
    index | expectedText
    ${0}  | ${"Vehicle is on the way to Test Stop"}
    ${1}  | ${"Vehicle is arriving at Test Stop"}
    ${2}  | ${"Vehicle has arrived at Test Stop"}
  `(
    "uses fallback text if the route type is not known",
    ({ index, expectedText }) => {
      const node = wrapper.find(".m-schedule-diagram__vehicle").at(index);
      expect(tooltipText(node)).toContain(expectedText);
    }
  );
});

it.each`
  name       | type
  ${"Train"} | ${0}
  ${"Train"} | ${1}
  ${"Train"} | ${2}
  ${"Bus"}   | ${3}
`(
  "VehicleIcons uses a vehicle name $name appropriate to the route type $type",
  ({ type, name }) => {
    const vehicles: LineDiagramVehicle[] = [
      {
        id: "v1",
        headsign: null,
        status: "incoming",
        trip_name: null,
        crowding: null
      }
    ];
    const wrapper = mount(
      <redux.Provider store={store}>
        <VehicleIcons
          stop={{ ...stop, route: { type } as RouteStopRoute }}
          vehicles={vehicles}
          headsigns={[]}
        />
      </redux.Provider>
    );
    expect(tooltipText(wrapper)).toContain(name);
  }
);

it("VehicleIcons includes the vehicle headsign if available", () => {
  const wrapper = mount(
    <redux.Provider store={store}>
      <VehicleIcons
        stop={{ ...stop, route: { type: 1 } as RouteStopRoute }}
        vehicles={[
          {
            id: "v1",
            headsign: "Dest",
            status: "incoming",
            trip_name: null,
            crowding: null
          }
        ]}
        headsigns={[]}
      />
    </redux.Provider>
  );
  expect(tooltipText(wrapper)).toContain("Dest train is arriving at Test");
});

it("VehicleIcons includes the trip name as a train number for commuter rail", () => {
  const vehicles: LineDiagramVehicle[] = [
    {
      id: "v1",
      headsign: "Dest",
      status: "incoming",
      trip_name: "18",
      crowding: null
    }
  ];
  const crWrapper = mount(
    <redux.Provider store={store}>
      <VehicleIcons
        stop={{ ...stop, route: { type: 2 } as RouteStopRoute }}
        vehicles={vehicles}
        headsigns={[]}
      />
    </redux.Provider>
  );
  const busWrapper = mount(
    <redux.Provider store={store}>
      <VehicleIcons
        stop={{ ...stop, route: { type: 3 } as RouteStopRoute }}
        vehicles={vehicles}
        headsigns={[]}
      />
    </redux.Provider>
  );
  expect(tooltipText(crWrapper)).toContain("Dest train 18 is arriving at Test");
  expect(tooltipText(busWrapper)).toContain("Dest bus is arriving at Test");
});

it("VehicleIcons includes the track number for commuter rail, when available", () => {
  const vehicles: LineDiagramVehicle[] = [
    {
      id: "v1",
      headsign: "Destination",
      status: "incoming",
      trip_name: "18",
      crowding: null
    }
  ];

  const prediction = { track: "999", time: ["14", " ", "min"] } as Prediction;
  const timeData = { prediction: prediction } as PredictedOrScheduledTime;
  const tdwcl = { time_data: timeData } as PredictedOrScheduledTimeWithCrowding;
  const headsignWithCrowding = {
    time_data_with_crowding_list: [tdwcl]
  } as HeadsignWithCrowding;

  const crWrapper = mount(
    <redux.Provider store={store}>
      <VehicleIcons
        stop={{ ...stop, route: { type: 2 } as RouteStopRoute }}
        vehicles={vehicles}
        headsigns={[headsignWithCrowding]}
      />
    </redux.Provider>
  );
  expect(tooltipText(crWrapper)).toContain(
    "Destination train 18 is arriving at Test Stop on Track 999"
  );
});

it("VehicleIcons includes the vehicle crowding status if available", () => {
  const wrapper = mount(
    <redux.Provider store={store}>
      <VehicleIcons
        stop={stop}
        vehicles={[
          {
            id: "v1",
            headsign: "Dest",
            status: "incoming",
            trip_name: null,
            crowding: "some_crowding"
          }
        ]}
        headsigns={[]}
      />
    </redux.Provider>
  );
  expect(tooltipText(wrapper)).toContain("Some crowding");
});

it("VehicleIcons does not include the status if we don't know the stop name", () => {
  const emptyNameStop = {
    id: "test-stop",
    name: "",
    route: { type: 3 } as RouteStopRoute
  } as RouteStop;
  const wrapper = mount(
    <redux.Provider store={store}>
      <VehicleIcons
        stop={emptyNameStop}
        vehicles={[
          {
            id: "v1",
            headsign: "Dest",
            status: "incoming",
            trip_name: null,
            crowding: "some_crowding"
          }
        ]}
        headsigns={[]}
      />
    </redux.Provider>
  );

  expect(tooltipText(wrapper)).toContain("Dest bus");
  expect(tooltipText(wrapper)).not.toContain("is arriving at");
});
