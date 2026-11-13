/* eslint-disable @typescript-eslint/no-var-requires */
type Handler = (payload: object) => void;

const FitBounds = require("../fit-bounds").default;

describe("FitBounds hook", () => {
  let handlers: Record<string, Handler>;
  let hook: { handleEvent: (name: string, fn: Handler) => void };

  beforeEach(() => {
    document.body.innerHTML = '<div id="the-map"></div>';
    handlers = {};
    hook = {
      handleEvent: (name: string, fn: Handler) => {
        handlers[name] = fn;
      }
    };
    FitBounds.mounted.call(hook);
  });

  it("dispatches maplibrex:fit_bounds on the map element", () => {
    const received: CustomEvent[] = [];
    document
      .getElementById("the-map")!
      .addEventListener("maplibrex:fit_bounds", e =>
        received.push(e as CustomEvent)
      );

    handlers["fit-bounds"]({
      map_id: "the-map",
      bounds: [[-71.1, 42.3], [-71, 42.4]],
      padding: 50,
      max_zoom: 16
    });

    expect(received).toHaveLength(1);
    expect(received[0].detail).toEqual({
      bounds: [[-71.1, 42.3], [-71, 42.4]],
      padding: 50,
      maxZoom: 16
    });
  });

  it("ignores events for a map that is not on the page", () => {
    expect(() =>
      handlers["fit-bounds"]({ map_id: "missing", bounds: [[0, 0], [1, 1]] })
    ).not.toThrow();
  });
});
