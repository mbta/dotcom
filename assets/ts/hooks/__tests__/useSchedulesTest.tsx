import { renderHook, act } from "@testing-library/react-hooks/dom";
import React from "react";
import { SWRConfig } from "swr";
import { useSchedulesByStop } from "../useSchedules";
import { FetchStatus } from "../../helpers/use-fetch";

const unmockedFetch = global.fetch;
const HookWrapper: React.FC = ({ children }) => (
  <SWRConfig value={{ dedupingInterval: 0 }}>{children}</SWRConfig>
);

const testSchedule1 = {
  trip: { id: "0" },
  time: "2022-04-30T11:15:00-04:00"
};

const testSchedule2 = {
  trip: { id: "1" },
  time: "2022-04-30T11:20:00-04:00"
};

describe("useSchedulesByStop", () => {
  beforeEach(() => {
    // provide mocked network response
    global.fetch = jest.fn(
      () =>
        new Promise((resolve: Function) =>
          resolve({
            json: () => [testSchedule1, testSchedule2],
            ok: true,
            status: 200,
            statusText: "OK"
          })
        )
    );
  });

  it("should return an array of parsed schedules", async () => {
    await act(async () => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date("2022-04-30T11:14:00-04:00"));

      const { result, waitFor } = renderHook(
        () => useSchedulesByStop("stop-id"),
        { wrapper: HookWrapper }
      );
      await waitFor(() => {
        expect(result.current.status).toBe(FetchStatus.Data);
        expect(result.current.data).toBeDefined();
        expect(result.current.data!.length).toEqual(2);
        expect(result.current.data![0].trip.id).toEqual("0");
        expect(result.current.data![1].trip.id).toEqual("1");
        expect(result.current.data![0].time).toEqual(
          new Date(testSchedule1.time)
        );
        expect(result.current.data![1].time).toEqual(
          new Date(testSchedule2.time)
        );
      });

      // advance clock past first schedule but before second
      jest.advanceTimersByTime(240000); // 4 minutes later

      // time continues! next interval should make first schedule in the past,
      // leaving only one to display
      await waitFor(() => {
        expect(result.current.status).toBe(FetchStatus.Data);
        expect(result.current.data).toBeDefined();
        expect(result.current.data!.length).toEqual(1);
        expect(result.current.data![0].trip.id).toEqual("1");
        expect(result.current.data![0].time).toEqual(
          new Date(testSchedule2.time)
        );
      });

      jest.useRealTimers();
    });
  });

  it("returns error status if API returns an error", async () => {
    global.fetch = jest.fn(
      () =>
        new Promise((resolve: Function) =>
          resolve({
            json: () => [testSchedule1, testSchedule2],
            ok: false,
            status: 500,
            statusText: "ERROR"
          })
        )
    );
    const { result, waitFor } = renderHook(
      () => useSchedulesByStop("stop-id"),
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
