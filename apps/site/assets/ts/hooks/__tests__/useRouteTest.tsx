import { renderHook } from "@testing-library/react-hooks";
import React from "react";
import { SWRConfig } from "swr";
import { useRoutesByStop } from "../useRoute";

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

  afterAll(() => {
    global.fetch = unmockedFetch;
  });
});
