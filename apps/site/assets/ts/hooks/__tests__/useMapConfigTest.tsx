import { renderHook } from "@testing-library/react-hooks";
import React from "react";
import { SWRConfig } from "swr";
import useMapConfig from "../useMapConfig";

const unmockedFetch = global.fetch;
const HookWrapper: React.FC = ({ children }) => (
  <SWRConfig value={{ dedupingInterval: 0 }}>{children}</SWRConfig>
);

const testMapConfig = {
  tile_server_url: "Test URL"
};

describe("useMapConfig", () => {
  beforeAll(() => {
    // provide mocked network response
    global.fetch = jest.fn(
      () =>
        new Promise((resolve: Function) =>
          resolve({
            json: () => testMapConfig,
            ok: true,
            status: 200,
            statusText: "OK"
          })
        )
    );
  });

  it("should return a map config", async () => {
    const { result, waitFor } = renderHook(() => useMapConfig(), {
      wrapper: HookWrapper
    });
    await waitFor(() => expect(result.current).toEqual(testMapConfig));
  });

  afterAll(() => {
    global.fetch = unmockedFetch;
  });
});
