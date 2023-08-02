import { act, renderHook } from "@testing-library/react-hooks";
import usePredictionsChannel, {
  StreamPrediction,
  parsePrediction
} from "../usePredictionsChannel";
import {
  makeMockChannel,
  makeMockSocket
} from "../../helpers/socketTestHelpers";
import { Route, Stop, Trip } from "../../__v3api";
import * as useChannel from "../useChannel";

const predictionsFromStream = [
  {
    id: "1",
    "departing?": true,
    direction_id: 0,
    stop: { id: "place-somewhere" } as Stop,
    time: "2022-12-15 00:46:04.576744Z",
    track: "7",
    trip: { id: "123", headsign: "Destination One" } as Trip,
    vehicle_id: "v1"
  } as StreamPrediction,
  {
    id: "2",
    "departing?": true,
    direction_id: 0,
    stop: { id: "place-somewhere" } as Stop,
    time: "2022-12-15 00:48:04.576744Z",
    track: "2",
    trip: { id: "600", headsign: "Destination Two" } as Trip,
    vehicle_id: "v2"
  } as StreamPrediction,
  {
    id: "3",
    "departing?": false,
    direction_id: 0,
    stop: { id: "place-somewhere" } as Stop,
    time: "2022-12-15 00:55:04.576744Z",
    trip: { id: "20", headsign: "Destination One" } as Trip,
    vehicle_id: null
  } as StreamPrediction
];

describe("usePredictionsChannel hook", () => {
  beforeEach(() => {
    const mockSocket = makeMockSocket();
    const mockChannel = makeMockChannel("ok");
    mockSocket.channel.mockImplementationOnce(() => mockChannel);

    // mock setup global variables on page load
    window.socket = mockSocket;
    window.channels = {};
  });

  test("initializes connection to appropriate channel", () => {
    renderHook(() =>
      usePredictionsChannel({
        routeId: "Purple",
        stopId: "place-somewhere",
        directionId: 0
      })
    );
    expect(
      window.channels[
        "predictions:route=Purple:stop=place-somewhere:direction_id=0"
      ]
    ).toBeTruthy();
  });

  test("gets and outputs data", () => {
    const { result } = renderHook(() =>
      usePredictionsChannel({
        routeId: "Purple",
        stopId: "place-somewhere",
        directionId: 0
      })
    );

    /* pretend this is the channel emitting new predictions */
    act(() => {
      const event = new CustomEvent<{
        predictions: StreamPrediction[];
      }>("predictions:route=Purple:stop=place-somewhere:direction_id=0", {
        detail: {
          predictions: predictionsFromStream
        }
      });
      document.dispatchEvent(event);
    });

    expect(result.current).toHaveLength(predictionsFromStream.length);
  });

  test("gets and outputs data for just a stop", () => {
    const { result } = renderHook(() =>
      usePredictionsChannel({
        stopId: "place-overthere"
      })
    );

    /* pretend this is the channel emitting new predictions */
    act(() => {
      const event = new CustomEvent<{
        predictions: StreamPrediction[];
      }>("predictions:stop=place-overthere", {
        detail: {
          predictions: predictionsFromStream
        }
      });
      document.dispatchEvent(event);
    });

    expect(result.current).toHaveLength(predictionsFromStream.length);
  });

  test("doesn't output data if same as new data", () => {
    const { result } = renderHook(() =>
      usePredictionsChannel({
        routeId: "Purple",
        stopId: "place-somewhere",
        directionId: 0
      })
    );

    /* pretend this is the channel emitting new predictions */
    act(() => {
      const event = new CustomEvent<{
        predictions: StreamPrediction[];
      }>("predictions:route=Purple:stop=place-somewhere:direction_id=0", {
        detail: {
          predictions: predictionsFromStream
        }
      });
      document.dispatchEvent(event);
    });

    const results = result.current;
    expect(results).toBeTruthy();

    /* again! */
    act(() => {
      const event = new CustomEvent<{
        predictions: StreamPrediction[];
      }>("predictions:route=Purple:stop=place-somewhere:direction_id=0", {
        detail: {
          predictions: predictionsFromStream
        }
      });
      document.dispatchEvent(event);
    });
    expect(result.current).toBeTruthy();
    expect(result.current).toEqual(results);
  });

  test("handles no arguments", () => {
    const useChannelSpy = jest.spyOn(useChannel, "default");
    const { result } = renderHook(() => usePredictionsChannel({}));
    expect(useChannelSpy).toHaveBeenCalledWith(
      null,
      expect.anything(),
      expect.toBeOneOf([expect.anything(), null])
    );
    expect(result.current).toEqual(null);
  });
});

const streamPrediction = {
  id: "1",
  direction_id: 0,
  route: { id: "Silver" } as Route,
  stop: { id: "place-somewhere" } as Stop,
  schedule_relationship: "added",
  track: null,
  arrival_time: "2022-12-15 00:54:59.576744Z",
  departure_time: "2022-12-15 00:55:04.576744Z",
  time: "2022-12-15 00:54:59.576744Z",
  trip: { id: "999", headsign: "Final Destination" } as Trip,
  vehicle_id: "v1"
} as StreamPrediction;

describe("usePredictionsChannel parsePrediction", () => {
  test("modifies the streamed prediction", () => {
    const parsed = parsePrediction(streamPrediction);
    expect(parsed).toBeTruthy();
    expect(parsed.time).toEqual(new Date(streamPrediction.time!));
    expect(parsed.time).toEqual(new Date(streamPrediction.arrival_time!));
    expect(parsed.time).not.toEqual(new Date(streamPrediction.departure_time!));
    expect(parsed.vehicle_id).toEqual("v1");
  });

  test("handles no departure", () => {
    const parsed = parsePrediction({
      ...streamPrediction,
      departure_time: null
    });
    expect(parsed).toBeTruthy();
    expect(parsed.departure_time).toBeNull();
    expect(parsed.arrival_time).toEqual(
      new Date(streamPrediction.arrival_time!)
    );
  });

  test("handles no arrival", () => {
    const parsed = parsePrediction({ ...streamPrediction, arrival_time: null });
    expect(parsed).toBeTruthy();
    expect(parsed.arrival_time).toBeNull();
    expect(parsed.departure_time).toEqual(
      new Date(streamPrediction.departure_time!)
    );
  });
});
