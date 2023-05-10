import { renderHook } from "@testing-library/react-hooks";
import React from "react";
import { SWRConfig } from "swr";
import { useAlertsByStop } from "../useAlerts";

const unmockedFetch = global.fetch;
const HookWrapper: React.FC = ({ children }) => (
  <SWRConfig value={{ dedupingInterval: 0 }}>{children}</SWRConfig>
);

const testAlert = {
  id: "0"
};

describe("useAlertsByStop", () => {
  beforeAll(() => {
    // provide mocked network response
    global.fetch = jest.fn(
      () =>
        new Promise((resolve: Function) =>
          resolve({
            json: () => testAlert,
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
    await waitFor(() => expect(result.current).toEqual(testAlert));
  });

  afterAll(() => {
    global.fetch = unmockedFetch;
  });
});
