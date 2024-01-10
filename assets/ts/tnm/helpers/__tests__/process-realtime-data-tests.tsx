import {
  findHeadsign,
  findRoute,
  findRouteInStops,
  findStop,
  makeGroupName
} from "../process-realtime-data";

describe("process-realtime-data", () => {
  describe("findRoute", () => {
    it("should return an update if the route is already in the data", () => {
      const data = [{ route: { id: "1" } }, { route: { id: "3" } }] as any;
      expect(findRoute(data, "3")).toEqual(["update", 1]);
    });
  });

  describe("findStop", () => {
    it("should return an update if the stop is already on the route", () => {
      const data = [
        {
          stops_with_directions: [{ stop: { id: "1" } }, { stop: { id: "2" } }]
        }
      ] as any;
      expect(findStop(data, 0, "2")).toEqual(["update", 1]);
    });
  });

  describe("findHeadsign", () => {
    it("should return the index if the headsign is in the directions", () => {
      const data = [
        {
          stops_with_directions: [
            {
              directions: [
                {
                  headsigns: [{ name: "Test Sign 1" }, { name: "Test Sign 2" }]
                }
              ]
            }
          ]
        }
      ] as any;
      expect(findHeadsign(data, 0, 0, 0, "Test Sign 2")).toEqual(1);
    });
  });

  describe("makeGroupName", () => {
    it("should return ferry when route type is 4", () => {
      expect(makeGroupName({ type: 4 } as any)).toEqual("ferry");
    });
  });

  describe("findRouteInStops", () => {
    it("should return an update if the route is not in the data", () => {
      const data = [
        {
          routes: [
            {
              group_name: "test_rail",
              routes: [{ id: "1" }, { id: "2" }, { id: "3" }]
            }
          ]
        }
      ] as any;
      const route = { type: 1, name: "Test Rail", id: "3" } as any;
      expect(findRouteInStops(data, 0, route)).toEqual(["update-route", 0, 2]);
    });
  });
});
