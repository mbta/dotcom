import { renderHook } from "@testing-library/react-hooks";
import React from "react";
import { SWRConfig } from "swr";
import useStop from "../useStop";

const unmockedFetch = global.fetch;
const HookWrapper: React.FC = ({ children }) => (
  <SWRConfig value={{ dedupingInterval: 0 }}>{children}</SWRConfig>
);

const testStop = {
  id: "0"
};

describe("useStop", () => {
  beforeAll(() => {
    // provide mocked network response
    global.fetch = jest.fn(
      () =>
        new Promise((resolve: Function) =>
          resolve({
            json: () => testStop,
            ok: true,
            status: 200,
            statusText: "OK"
          })
        )
    );
  });

  it("should return a stop", async () => {
    const { result, waitFor } = renderHook(() => useStop("stop-id"), {
      wrapper: HookWrapper
    });
    await waitFor(() => expect(result.current).toEqual(testStop));
  });

  afterAll(() => {
    global.fetch = unmockedFetch;
  });
});
