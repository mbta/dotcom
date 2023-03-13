import { renderHook } from "@testing-library/react-hooks";
import React from "react";
import { SWRConfig } from "swr";
import { LiveDataByStop } from "../../schedule/components/line-diagram/__line-diagram";
import { LineDiagramVehicle } from "../../schedule/components/__schedule";
import { HeadsignWithCrowding, Route } from "../../__v3api";
import useRealtime from "../useRealtime";

const unmockedFetch = global.fetch;
const testRoute = { id: "Red", type: 1 } as Route;
const testRouteFerry = { id: "Boat", type: 4 } as Route;
const testRequestURL = `/schedules/line_api/realtime?id=${testRoute.id}&direction_id=0`;
const HookWrapper: React.FC<{ children?: React.ReactNode }> = ({
  children
}) => <SWRConfig value={{ dedupingInterval: 0 }}>{children}</SWRConfig>;
const testResponse: LiveDataByStop = {
  "place-north": {
    vehicles: [{} as LineDiagramVehicle],
    headsigns: [{} as HeadsignWithCrowding]
  },
  "place-bbsta": { vehicles: [], headsigns: [] }
};

describe("useRealtime", () => {
  beforeAll(() => {
    // provide mocked network response
    global.fetch = jest.fn(
      () =>
        new Promise((resolve: Function) =>
          resolve({
            json: () => testResponse,
            ok: true,
            status: 200,
            statusText: "OK"
          })
        )
    );
  });

  test("should do nothing when enabled value is false", async () => {
    const { result, waitFor } = renderHook(
      () => useRealtime(testRoute, 0, false),
      {
        wrapper: HookWrapper
      }
    );
    await waitFor(() => expect(result.current).toBe(undefined));
  });

  test("should do nothing when route is ferry", async () => {
    const { result, waitFor } = renderHook(
      () => useRealtime(testRouteFerry, 0, false),
      {
        wrapper: HookWrapper
      }
    );
    await waitFor(() => expect(result.current).toBe(undefined));
  });

  test("should make fetch request", async () => {
    const { result, waitFor } = renderHook(() => useRealtime(testRoute, 0), {
      wrapper: HookWrapper
    });

    await waitFor(() => expect(result.current).toMatchObject(testResponse));
    expect(global.fetch).toHaveBeenCalledWith(testRequestURL);
  });

  afterAll(() => {
    global.fetch = unmockedFetch;
  });
});
