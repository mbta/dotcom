import { renderHook } from "@testing-library/react-hooks";
import React from "react";
import { SWRConfig } from "swr";
import useFetch from "../useFetch";
import { FetchStatus } from "../../helpers/use-fetch";

const unmockedFetch = global.fetch;
const HookWrapper: React.FC = ({ children }) => (
  <SWRConfig value={{ dedupingInterval: 0 }}>{children}</SWRConfig>
);

describe("useFetch", () => {
  beforeEach(() => {
    // provide mocked network response
    global.fetch = jest.fn(
      () =>
        new Promise((resolve: Function) =>
          resolve({
            json: () => [1, 2, 3],
            ok: true,
            status: 200,
            statusText: "OK"
          })
        )
    );
  });

  it("should return data", async () => {
    const { result, waitFor } = renderHook(
      () => useFetch<number[]>("/api/something"),
      { wrapper: HookWrapper }
    );
    await waitFor(() =>
      expect(result.current.status).toEqual(FetchStatus.Data)
    );
    await waitFor(() => {
      expect(result.current.data).toEqual([1, 2, 3]);
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
      () => useFetch<number[]>("/api/something"),
      { wrapper: HookWrapper }
    );
    await waitFor(() => expect(result.current.status).toBe(FetchStatus.Error));
  });

  it("handles a null URL by resolving with undefined data", async () => {
    global.fetch = jest.fn();
    const { result, waitFor } = renderHook(() => useFetch<number[]>(null), {
      wrapper: HookWrapper
    });
    await waitFor(() => expect(result.current.status).toBe(FetchStatus.Data));
    await waitFor(() => expect(result.current.data).toBe(undefined));
    expect(global.fetch).not.toHaveBeenCalled();
  });

  afterAll(() => {
    global.fetch = unmockedFetch;
  });
});
