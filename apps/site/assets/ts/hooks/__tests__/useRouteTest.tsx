import { renderHook } from "@testing-library/react-hooks";
import React from "react";
import { SWRConfig } from "swr";
import { RouteWithPolylines, useRoutesByStop } from "../useRoute";

const unmockedFetch = global.fetch;
const HookWrapper: React.FC = ({ children }) => (
  <SWRConfig value={{ dedupingInterval: 0 }}>{children}</SWRConfig>
);

const testData = [
  {
    id: "0",
    type: 0,
    polylines: [
      {
        id: "0",
        "dotted?": false,
        weight: 2,
        positions: [
          [1, 2],
          [3, 4]
        ],
        color: "#ABC123"
      }
    ]
  },
  {
    id: "1",
    type: 1,
    polylines: [
      {
        id: "1",
        "dotted?": false,
        weight: 2,
        positions: [
          [5, 2],
          [7, 4]
        ],
        color: "#ABC123"
      }
    ]
  },
  {
    id: "2",
    type: 2,
    polylines: [
      {
        id: "2",
        "dotted?": false,
        weight: 2,
        positions: [
          [9, 2],
          [3, 4]
        ],
        color: "#ABC123"
      }
    ]
  },
  {
    id: "3",
    type: 3,
    polylines: [
      {
        id: "3",
        "dotted?": false,
        weight: 2,
        positions: [
          [2, 2],
          [8, 4]
        ],
        color: "#ABC123"
      }
    ]
  },
  {
    id: "4",
    type: 4,
    polylines: [
      {
        id: "4",
        "dotted?": false,
        weight: 2,
        positions: [
          [9, 2],
          [3, 4]
        ],
        color: "#ABC123"
      }
    ]
  }
] as RouteWithPolylines[];

describe("useRoute", () => {
  beforeAll(() => {
    // provide mocked network response
    global.fetch = jest.fn(
      () =>
        new Promise((resolve: Function) =>
          resolve({
            json: () => testData,
            ok: true,
            status: 200,
            statusText: "OK"
          })
        )
    );
  });

  describe("useRoutesByStop", () => {
    it("should return an array of routes and lines", async () => {
      const { result, waitFor } = renderHook(() => useRoutesByStop("stop-id"), {
        wrapper: HookWrapper
      });
      await waitFor(() => expect(result.current).toEqual(testData));
      const routeWithPolylines = result.current![0];
      expect(typeof routeWithPolylines).toBe("object");
      expect(routeWithPolylines.polylines[0]).toHaveProperty("color");
      expect(routeWithPolylines.polylines[0]).toHaveProperty("weight");
      expect(routeWithPolylines.polylines[0]).toHaveProperty("positions");
    });
  });

  afterAll(() => {
    global.fetch = unmockedFetch;
  });
});
