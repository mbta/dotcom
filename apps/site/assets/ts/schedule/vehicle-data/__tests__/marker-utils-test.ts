import { iconOpts } from "../marker-utils";

describe("iconOpts", () => {
  it("handles stop markers", () => {
    expect(iconOpts(data.markers[1].icon)).toEqual({
      icon_size: [12, 12], // eslint-disable-line camelcase
      icon_anchor: [6, 6] // eslint-disable-line camelcase
    });
  });

  it("throws an error if it received an unknown icon type", () => {
    expect(() => iconOpts("unknown")).toThrowError();
  });

  it("does not throw error when icon is null", () => {
    expect(iconOpts(null)).toEqual({});
  });
});
