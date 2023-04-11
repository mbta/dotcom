import { act, renderHook } from "@testing-library/react-hooks";
import usePredictionsChannel, {
  StreamPrediction
} from "../usePredictionsChannel";
import {
  makeMockChannel,
  makeMockSocket
} from "../../helpers/socketTestHelpers";
import { Stop, Trip } from "../../__v3api";

describe("usePredictionsChannel", () => {
  beforeAll(() => {
    const mockSocket = makeMockSocket();
    const mockChannel = makeMockChannel("ok");
    mockSocket.channel.mockImplementationOnce(() => mockChannel);

    // mock setup global variables on page load
    window.socket = mockSocket;
    window.channels = {};
  });

  test("initializes connection to appropriate channel", () => {
    const { result } = renderHook(() =>
      usePredictionsChannel("Purple", "place-somewhere", 0)
    );
    expect(result.current).toEqual({});
    expect(
      window.channels["predictions:Purple:place-somewhere:0"]
    ).toBeTruthy();
  });

  test("gets and outputs data", () => {
    const { result } = renderHook(() =>
      usePredictionsChannel("Purple", "place-somewhere", 0)
    );

    /* pretend this is the channel emitting new predictions */
    act(() => {
      const event = new CustomEvent<{
        predictions: StreamPrediction[];
      }>("predictions:Purple:place-somewhere:0", {
        detail: {
          predictions: [
            {
              id: "1",
              "departing?": true,
              direction_id: 0,
              stop: { id: "place-somewhere" } as Stop,
              time: "2022-12-15 00:46:04.576744Z",
              track: "7",
              trip: { id: "123", headsign: "Destination One" } as Trip
            } as StreamPrediction,
            {
              id: "2",
              "departing?": true,
              direction_id: 0,
              stop: { id: "place-somewhere" } as Stop,
              time: "2022-12-15 00:48:04.576744Z",
              track: "2",
              trip: { id: "600", headsign: "Destination Two" } as Trip
            } as StreamPrediction,
            {
              id: "3",
              "departing?": false,
              direction_id: 0,
              stop: { id: "place-somewhere" } as Stop,
              time: "2022-12-15 00:55:04.576744Z",
              trip: { id: "20", headsign: "Destination One" } as Trip
            } as StreamPrediction
          ]
        }
      });
      document.dispatchEvent(event);
    });

    expect(result.current).toHaveProperty("Destination One");
    expect(result.current).toHaveProperty("Destination Two");
    expect(result.current["Destination One"]).toHaveLength(2);
    expect(result.current["Destination Two"]).toHaveLength(1);
  });

  test("doesn't output data if same as new data", () => {
    const { result } = renderHook(() =>
      usePredictionsChannel("Purple", "place-somewhere", 0)
    );

    const initialPredictions = [
      {
        id: "1",
        "departing?": true,
        direction_id: 0,
        stop: { id: "place-somewhere" } as Stop,
        time: "2022-12-15 00:46:04.576744Z",
        track: "7",
        trip: { id: "123", headsign: "Destination One" } as Trip
      } as StreamPrediction,
      {
        id: "2",
        "departing?": true,
        direction_id: 0,
        stop: { id: "place-somewhere" } as Stop,
        time: "2022-12-15 00:48:04.576744Z",
        track: "2",
        trip: { id: "600", headsign: "Destination Two" } as Trip
      } as StreamPrediction,
      {
        id: "3",
        "departing?": false,
        direction_id: 0,
        stop: { id: "place-somewhere" } as Stop,
        time: "2022-12-15 00:55:04.576744Z",
        trip: { id: "20", headsign: "Destination One" } as Trip
      } as StreamPrediction
    ];

    /* pretend this is the channel emitting new predictions */
    act(() => {
      const event = new CustomEvent<{
        predictions: StreamPrediction[];
      }>("predictions:Purple:place-somewhere:0", {
        detail: {
          predictions: initialPredictions
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
      }>("predictions:Purple:place-somewhere:0", {
        detail: {
          predictions: initialPredictions
        }
      });
      document.dispatchEvent(event);
    });
    expect(result.current).toBeTruthy();
    expect(result.current).toEqual(results);
  });
});
