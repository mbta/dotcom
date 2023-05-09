import { renderHook } from "@testing-library/react-hooks";
import React from "react";
import { SWRConfig } from "swr";
import { useSchedulesByStop } from "../useSchedules";

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
  beforeAll(() => {
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
    const { result, waitFor } = renderHook(
      () => useSchedulesByStop("stop-id"),
      {
        wrapper: HookWrapper
      }
    );
    await waitFor(() => {
      expect(result.current?.length).toEqual(2);
      expect(result.current![0].trip.id).toEqual("0");
      expect(result.current![1].trip.id).toEqual("1");
      expect(result.current![0].time).toEqual(new Date(testSchedule1.time));
      expect(result.current![1].time).toEqual(new Date(testSchedule2.time));
    });
  });

  afterAll(() => {
    global.fetch = unmockedFetch;
  });
});
