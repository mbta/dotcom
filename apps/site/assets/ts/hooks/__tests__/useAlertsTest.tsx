import { renderHook } from "@testing-library/react-hooks";
import React from "react";
import { SWRConfig } from "swr";
import { useAlertsByRoute, useAlertsByStop } from "../useAlerts";
import { FetchStatus } from "../../helpers/use-fetch";

const unmockedFetch = global.fetch;
const HookWrapper: React.FC = ({ children }) => (
  <SWRConfig value={{ dedupingInterval: 0 }}>{children}</SWRConfig>
);

const testAlert = {
  id: "0"
};

const testAlertTwo = {
  id: "1"
};

const oneAlertPromise: Promise<Response> = new Promise((resolve: Function) =>
  resolve({
    json: () => [testAlert],
    ok: true,
    status: 200,
    statusText: "OK"
  })
);

const twoAlertsPromise: Promise<Response> = new Promise((resolve: Function) =>
  resolve({
    json: () => [testAlert, testAlertTwo],
    ok: true,
    status: 200,
    statusText: "OK"
  })
);

describe("useAlertsByStop", () => {
  beforeEach(() => {
    // provide mocked network response
    global.fetch = jest.fn(
      () =>
        new Promise((resolve: Function) =>
          resolve({
            json: () => [testAlert],
            ok: true,
            status: 200,
            statusText: "OK"
          })
        )
    );
  });

  it("should return an alert", async () => {
    const { result, waitFor } = renderHook(() => useAlertsByStop("stop-id"), {
      wrapper: HookWrapper
    });
    await waitFor(() =>
      expect(result.current.status).toEqual(FetchStatus.Data)
    );

    await waitFor(() => expect(result.current.data).toEqual([testAlert]));
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
    const { result, waitFor } = renderHook(() => useAlertsByStop("stop-id"), {
      wrapper: HookWrapper
    });
    await waitFor(() => expect(result.current.status).toBe(FetchStatus.Error));
  });

  afterAll(() => {
    global.fetch = unmockedFetch;
  });
});

describe("useAlertsByRoute", () => {
  beforeEach(() => {
    // provide mocked network response
    global.fetch = jest.fn(url => {
      if (url === "/api/alerts?route_ids=route-id") {
        return oneAlertPromise;
      } else if (url === "/api/alerts?route_ids=route-1,route-2") {
        return twoAlertsPromise;
      } else {
        throw Error(
          `Unexpected URL: ${url}.  The URL parsing parsed route ids into an unexpected format`
        );
      }
    });
  });

  it("should return an alert array for one route id", async () => {
    const { result, waitFor } = renderHook(
      () => useAlertsByRoute(["route-id"]),
      {
        wrapper: HookWrapper
      }
    );
    await waitFor(() =>
      expect(result.current.status).toEqual(FetchStatus.Data)
    );

    await waitFor(() => expect(result.current.data).toEqual([testAlert]));
  });

  it("should return an alert array for multiple route id", async () => {
    const { result, waitFor } = renderHook(
      () => useAlertsByRoute(["route-1", "route-2"]),
      {
        wrapper: HookWrapper
      }
    );
    await waitFor(() =>
      expect(result.current.status).toEqual(FetchStatus.Data)
    );
    await waitFor(() => {
      expect(result.current.data).toEqual([testAlert, testAlertTwo]);
    });
  });

  it("should return an empty list if no routeIds passed", async () => {
    const { result, waitFor } = renderHook(() => useAlertsByRoute([]), {
      wrapper: HookWrapper
    });
    await waitFor(() =>
      expect(result.current.status).toEqual(FetchStatus.Data)
    );
    await waitFor(() => {
      expect(result.current.data).toEqual([]);
    });
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
    const { result, waitFor } = renderHook(
      () => useAlertsByRoute(["bad-route"]),
      {
        wrapper: HookWrapper
      }
    );
    await waitFor(() => expect(result.current.status).toBe(FetchStatus.Error));
  });

  afterAll(() => {
    global.fetch = unmockedFetch;
  });
});
