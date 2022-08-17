import { getParam, updateParams } from "./../use-params";

const oldWindowLocation = window.location;
const mockLocation = () => {
  const location = {
    ...window.location,
    search: "?best_train=Red&good_bus=1"
  };
  Object.defineProperty(window, "location", {
    writable: true,
    value: location
  });
};
const unMockLocation = () => {
  window.location = oldWindowLocation;
};

describe("getParam", () => {
  beforeAll(mockLocation);
  afterAll(unMockLocation);

  test("gets URL parameter", () => {
    expect(getParam("best_train")).toEqual("Red");
    expect(getParam("good_bus")).toEqual("1");
  });

  test("gracefully handles absent parameter", () => {
    expect(getParam("bad_ferry")).toBe(null);
  });
});

describe("updateParam", () => {
  beforeAll(mockLocation);
  afterAll(unMockLocation);

  test("sets URL params", () => {
    const setter = jest.spyOn(URLSearchParams.prototype, "set");
    updateParams({
      good_bus: "66",
      ok_cr: "Foxboro"
    });
    expect(setter).toHaveBeenCalledWith("good_bus", "66");
    expect(setter).toHaveBeenCalledWith("ok_cr", "Foxboro");
  });

  test("deletes URL params", () => {
    const deleter = jest.spyOn(URLSearchParams.prototype, "delete");
    updateParams({ good_bus: null });
    expect(deleter).toHaveBeenCalledWith("good_bus");
  });
});
