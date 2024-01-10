import { act, renderHook } from "@testing-library/react-hooks";
import {
  makeMockChannel,
  makeMockSocket
} from "../../helpers/socketTestHelpers";
import { DirectionId } from "../../__v3api";
import useVehiclesChannel, {
  Vehicle,
  vehiclesReducer
} from "../useVehiclesChannel";

const vehiclesData: Vehicle[] = [
  {
    id: "y1799",
    route_id: "39",
    stop_id: "72",
    trip_id: "25",
    shape_id: "shape_1",
    direction_id: 1 as DirectionId,
    status: "STOPPED",
    latitude: 2.2,
    longitude: 1.1,
    bearing: 140,
    crowding: null
  },
  {
    id: "y1800",
    route_id: "39",
    stop_id: "73",
    trip_id: "25",
    shape_id: "shape_1",
    direction_id: 1 as DirectionId,
    status: "STOPPED",
    latitude: 2.4,
    longitude: 1.3,
    bearing: 141,
    crowding: null
  }
];

describe("vehiclesReducer", () => {
  const newVehiclesData = [
    {
      id: "y1801",
      route_id: "39",
      stop_id: "72",
      trip_id: "25",
      shape_id: "shape_1",
      direction_id: 1 as DirectionId,
      status: "STOPPED",
      latitude: 2.2,
      longitude: 1.1,
      bearing: 140,
      crowding: null
    },
    {
      id: "y1802",
      route_id: "39",
      stop_id: "73",
      trip_id: "25",
      shape_id: "shape_1",
      direction_id: 1 as DirectionId,
      status: "STOPPED",
      latitude: 2.4,
      longitude: 1.3,
      bearing: 141,
      crowding: null
    }
  ];
  const [newV1, newV2] = newVehiclesData;
  test("when event is reset, sets the list of vehicles to only the ones given", () => {
    const result = vehiclesReducer(vehiclesData, {
      event: "reset",
      data: newVehiclesData
    });

    expect(result.length).toBe(2);
    expect(result[0]).toMatchObject(newV1);
    expect(result[1]).toMatchObject(newV2);
  });
  test("when event is update, updates only the given vehicles", () => {
    const result = vehiclesReducer(newVehiclesData, {
      event: "update",
      data: [{ ...newV1, latitude: 3.4 }]
    });

    expect(result.length).toBe(2);
    expect(result[0]).toMatchObject({ id: newV1.id, latitude: 3.4 });
    expect(result[1]).toMatchObject(newV2);
  });
  test("when event is add, adds only the given vehicles", () => {
    const result = vehiclesReducer([newV1], {
      event: "add",
      data: [newV2]
    });

    expect(result.length).toBe(2);
    expect(result[0]).toMatchObject(newV1);
    expect(result[1]).toMatchObject(newV2);
  });

  test("when event is remove, removes only the given vehicle ids", () => {
    const result = vehiclesReducer(newVehiclesData, {
      event: "remove",
      data: [newV1.id]
    });

    expect(result.length).toBe(1);
    expect(result[0]).toMatchObject(newV2);
  });
});

describe("useVehiclesChannel hook", () => {
  beforeEach(() => {
    const mockSocket = makeMockSocket();
    const mockChannel = makeMockChannel("ok");
    mockSocket.channel.mockImplementation(() => mockChannel);

    // mock setup global variables on page load
    window.socket = mockSocket;
    window.channels = {};
  });

  test("initializes connection to appropriate channel", () => {
    const { result } = renderHook(() =>
      useVehiclesChannel({ routeId: "39", directionId: 1 })
    );
    expect(result.current).toEqual([]);
    expect(window.channels["vehicles-v2:39:1"]).toBeTruthy();
  });

  test("when passed null for route/direction, returns empty list", () => {
    const { result } = renderHook(() => useVehiclesChannel(null));
    expect(result.current).toEqual([]);
  });

  test("gets and outputs data", () => {
    const { result } = renderHook(() =>
      useVehiclesChannel({ routeId: "39", directionId: 1 })
    );
    const [v1, v2] = vehiclesData;

    /* pretend this is the channel emitting new vehicles */
    act(() => {
      const event = new CustomEvent<{
        event: "add";
        data: Vehicle[];
      }>("vehicles-v2:39:1", {
        detail: {
          event: "add",
          data: vehiclesData
        }
      });
      document.dispatchEvent(event);
    });

    expect(result.current.length).toBe(2);
    expect(result.current[0]).toMatchObject({ id: v1.id });
    expect(result.current[1]).toMatchObject({ id: v2.id });
  });

  test("doesn't output data if same as new data", () => {
    const { result } = renderHook(() =>
      useVehiclesChannel({ routeId: "39", directionId: 1 })
    );

    /* pretend this is the channel emitting new vehicles */
    act(() => {
      const event = new CustomEvent<{
        event: "reset";
        data: Vehicle[];
      }>("vehicles-v2:39:1", {
        detail: {
          event: "reset",
          data: vehiclesData
        }
      });
      document.dispatchEvent(event);
    });

    const firstResult = result.current;

    /* again! */
    /* pretend this is the channel emitting new vehicles */
    act(() => {
      const event = new CustomEvent<{
        event: "reset";
        data: Vehicle[];
      }>("vehicles-v2:39:1", {
        detail: {
          event: "reset",
          data: vehiclesData
        }
      });
      document.dispatchEvent(event);
    });
    expect(result.current).toEqual(firstResult);
  });
});
