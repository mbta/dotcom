import { renderHook } from "@testing-library/react-hooks";
import React from "react";
import { SWRConfig } from "swr";
import { RouteWithPolylines, useRoutesByStop } from "../useRoute";
import { FetchStatus } from "../../helpers/use-fetch";

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
  beforeEach(() => {
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
      await waitFor(() =>
        expect(result.current.status).toEqual(FetchStatus.Data)
      );

      await waitFor(() => expect(result.current.data).toEqual(testData));
      const routeWithPolylines = result.current.data![0];
      expect(typeof routeWithPolylines).toBe("object");
      expect(routeWithPolylines.polylines[0]).toHaveProperty("color");
      expect(routeWithPolylines.polylines[0]).toHaveProperty("weight");
      expect(routeWithPolylines.polylines[0]).toHaveProperty("positions");
    });

    it("returns error status if API returns an error", async () => {
      global.fetch = jest.fn(
        () =>
          new Promise((resolve: Function) =>
            resolve({
              json: () => [],
              ok: false,
              status: 500,
              statusText: "ERROR"
            })
          )
      );
      const { result, waitFor } = renderHook(() => useRoutesByStop("stop-id"), {
        wrapper: HookWrapper
      });
      await waitFor(() =>
        expect(result.current.status).toBe(FetchStatus.Error)
      );
    });
  });

  afterAll(() => {
    global.fetch = unmockedFetch;
  });
});
