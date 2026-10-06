import { Channel, Socket } from "phoenix";
import {
  makeMockChannel,
  makeMockSocket
} from "../../helpers/socketTestHelpers";
import { isVehicleChannel, joinChannel, leaveChannel } from "../channels";

afterEach(() => {
  jest.restoreAllMocks();
  jest.useRealTimers();
  Reflect.deleteProperty(document, "visibilityState");
  Reflect.deleteProperty(window, "socket");
  Reflect.deleteProperty(window, "channels");
});

describe("isVehicleChannel", () => {
  test("true for vehicle marker channel topic", () => {
    expect(isVehicleChannel("vehicles:39:1")).toBe(true);
  });
  test("true for vehicles channel topic", () => {
    expect(isVehicleChannel("vehicles-v2:39:1")).toBe(true);
  });
  test("false for remove vehicles topic", () => {
    expect(isVehicleChannel("vehicles:remove")).toBe(false);
    expect(isVehicleChannel("vehicles-v2:remove")).toBe(false);
  });
  test("false for other topics", () => {
    expect(isVehicleChannel("predictions:39:1:0")).toBe(false);
  });
});

describe("joinChannel", () => {
  it("creates the socket lazily and reuses it", () => {
    expect(window.socket).toBeUndefined();
    const connect = jest
      .spyOn(Socket.prototype, "connect")
      .mockImplementation(() => {});
    const channel = makeMockChannel();
    jest
      .spyOn(Socket.prototype, "channel")
      .mockReturnValue((channel as unknown) as Channel);

    joinChannel("predictions:stop:1");

    const socket = window.socket;
    expect(socket).toBeInstanceOf(Socket);
    expect(window.channels["predictions:stop:1"]).toBe(channel);
    expect(connect).toHaveBeenCalledTimes(1);

    joinChannel("predictions:stop:2");
    expect(window.socket).toBe(socket);
    expect(connect).toHaveBeenCalledTimes(1);
  });

  it("does not reload and schedules Phoenix reconnect after an unclean close", () => {
    const originalLocation = window.location;
    const reload = jest.fn();
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { protocol: "http:", reload }
    });
    jest.useFakeTimers();
    const connect = jest
      .spyOn(Socket.prototype, "connect")
      .mockImplementation(() => {});
    jest
      .spyOn(Socket.prototype, "channel")
      .mockReturnValue((makeMockChannel() as unknown) as Channel);

    try {
      joinChannel("predictions:stop:1");
      Reflect.set(window.socket, "closeWasClean", false);
      // Phoenix's reconnect timer remains responsible for recovering the socket.
      // @ts-expect-error Phoenix exposes this callback at runtime but omits it from its type.
      window.socket.onConnClose({
        type: "close",
        wasClean: false,
        code: 1006
      });

      expect(reload).not.toHaveBeenCalled();
      jest.runOnlyPendingTimers();
      expect(connect).toHaveBeenCalledTimes(2);
    } finally {
      Object.defineProperty(window, "location", {
        configurable: true,
        value: originalLocation
      });
    }
  });

  it("dispatches channel data as a custom event", () => {
    const socket = makeMockSocket();
    const channel = makeMockChannel();
    let onData: ((data: string) => void) | undefined;
    channel.on.mockImplementation((event, handler) => {
      if (event === "data") onData = handler;
    });
    socket.channel.mockReturnValue(channel);
    window.socket = socket;
    window.channels = {};

    const listener = jest.fn();
    document.addEventListener("predictions:stop:1", listener);
    joinChannel("predictions:stop:1");

    onData?.("hello there");

    expect(listener).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "predictions:stop:1",
        detail: "hello there"
      })
    );
    document.removeEventListener("predictions:stop:1", listener);
  });

  it("dispatches join errors", () => {
    const socket = makeMockSocket();
    const channel = makeMockChannel("error");
    socket.channel.mockReturnValue(channel);
    window.socket = socket;
    window.channels = {};
    const listener = jest.fn();
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    document.addEventListener("predictions:stop:1", listener);

    joinChannel("predictions:stop:1");

    expect(consoleError).toHaveBeenCalledWith(
      "failed to join predictions:stop:1",
      "ERROR_REASON"
    );
    expect(listener).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "predictions:stop:1",
        detail: { error: "ERROR_REASON" }
      })
    );
    document.removeEventListener("predictions:stop:1", listener);
  });

  it("dispatches join timeouts", () => {
    const socket = makeMockSocket();
    const channel = makeMockChannel("timeout");
    socket.channel.mockReturnValue(channel);
    window.socket = socket;
    window.channels = {};
    const listener = jest.fn();
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    document.addEventListener("predictions:stop:1", listener);

    joinChannel("predictions:stop:1");

    expect(consoleError).toHaveBeenCalledWith(
      "failed to join predictions:stop:1",
      undefined
    );
    expect(listener).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "predictions:stop:1",
        detail: { error: "timeout" }
      })
    );
    document.removeEventListener("predictions:stop:1", listener);
  });

  it("handles data dispatched on join", () => {
    const socket = makeMockSocket();
    const channel = makeMockChannel("ok", { some: "data" });
    socket.channel.mockReturnValue(channel);
    window.socket = socket;
    window.channels = {};
    const handleJoin = jest.fn();

    joinChannel("predictions:stop:1", handleJoin);

    expect(handleJoin).toHaveBeenCalledWith({ some: "data" });
  });

  it("joins the remove channel for vehicle channels", () => {
    const socket = makeMockSocket();
    socket.channel.mockImplementation(() => makeMockChannel());
    window.socket = socket;
    window.channels = {};

    joinChannel("vehicles-v2:routeId:directionId");

    expect(window.channels["vehicles-v2:routeId:directionId"]).toBeDefined();
    expect(window.channels["vehicles-v2:remove"]).toBeDefined();
  });
});

describe("leaveChannel", () => {
  it("leaves the channel with the given id", () => {
    const socket = makeMockSocket();
    const channel = makeMockChannel();
    socket.channel.mockReturnValue(channel);
    window.socket = socket;
    window.channels = {};

    joinChannel("some:channel");
    leaveChannel("some:channel");

    expect(channel.leave).toHaveBeenCalled();
    expect(window.channels["some:channel"]).toBeUndefined();
  });

  it("also leaves the remove channel for vehicle channels", () => {
    const socket = makeMockSocket();
    const channel = makeMockChannel();
    socket.channel.mockReturnValue(channel);
    window.socket = socket;
    window.channels = {};

    joinChannel("vehicles:routeId:directionId");
    leaveChannel("vehicles:routeId:directionId");

    expect(window.channels["vehicles:routeId:directionId"]).toBeUndefined();
    expect(window.channels["vehicles:remove"]).toBeUndefined();
  });
});
