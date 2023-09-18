import { act, renderHook } from "@testing-library/react-hooks";
import React from "react";
import useDepartureRow from "../useDepartureRow";
import * as ReactRouter from "react-router-dom";
import { createSearchParams, MemoryRouter } from "react-router-dom";
import { Route } from "../../__v3api";

const wrapperForUrl = (path: string) => ({
  //@ts-ignore
  wrapper: ({ children }) => (
    <MemoryRouter initialEntries={[path]}>{children}</MemoryRouter>
  )
});

describe("useDepartureRow", () => {
  describe("activeRow", () => {
    test("should reflect valid search params", () => {
      const { result } = renderHook(
        () => useDepartureRow([{ id: "Silver" } as Route]),
        wrapperForUrl(
          "/stops/123?route=Silver&direction_id=1&headsign=Someplace"
        )
      );
      const { activeRow } = result.current;
      expect(activeRow).not.toBeNull();
      expect(activeRow!["directionId"]).toBe(1);
      expect(activeRow!["headsign"]).toBe("Someplace");
      expect(activeRow!["route"]).toEqual({ id: "Silver" });
    });
    test("should be null when no matching routes", () => {
      const { result } = renderHook(
        () => useDepartureRow([{ id: "Silver" } as Route]),
        wrapperForUrl("/stops/123?route=Red&direction_id=1&headsign=Someplace")
      );
      const { activeRow } = result.current;
      expect(activeRow).toBe(null);
    });
    test("should be null when direction param is bad", () => {
      const { result } = renderHook(
        () => useDepartureRow([{ id: "Silver" } as Route]),
        wrapperForUrl(
          "/stops/123?route=Silver&direction_id=3&headsign=Someplace"
        )
      );
      const { activeRow } = result.current;
      expect(activeRow).toBe(null);
    });
    test("should be null when param is missing", () => {
      const { result: noHeadsign } = renderHook(
        () => useDepartureRow([{ id: "Silver" } as Route]),
        wrapperForUrl("/stops/123?route=Silver&direction_id=1")
      );
      expect(noHeadsign.current.activeRow).toBe(null);
      const { result: noDirection } = renderHook(
        () => useDepartureRow([{ id: "Silver" } as Route]),
        wrapperForUrl("/stops/123?route=Silver&headsign=Roxbury")
      );
      expect(noDirection.current.activeRow).toBe(null);
      const { result: noRoute } = renderHook(
        () => useDepartureRow([{ id: "Silver" } as Route]),
        wrapperForUrl("/stops/123?headsign=Roxbury&direction_id=0")
      );
      expect(noRoute.current.activeRow).toBe(null);
    });
  });

  describe("resetRow", () => {
    test("can unset departure params", async () => {
      const initialParams = createSearchParams({
        route: "Silver",
        direction_id: "1",
        headsign: "Someplace"
      });
      const expectedParams = createSearchParams({});
      const spy = jest.spyOn(ReactRouter, "useSearchParams");
      const setParamSpy = jest.fn();
      spy.mockImplementation(() => [initialParams, setParamSpy]);
      const { result, waitFor } = renderHook(
        () => useDepartureRow([{ id: "Silver" } as Route]),
        wrapperForUrl(
          "/stops/123?route=Silver&direction_id=1&headsign=Someplace"
        )
      );
      act(() => {
        result.current.resetRow();
      });
      await waitFor(() =>
        expect(setParamSpy).toHaveBeenCalledWith(expectedParams)
      );
    });
    test("should not disturb other params", async () => {
      const initialParams = createSearchParams({
        route: "Silver",
        direction_id: "1",
        headsign: "Someplace",
        other_param: "true",
        from: "99"
      });
      const expectedParams = createSearchParams({
        other_param: "true",
        from: "99"
      });
      const spy = jest.spyOn(ReactRouter, "useSearchParams");
      const setParamSpy = jest.fn();
      spy.mockImplementation(() => [initialParams, setParamSpy]);
      const { result, waitFor } = renderHook(
        () => useDepartureRow([{ id: "Silver" } as Route]),
        wrapperForUrl(
          "/stops/123?route=Silver&direction_id=1&headsign=Someplace&other_param=true&from=99"
        )
      );
      act(() => {
        result.current.resetRow();
      });
      await waitFor(() =>
        expect(setParamSpy).toHaveBeenCalledWith(expectedParams)
      );
    });
  });

  describe("setRow", () => {
    test("can set departure params", async () => {
      const initialParams = createSearchParams({
        route: "Silver",
        direction_id: "1",
        headsign: "Someplace"
      });
      const spy = jest.spyOn(ReactRouter, "useSearchParams");
      const setParamSpy = jest.fn();
      spy.mockImplementation(() => [initialParams, setParamSpy]);
      const { result, waitFor } = renderHook(
        () =>
          useDepartureRow([{ id: "Silver" } as Route, { id: "Gold" } as Route]),
        wrapperForUrl(
          "/stops/123?route=Silver&direction_id=1&headsign=Someplace"
        )
      );
      act(() => {
        result.current.setRow({
          routeId: "Gold",
          directionId: "1",
          headsign: "That way"
        });
      });
      const expectedParams = createSearchParams({
        route: "Gold",
        direction_id: "1",
        headsign: "That way"
      });
      await waitFor(() =>
        expect(setParamSpy).toHaveBeenCalledWith(expectedParams)
      );
    });
    test("should not disturb other params", async () => {
      const initialParams = createSearchParams({
        route: "Silver",
        direction_id: "1",
        headsign: "Someplace",
        other_param: "true",
        from: "99"
      });

      const spy = jest.spyOn(ReactRouter, "useSearchParams");
      const setParamSpy = jest.fn();
      spy.mockImplementation(() => [initialParams, setParamSpy]);
      const { result, waitFor } = renderHook(
        () => useDepartureRow([{ id: "Silver" } as Route]),
        wrapperForUrl(
          "/stops/123?route=Silver&direction_id=1&headsign=Someplace&other_param=true&from=99"
        )
      );
      act(() => {
        result.current.setRow({
          routeId: "Silver",
          directionId: "0",
          headsign: "Other area"
        });
      });
      const expectedParams = createSearchParams({
        route: "Silver",
        direction_id: "0",
        headsign: "Other area",
        other_param: "true",
        from: "99"
      });
      await waitFor(() =>
        expect(setParamSpy).toHaveBeenCalledWith(expectedParams)
      );
    });
  });
});
