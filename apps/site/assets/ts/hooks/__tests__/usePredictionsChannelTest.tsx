import { act, renderHook } from "@testing-library/react-hooks";
import usePredictionsChannel, {
  Prediction,
  StreamPrediction,
  groupByHeadsigns,
  parsePrediction
} from "../usePredictionsChannel";
import {
  makeMockChannel,
  makeMockSocket
} from "../../helpers/socketTestHelpers";
import { Route, Stop, Trip } from "../../__v3api";

const predictionsFromStream = [
  {
    id: "1",
    "departing?": true,
    direction_id: 0,
    stop: { id: "place-somewhere" } as Stop,
    departure_time: "2022-12-15 00:46:04.576744Z",
    track: "7",
    trip: { id: "123", headsign: "Destination One" } as Trip
  } as StreamPrediction,
  {
    id: "2",
    "departing?": true,
    direction_id: 0,
    stop: { id: "place-somewhere" } as Stop,
    departure_time: "2022-12-15 00:48:04.576744Z",
    track: "2",
    trip: { id: "600", headsign: "Destination Two" } as Trip
  } as StreamPrediction,
  {
    id: "3",
    "departing?": false,
    direction_id: 0,
    stop: { id: "place-somewhere" } as Stop,
    departure_time: "2022-12-15 00:55:04.576744Z",
    trip: { id: "20", headsign: "Destination One" } as Trip
  } as StreamPrediction
];

describe("usePredictionsChannel hook", () => {
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
          predictions: predictionsFromStream
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

    /* pretend this is the channel emitting new predictions */
    act(() => {
      const event = new CustomEvent<{
        predictions: StreamPrediction[];
      }>("predictions:Purple:place-somewhere:0", {
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
      }>("predictions:Purple:place-somewhere:0", {
        detail: {
          predictions: predictionsFromStream
        }
      });
      document.dispatchEvent(event);
    });
    expect(result.current).toBeTruthy();
    expect(result.current).toEqual(results);
  });
});

test("usePredictionsChannel parsePrediction modifies the streamed prediction", () => {
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
    trip: { id: "999", headsign: "Final Destination" } as Trip
  } as StreamPrediction;
  const parsed = parsePrediction(streamPrediction);

  expect(parsed).toBeTruthy();
  expect(parsed.time).toEqual(new Date(streamPrediction.departure_time!));
  expect(parsed.time).not.toEqual(new Date(streamPrediction.arrival_time!));
  expect(parsed.time).not.toEqual(new Date(streamPrediction.time!));
});

test("usePredictionsChannel groupByHeadsigns groups and sorts", () => {
  const predictions = [
    {
      trip: { headsign: "A" },
      time: new Date("2023-04-17T10:10:00")
    } as Prediction,
    {
      trip: { headsign: "B" },
      time: new Date("2023-04-17T09:14:00")
    } as Prediction,
    {
      trip: { headsign: "A" },
      time: new Date("2023-04-17T08:54:00")
    } as Prediction,
    {
      trip: { headsign: "B" },
      time: new Date("2023-04-17T09:00:00")
    } as Prediction,
    {
      trip: { headsign: "A" },
      time: new Date("2023-04-17T07:33:00")
    } as Prediction,
    {
      trip: { headsign: "C" },
      time: new Date("2023-04-17T09:25:00")
    } as Prediction,
    {
      trip: { headsign: "C" },
      time: new Date("2023-04-17T09:24:00")
    } as Prediction,
    {
      trip: { headsign: "A" },
      time: new Date("2023-04-17T09:24:00")
    } as Prediction
  ];
  const grouped = groupByHeadsigns(predictions);
  expect(Object.keys(grouped)).toContain("A");
  expect(Object.keys(grouped)).toContain("B");
  expect(Object.keys(grouped)).toContain("C");
  expect(grouped["A"].map(p => p.time.toLocaleTimeString())).toEqual([
    "7:33:00 AM",
    "8:54:00 AM",
    "9:24:00 AM",
    "10:10:00 AM"
  ]);
});
