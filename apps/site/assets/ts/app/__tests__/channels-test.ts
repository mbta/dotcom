import { Channel, Socket } from "phoenix";
import setupChannels, { isVehicleChannel, joinChannel } from "../channels";

const mockOnLoadEventListener = () => {
  // because the turbolinks:load event doesn't fire outside the browser, run in manually here
  const ev = new CustomEvent("turbolinks:load");
  document.dispatchEvent(ev);
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
    const ev = new CustomEvent("turbolinks:before-render");
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
    const consoleMock = jest
      .spyOn(global.console, "error")
      .mockImplementation(() => {});
    // @ts-ignore... phoenix.js isn't properly typed. and technically this is a private property. how else to trigger a channel event!
    channel.joinPush.trigger("error", { reason: "bad day" });
    expect(console.error).toHaveBeenCalledWith(
      "failed to join vehicles:Red:0",
      "bad day"
    );

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
});
