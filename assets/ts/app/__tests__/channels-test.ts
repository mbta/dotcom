import { waitFor } from "@testing-library/react";
import { Channel, Socket } from "phoenix";
import {
    makeMockChannel,
    makeMockSocket
} from "../../helpers/socketTestHelpers";
import setupChannels, {
    isVehicleChannel,
    joinChannel,
    leaveChannel
} from "../channels";

const mockOnLoadEventListener = () => {
  const ev = new CustomEvent("load");
  window.dispatchEvent(ev);
};

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

describe("setupChannels", () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <script data-channel="vehicles:Red:0"></script>
    `;
  });

  afterEach(() => {
    // Will leave channels that are joined
    const ev = new CustomEvent("DOMContentLoaded");
    document.dispatchEvent(ev);
  });

  it("initializes a channel if it does not exist", () => {
    expect(window.socket).toBeUndefined();
    expect(window.channels).toBeUndefined();
    setupChannels();
    mockOnLoadEventListener();
    expect(window.socket).toBeDefined();
    expect(window.socket).toBeInstanceOf(Socket);
    expect(typeof window.channels).toEqual("object");
    const channel = window.channels["vehicles:Red:0"];
    expect(channel).toBeDefined();
    expect(channel).toBeInstanceOf(Channel);
  });

  it("returns existing channel if already initialized", () => {
    expect(typeof window.socket).toEqual("object");
    expect(typeof window.channels).toEqual("object");
    setupChannels();
    mockOnLoadEventListener();
    const oldChannel = window.channels["vehicles:Red:0"];
    expect(oldChannel).toBeInstanceOf(Channel);
    mockOnLoadEventListener();
    const newChannel = window.channels["vehicles:Red:0"];
    expect(newChannel).toBeInstanceOf(Channel);
    expect(newChannel).toEqual(oldChannel);
  });

  it("responds to channel data with a custom event", () => {
    setupChannels();
    mockOnLoadEventListener();
    const channel = window.channels["vehicles:Red:0"];
    const mockEventListener = jest.fn();
    document.addEventListener("vehicles:Red:0", mockEventListener);

    const data = "hello there";
    // @ts-ignore... phoenix.js isn't properly typed. and technically this is a private property. how else to trigger a channel event!
    channel.trigger("data", data);

    const event = new CustomEvent("vehicles:Red:0", { detail: data });
    expect(mockEventListener).toHaveBeenCalledWith(event);
  });

  it("responds to channel join error", () => {
    setupChannels();
    mockOnLoadEventListener();
    const channel = window.channels["vehicles:Red:0"];
    const mockEventListener = jest.fn();
    document.addEventListener("vehicles:Red:0", mockEventListener);
    const consoleMock = jest
      .spyOn(global.console, "error")
      .mockImplementation(() => {});
    // @ts-ignore... phoenix.js isn't properly typed. and technically this is a private property. how else to trigger a channel event!
    channel.joinPush.trigger("error", { reason: "bad day" });
    expect(console.error).toHaveBeenCalledWith(
      "failed to join vehicles:Red:0",
      "bad day"
    );
    const event = new CustomEvent("vehicles:Red:0", {
      detail: { error: "bad day" }
    });
    expect(mockEventListener).toHaveBeenCalledWith(event);

    consoleMock.mockRestore();
  });

  it("responds to channel join success", () => {
    setupChannels();
    mockOnLoadEventListener();
    const channel = window.channels["vehicles:Red:0"];
    const consoleMock = jest
      .spyOn(global.console, "log")
      .mockImplementation(() => {});
    // @ts-ignore... phoenix.js isn't properly typed. and technically this is a private property. how else to trigger a channel event!
    channel.joinPush.trigger("ok");
    expect(console.log).toHaveBeenCalledWith("success joining vehicles:Red:0");

    consoleMock.mockRestore();
  });

  it("responds to an error", () => {
    // This should test the onError callback of the channel
    setupChannels();
    mockOnLoadEventListener();

    const channel = window.channels["vehicles:Red:0"];
    const consoleMock = jest.spyOn(global.console, "error");
    // @ts-ignore... phoenix.js isn't properly typed. and technically this is a private property. how else to trigger a channel event!
    channel.trigger("phx_error", "bad data");
    expect(consoleMock).toHaveBeenCalledWith("error on channel vehicles:Red:0 : bad data");

    consoleMock.mockRestore();
  });

  it("responds to socket being closed", async () => {
    // needed to suppress JSDOM Not implemented error
    Object.defineProperty(global.window, "location", {
      get: () => ({
        protocol: "http:", // avoid throwing error in phoenix.js
        reload: reloadMock
      })
    });

    const reloadMock = jest.fn();
    const consoleMock = jest.spyOn(console, "log").mockImplementation(() => {});

    setupChannels();
    //@ts-ignore: phoenix.js isn't properly typed. and technically this is a
    //private property. force the WebSocket closed!
    window.socket.conn.close();

    await waitFor(
      () => {
        expect(reloadMock).toHaveBeenCalled();
        expect(consoleMock).toHaveBeenCalledWith(
          "Socket was forced closed by the browser -- reloading to establish WebSocket connection."
        );
      },
      { timeout: 5000 }
    );

    jest.restoreAllMocks();
  });
});

describe("joinChannel", () => {
  it("can handle data dispatched on join", () => {
    const mockHandleJoin = jest.fn();
    const channelName = "some:channel";
    window.channels[channelName] = window.socket.channel(channelName, {});
    joinChannel(channelName, mockHandleJoin);
    // @ts-ignore
    window.channels[channelName].joinPush.trigger("ok", { some: "data" });
    expect(mockHandleJoin).toHaveBeenCalledWith({ some: "data" });
  });

  it("joins remove channel for vehicles channel", () => {
    const mockSocket = makeMockSocket();
    const mockChannel = makeMockChannel("ok");
    mockSocket.channel.mockImplementation(() => mockChannel);

    // mock setup global variables on page load
    window.socket = mockSocket;
    window.channels = {};

    expect(window.channels["vehicles:remove"]).toBeUndefined();
    joinChannel("vehicles:routeId:directionId");
    expect(window.channels["vehicles:remove"]).toBeDefined();
  });
});

describe("leaveChannel", () => {
  it("leaves the channel with the given id", () => {
    const mockSocket = makeMockSocket();
    const mockChannel = makeMockChannel("ok");
    mockSocket.channel.mockImplementation(() => mockChannel);
    window.socket = mockSocket;
    window.channels = {};
    const mockHandleJoin = jest.fn();
    const channelName = "some:channel";

    joinChannel(channelName, mockHandleJoin);
    expect(window.channels[channelName]).toBeDefined();
    leaveChannel(channelName);
    expect(window.channels[channelName]).toBeUndefined();
  });

  it("also leaves vehicles:remove channel for vehicles channel", () => {
    const mockSocket = makeMockSocket();
    const mockChannel = makeMockChannel("ok");
    mockSocket.channel.mockImplementation(() => mockChannel);
    window.socket = mockSocket;
    window.channels = {};

    const vehicleChannelName = "vehicles:routeId:directionId";
    joinChannel(vehicleChannelName);

    expect(window.channels[vehicleChannelName]).toBeDefined();
    expect(window.channels["vehicles:remove"]).toBeDefined();

    leaveChannel(vehicleChannelName);
    expect(window.channels[vehicleChannelName]).toBeUndefined();
    expect(window.channels["vehicles:remove"]).toBeUndefined();
  });
});
