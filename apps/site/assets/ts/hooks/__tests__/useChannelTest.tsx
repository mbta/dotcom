import { renderHook, act } from "@testing-library/react-hooks";
import { SocketEvent } from "../../app/channels";
import useChannel from "../useChannel";
import {
  makeMockChannel,
  makeMockSocket
} from "../../helpers/socketTestHelpers";
import { waitFor } from "@testing-library/dom";
import { Channel } from "phoenix";

interface MockData {
  thing: string;
}
interface MockState {
  things: string[];
}
type MockAction = SocketEvent<MockData[]> & { arbitrary: boolean };
type MockReducer = (state: MockState, action: MockAction) => MockState;

const mockReducer: MockReducer = (state, action) => {
  if (action.arbitrary) return { things: ["arbitrary"] };

  switch (action.event) {
    case "reset":
      return { things: [] };
    case "add":
      return { things: [...action.data.map(d => d.thing), ...state.things] };
    case "update":
      return { things: action.data.map(d => d.thing) };
    case "remove":
      return {
        things: [...state.things].filter(thing => !action.data.includes(thing))
      };
    default:
      return state;
  }
};

const initialState = { things: ["apple", "banana", "citrus"] };

describe("useChannel", () => {
  beforeAll(() => {
    const mockSocket = makeMockSocket();
    const mockChannel = makeMockChannel("ok");
    mockSocket.channel.mockImplementationOnce(() => mockChannel);

    // mock setup global variables on page load
    window.socket = mockSocket;
    window.channels = {};
  });

  test("initially sets state to initial data", async () => {
    expect(window.channels["mock-channel"]).toBeUndefined();
    const { result } = renderHook(() =>
      useChannel<MockData, MockReducer>(
        "mock-channel",
        mockReducer,
        initialState
      )
    );
    expect(result.current).toEqual(initialState);
    expect(window.channels["mock-channel"]).toBeTruthy();
  });

  test("uses reducer function to handle data", () => {
    const { result } = renderHook(() =>
      useChannel<MockData, MockReducer>(
        "mock-channel",
        mockReducer,
        initialState
      )
    );

    expect(result.current).toBe(initialState);

    act(() => {
      const event = new CustomEvent<MockAction>("mock-channel", {
        detail: {
          event: "add",
          data: [{ thing: "durian" }],
          arbitrary: false
        }
      });
      document.dispatchEvent(event);
    });

    expect(result.current.things).toContain("durian"); // added new thing
    expect(result.current.things.filter(t => t !== "durian")).toEqual(
      initialState.things
    ); // still has original things
  });
});
