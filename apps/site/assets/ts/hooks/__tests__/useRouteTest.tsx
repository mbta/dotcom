import { renderHook } from "@testing-library/react-hooks";
import React from "react";
import { SWRConfig } from "swr";
import { useRoutes } from "../useRoute";
import { FetchStatus } from "../../helpers/use-fetch";
import { Route } from "../../__v3api";

const unmockedFetch = global.fetch;
const HookWrapper: React.FC = ({ children }) => (
  <SWRConfig value={{ dedupingInterval: 0 }}>{children}</SWRConfig>
);

const testData = [
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
] as Route[];

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

  it("should return an array of routes", async () => {
    const { result, waitFor } = renderHook(() => useRoutes(["stop-id"]), {
      wrapper: HookWrapper
    });
    await waitFor(() =>
      expect(result.current.status).toEqual(FetchStatus.Data)
    );

    await waitFor(() => expect(result.current.data).toEqual(testData));
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
    const { result, waitFor } = renderHook(() => useRoutes(["stop-id"]), {
      wrapper: HookWrapper
    });
    await waitFor(() => expect(result.current.status).toBe(FetchStatus.Error));
  });

  afterAll(() => {
    global.fetch = unmockedFetch;
  });
});
