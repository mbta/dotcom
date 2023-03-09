import { renderHook } from "@testing-library/react-hooks";
import React from "react";
import { SWRConfig } from "swr";
import { useRoutesByStop, useTypedRoutesByStop } from "../useRoute";

const unmockedFetch = global.fetch;
const HookWrapper: React.FC = ({ children }) => (
  <SWRConfig value={{ dedupingInterval: 0 }}>{children}</SWRConfig>
);

const testRoutes = [
  {
    id: "0",
    type: 0
  },
  {
    id: "1",
    type: 1
  },
  {
    id: "2",
    type: 2
  },
  {
    id: "3",
    type: 3
  },
  {
    id: "4",
    type: 4
  }
];

describe("useRoute", () => {
  beforeAll(() => {
    // provide mocked network response
    global.fetch = jest.fn(
      () =>
        new Promise((resolve: Function) =>
          resolve({
            json: () => testRoutes,
            ok: true,
            status: 200,
            statusText: "OK"
          })
        )
    );
  });

  describe("useRoutesByStop", () => {
    it("should return an array of routes", async () => {
      const { result, waitFor } = renderHook(() => useRoutesByStop("stop-id"), {
        wrapper: HookWrapper
      });
      await waitFor(() => expect(result.current).toEqual(testRoutes));
    });
  });

  describe("useTypedRoutesByStop", () => {
    test("should group the routes by type", async () => {
      const { result, waitFor } = renderHook(
        () => useTypedRoutesByStop("stop-id"),
        { wrapper: HookWrapper }
      );
      const expectedResults = [
        {
          group_name: "subway",
          routes: [
            { route: { id: "0", type: 0 }, directions: [] },
            { route: { id: "1", type: 1 }, directions: [] }
          ]
        },
        {
          group_name: "commuter-rail",
          routes: [{ route: { id: "2", type: 2 }, directions: [] }]
        },
        {
          group_name: "bus",
          routes: [{ route: { id: "3", type: 3 }, directions: [] }]
        },
        {
          group_name: "ferry",
          routes: [{ route: { id: "4", type: 4 }, directions: [] }]
        }
      ];

      await waitFor(() => expect(result.current).toEqual(expectedResults));
    });
  });

  afterAll(() => {
    global.fetch = unmockedFetch;
  });
});
