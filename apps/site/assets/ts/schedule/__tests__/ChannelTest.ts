import { doInitChannel } from "../components/Channel";

describe("doInitChannel", () => {
  it("initializes a channel if it does not exist", () => {
    expect(window.socket).toEqual(undefined);
    expect(window.channels).toEqual(undefined);
    const channel = doInitChannel("vehicles:Red:0");
    expect(typeof channel).toEqual("object");
    expect(typeof window.channels).toEqual("object");
    expect(window.channels["vehicles:Red:0"]).toEqual(channel);
  });

  it("returns existing channel if already initialized", () => {
    expect(typeof window.socket).toEqual("object");
    expect(typeof window.channels).toEqual("object");
    const oldChannel = window.channels["vehicles:Red:0"];
    expect(typeof oldChannel).toEqual("object");
    const newChannel = doInitChannel("vehicles:Red:0");
    expect(newChannel).toEqual(oldChannel);
  });
});
