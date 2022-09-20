import React, { ReactNode } from "react";
import { renderHook } from "@testing-library/react-hooks";
import usePredictions from "../usePredictions";
import {
  makeMockChannel,
  makeMockSocket
} from "../../helpers/socketTestHelpers";
import { Socket } from "phoenix";
import { SocketProvider } from "../../contexts/socketContext";
import { ConnectionStatus } from "../useSocket";

const routeId = "39";

const predictionsData = [
  { id: "prediction1", time: "2022-09-21T15:43:24.692760Z" }
];

const predictions = [
  { id: "prediction1", time: new Date("2022-09-21T15:43:24.692760Z") }
];

describe("usePredictions", () => {
  test("predictions is empty to start", () => {
    const { result } = renderHook(() => usePredictions(routeId), {
      wrapper,
      initialProps: { socket: undefined }
    });
    expect(result.current).toEqual([]);
  });

  test("subscribes to a channel", () => {
    const mockSocket = makeMockSocket();
    const mockChannel = makeMockChannel();
    mockSocket.channel.mockImplementationOnce(() => mockChannel);

    const { rerender } = renderHook(() => usePredictions(routeId), {
      wrapper,
      initialProps: { socket: mockSocket }
    });

    // Needs to be kicked to do the effects again after the socket initializes
    rerender();

    expect(mockSocket.channel).toHaveBeenCalledTimes(1);
    expect(mockSocket.channel).toHaveBeenCalledWith("predictions:39");
    expect(mockChannel.join).toHaveBeenCalledTimes(1);
  });

  test("returns initial prediction results from joining a channel", async () => {
    const mockSocket = makeMockSocket();
    const mockChannel = makeMockChannel();
    mockSocket.channel.mockImplementationOnce(() => mockChannel);
    mockChannel.receive.mockImplementation((event, handler) => {
      if (event === "ok") {
        handler({ predictions: predictionsData });
      }
      return mockChannel;
    });

    const { result } = renderHook(() => usePredictions(routeId), {
      wrapper,
      initialProps: { socket: mockSocket }
    });

    expect(result.current).toEqual(predictions);
  });

  test("returns results pushed to the channel", async () => {
    const mockSocket = makeMockSocket();
    const mockChannel = makeMockChannel();
    mockSocket.channel.mockImplementationOnce(() => mockChannel);
    mockChannel.on.mockImplementation((event, handler) => {
      if (event === "predictions") {
        handler({ predictions: predictionsData });
      }
    });

    const { result } = renderHook(() => usePredictions(routeId), {
      wrapper,
      initialProps: { socket: mockSocket }
    });

    expect(result.current).toEqual(predictions);
  });
});

const wrapper = ({
  children,
  socket
}: {
  children?: ReactNode;
  socket: Socket | undefined;
}): JSX.Element => (
  <SocketProvider
    socketStatus={{ socket, connectionStatus: ConnectionStatus.Connected }}
  >
    <> {children} </>
  </SocketProvider>
);
