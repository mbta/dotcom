/* eslint-disable @typescript-eslint/no-var-requires */
const mockSetStyle = jest.fn();
const mockOriginalUpdated = jest.fn(function updated(this: {
  _maplibrex: {
    map: { setStyle: (style: unknown) => void };
    config: { style: unknown };
  };
  el: HTMLElement;
}) {
  const newConfig = JSON.parse(this.el.dataset.config as string);
  // Mirrors MaplibreX, which compares styles by reference
  if (newConfig.style !== this._maplibrex.config.style) {
    this._maplibrex.map.setStyle(newConfig.style);
  }
});

jest.mock(
  "maplibrex",
  () => ({ MapHooks: { MapHook: { updated: mockOriginalUpdated } } }),
  { virtual: true }
);

const MapHook = require("../map").default;

const style = { version: 8, sources: {}, layers: [] };

const buildHook = (configStyle: unknown, elementStyle: unknown) => {
  const el = document.createElement("div");
  el.dataset.config = JSON.stringify({ style: elementStyle });

  // maplibre-gl defines setStyle on the prototype
  class MockMap {}
  Object.assign(MockMap.prototype, { setStyle: mockSetStyle });
  const map = new MockMap() as { setStyle: typeof mockSetStyle };
  return { el, _maplibrex: { map, config: { style: configStyle } } };
};

describe("Map hook", () => {
  beforeEach(() => {
    mockSetStyle.mockClear();
    mockOriginalUpdated.mockClear();
  });

  it("doesn't reset the style when an equal style object is re-sent", () => {
    const hook = buildHook(style, { ...style });

    MapHook.updated.call(hook);

    expect(mockOriginalUpdated).toHaveBeenCalledTimes(1);
    expect(mockSetStyle).not.toHaveBeenCalled();
    expect(Object.keys(hook._maplibrex.map)).toEqual([]);
    expect(hook._maplibrex.map.setStyle).toBe(mockSetStyle);
  });

  it("still sets the style when it has changed", () => {
    const newStyle = { ...style, version: 9 };
    const hook = buildHook(style, newStyle);

    MapHook.updated.call(hook);

    expect(mockSetStyle).toHaveBeenCalledWith(newStyle);
  });
});
