import React from "react";
import * as redux from "react-redux";
import { act, renderHook } from "@testing-library/react-hooks";
import { RouteStop, StopTree } from "../../__schedule";
import useTreeStopPositions, {
  createStopTreeCoordStore
} from "../graphics/useTreeStopPositions";
import { stopIds } from "../../../../helpers/stop-tree";

const routeStopA: RouteStop = { id: "a" } as RouteStop;
const routeStopB: RouteStop = { id: "b" } as RouteStop;
const routeStopC: RouteStop = { id: "c" } as RouteStop;

/**
 *  a ---> b ---> c
 */
const stopTree: StopTree = {
  byId: {
    a: { id: "a", value: routeStopA },
    b: { id: "b", value: routeStopB },
    c: { id: "c", value: routeStopC }
  },
  edges: {
    a: { next: ["b"], previous: [] },
    b: { next: ["c"], previous: ["a"] },
    c: { next: [], previous: ["b"] }
  },
  startingNodes: ["a"]
};

const ids = stopIds(stopTree);

const store = createStopTreeCoordStore(stopTree);
const wrapper = ({ children }: any) => (
  <redux.Provider store={store}>{children}</redux.Provider>
);

describe("useTreeStopPositions", () => {
  it("returns a set of refs & an update function", () => {
    const { result } = renderHook(() => useTreeStopPositions(stopTree), {
      wrapper
    });
    const [refsMap, updateFn] = result.current;
    expect(refsMap).toBeTruthy();
    expect(typeof updateFn).toBe("function");
  });

  it("can update the values", () => {
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);

    const { result } = renderHook(() => useTreeStopPositions(stopTree), {
      wrapper
    });

    const updateFn = result.current[1];
    const map = result.current[0];
    ids.forEach(stopId => {
      map.set(stopId, null);
    });

    act(() => {
      updateFn();
    });

    // useDispatch() fired for every stop when invoked manually
    expect(mockDispatchFn).toHaveBeenCalledTimes(ids.length);

    expect(mockDispatchFn).toHaveBeenCalledWith({
      type: "set",
      stop: ids[0],
      coords: null
    });

    useDispatchSpy.mockClear();
  });

  it("can update the values on window resize", () => {
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);

    const { result } = renderHook(() => useTreeStopPositions(stopTree), {
      wrapper
    });

    const map = result.current[0];
    ids.forEach(stopId => {
      map.set(stopId, null);
    });

    act(() => {
      // Trigger the window resize event.
      window.dispatchEvent(new Event("resize"));
    });

    // useDispatch() fired for every stop when invoked manually
    expect(mockDispatchFn).toHaveBeenCalledTimes(ids.length);
    useDispatchSpy.mockClear();
  });

  it("can use refs to determine y coordinate", () => {
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);

    const { result } = renderHook(() => useTreeStopPositions(stopTree), {
      wrapper
    });

    const updateFn = result.current[1];

    const map = result.current[0];
    map.set(ids[0], {
      offsetTop: 22,
      offsetHeight: 66
    } as HTMLElement);

    act(() => {
      updateFn();
    });

    const expectedY = 22 + 66 / 2;
    expect(mockDispatchFn).toHaveBeenNthCalledWith(1, {
      type: "set",
      stop: ids[0],
      coords: [11, expectedY]
    });

    useDispatchSpy.mockClear();
  });
});
