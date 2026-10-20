/* eslint-disable @typescript-eslint/no-var-requires */
import { MapManager } from "maplibrex";

const mockCreated: MockMarker[] = [];

class MockPopup {
  options: object;
  html: string | null = null;

  constructor(options: object) {
    this.options = options;
  }

  setHTML(html: string): this {
    this.html = html;
    return this;
  }
}

class MockMarker {
  options: { rotation: number; anchor: string; element: HTMLElement };
  element: HTMLElement;
  lngLat: number[] | null = null;
  rotation: number;
  popup: MockPopup | null = null;
  added = false;
  removed = false;

  constructor(options: {
    rotation: number;
    anchor: string;
    element: HTMLElement;
  }) {
    this.options = options;
    this.element = options.element;
    this.rotation = options.rotation;
    mockCreated.push(this);
  }

  setLngLat(lngLat: number[]): this {
    this.lngLat = lngLat;
    return this;
  }

  setRotation(rotation: number): this {
    this.rotation = rotation;
    return this;
  }

  setPopup(popup: MockPopup | null): this {
    this.popup = popup;
    return this;
  }

  addTo(): this {
    this.added = true;
    return this;
  }

  remove(): this {
    this.removed = true;
    return this;
  }
}

// The factories run when the hook is first required, after the classes above exist.
jest.mock("maplibre-gl", () => ({
  Marker: MockMarker,
  Popup: MockPopup
}));

jest.mock("maplibrex", () => ({ MapManager: { get: jest.fn() } }), {
  virtual: true
});

interface IconOptions {
  id?: string;
  coordinates: number[];
  rotation?: string;
  popup?: string;
}

const icon = ({
  id,
  coordinates,
  rotation,
  popup
}: IconOptions): HTMLElement => {
  const el = document.createElement("span");
  el.setAttribute("data-coordinates", JSON.stringify(coordinates));
  if (id !== undefined) el.setAttribute("data-marker-id", id);
  if (rotation !== undefined) el.setAttribute("data-rotation", rotation);
  if (popup !== undefined) el.setAttribute("data-popup", popup);
  return el;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Hook = any;

describe("IconMarkers hook", () => {
  const IconMarkers = require("../icon-markers").default;
  let hook: Hook;

  const setIcons = (icons: IconOptions[]): void => {
    hook.el.innerHTML = "";
    icons.forEach(i => hook.el.appendChild(icon(i)));
  };

  beforeEach(() => {
    mockCreated.length = 0;
    (MapManager.get as jest.Mock).mockImplementation((id: string) =>
      id === "map" ? {} : undefined
    );
    const el = document.createElement("div");
    el.dataset.mapId = "map";
    hook = Object.assign(Object.create(IconMarkers), { el });
  });

  it("adds a marker for each icon, with rotation and popup", () => {
    setIcons([
      { id: "a", coordinates: [-71, 42], rotation: "90", popup: "<b>A</b>" },
      { id: "b", coordinates: [-72, 43] }
    ]);

    hook.mounted();

    expect(mockCreated).toHaveLength(2);
    expect(mockCreated[0].lngLat).toEqual([-71, 42]);
    expect(mockCreated[0].options.rotation).toBe(90);
    expect(mockCreated[0].options.anchor).toBe("center");
    expect(mockCreated[0].popup!.html).toBe("<b>A</b>");
    expect(mockCreated[0].added).toBe(true);
    expect(mockCreated[1].popup).toBeNull();
    expect(mockCreated[1].options.rotation).toBe(0);
  });

  it("applies data-z-index to marker elements, including ones added later", () => {
    hook.el.dataset.zIndex = "2";
    setIcons([{ id: "a", coordinates: [-71, 42] }]);
    hook.mounted();

    setIcons([
      { id: "a", coordinates: [-71, 42] },
      { id: "b", coordinates: [-72, 43] }
    ]);
    hook.updated();

    expect(mockCreated.map(m => m.element.style.zIndex)).toEqual(["2", "2"]);
  });

  it("leaves z-index unset without data-z-index", () => {
    setIcons([{ id: "a", coordinates: [-71, 42] }]);

    hook.mounted();

    expect(mockCreated[0].element.style.zIndex).toBe("");
  });

  it("clones the source element instead of moving it", () => {
    setIcons([{ id: "a", coordinates: [-71, 42] }]);

    hook.mounted();

    expect(mockCreated[0].element).not.toBe(hook.el.firstChild);
    expect(hook.el.children).toHaveLength(1);
  });

  it("does nothing if the map is not registered", () => {
    hook.el.dataset.mapId = "missing";
    setIcons([{ id: "a", coordinates: [-71, 42] }]);

    hook.mounted();

    expect(mockCreated).toHaveLength(0);
  });

  it("skips icons without a [lng, lat] pair", () => {
    setIcons([{ id: "a", coordinates: [-71] }]);

    hook.mounted();

    expect(mockCreated).toHaveLength(0);
  });

  describe("updated", () => {
    it("moves and rotates existing markers in place", () => {
      setIcons([{ id: "a", coordinates: [-71, 42], rotation: "10" }]);
      hook.mounted();

      setIcons([{ id: "a", coordinates: [-70, 41], rotation: "20" }]);
      hook.updated();

      expect(mockCreated).toHaveLength(1);
      expect(mockCreated[0].removed).toBe(false);
      expect(mockCreated[0].lngLat).toEqual([-70, 41]);
      expect(mockCreated[0].rotation).toBe(20);
    });

    it("adds new ids and removes missing ids", () => {
      setIcons([
        { id: "a", coordinates: [-71, 42] },
        { id: "b", coordinates: [-72, 43] }
      ]);
      hook.mounted();

      setIcons([
        { id: "b", coordinates: [-72, 43] },
        { id: "c", coordinates: [-73, 44] }
      ]);
      hook.updated();

      expect(mockCreated).toHaveLength(3);
      expect(mockCreated[0].removed).toBe(true);
      expect(mockCreated[1].removed).toBe(false);
      expect(mockCreated[2].lngLat).toEqual([-73, 44]);
    });

    it("keeps the same popup and only replaces changed HTML", () => {
      setIcons([{ id: "a", coordinates: [-71, 42], popup: "one" }]);
      hook.mounted();
      const popup = mockCreated[0].popup!;
      const setHTML = jest.spyOn(popup, "setHTML");

      setIcons([{ id: "a", coordinates: [-71, 42], popup: "one" }]);
      hook.updated();
      expect(setHTML).not.toHaveBeenCalled();

      setIcons([{ id: "a", coordinates: [-71, 42], popup: "two" }]);
      hook.updated();
      expect(mockCreated[0].popup).toBe(popup);
      expect(popup.html).toBe("two");
    });

    it("adds and removes popups as data-popup changes", () => {
      setIcons([{ id: "a", coordinates: [-71, 42] }]);
      hook.mounted();
      expect(mockCreated[0].popup).toBeNull();

      setIcons([{ id: "a", coordinates: [-71, 42], popup: "hi" }]);
      hook.updated();
      expect(mockCreated[0].popup!.html).toBe("hi");

      setIcons([{ id: "a", coordinates: [-71, 42] }]);
      hook.updated();
      expect(mockCreated[0].popup).toBeNull();
    });

    it("falls back to position when there are no ids", () => {
      setIcons([{ coordinates: [-71, 42] }]);
      hook.mounted();

      setIcons([{ coordinates: [-70, 41] }]);
      hook.updated();

      expect(mockCreated).toHaveLength(1);
      expect(mockCreated[0].lngLat).toEqual([-70, 41]);
    });
  });

  it("removes every marker when destroyed", () => {
    setIcons([
      { id: "a", coordinates: [-71, 42] },
      { id: "b", coordinates: [-72, 43] }
    ]);
    hook.mounted();

    hook.destroyed();

    expect(mockCreated.every(marker => marker.removed)).toBe(true);
  });
});
