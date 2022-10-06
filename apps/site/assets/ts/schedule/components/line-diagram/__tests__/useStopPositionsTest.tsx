import React from "react";
import * as redux from "react-redux";
import { createLineDiagramCoordStore } from "../graphics/graphic-helpers";
import { act, renderHook } from "@testing-library/react-hooks";
import useStopPositions from "../graphics/useStopPositions";
import simpleLineDiagram from "./lineDiagramData/simple.json";
import { LineDiagramStop } from "../../__schedule";

const lineDiagram = (simpleLineDiagram as unknown) as LineDiagramStop[];

const store = createLineDiagramCoordStore(lineDiagram);
const wrapper = ({ children }: any) => (
  <redux.Provider store={store}>{children}</redux.Provider>
);

describe("useStopPositions", () => {
  it("returns a set of refs & an update function", () => {
    const { result } = renderHook(() => useStopPositions(lineDiagram), {
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
    const { result } = renderHook(() => useStopPositions(lineDiagram), {
      wrapper
    });
    const updateFn = result.current[1];
    const map = result.current[0];
    lineDiagram.forEach(stop => {
      map.set(stop.route_stop.id, null);
    });
    // for test coverage purposes
    map.set("this-stop-doesn't-exist", null);

    act(() => {
      updateFn();
    });

    // useDispatch() fired for every stop when invoked manually
    expect(mockDispatchFn).toHaveBeenCalledTimes(lineDiagram.length);

    expect(mockDispatchFn).toHaveBeenCalledWith({
      type: "set",
      stop: lineDiagram[0].route_stop.id,
      coords: null
    });

    useDispatchSpy.mockClear();
  });

  it("can update the values on window resize", () => {
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    const { result } = renderHook(() => useStopPositions(lineDiagram), {
      wrapper
    });
    const map = result.current[0];
    lineDiagram.forEach(stop => {
      map.set(stop.route_stop.id, null);
    });

    act(() => {
      // Trigger the window resize event.
      window.dispatchEvent(new Event("resize"));
    });

    // useDispatch() fired for every stop when invoked manually
    expect(mockDispatchFn).toHaveBeenCalledTimes(lineDiagram.length);
    useDispatchSpy.mockClear();
  });

  it("can use refs to determine y coordinate", () => {
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);

    const { result } = renderHook(() => useStopPositions(lineDiagram), {
      wrapper
    });
    const updateFn = result.current[1];
    const map = result.current[0];
    map.set(lineDiagram[0].route_stop.id, {
      offsetTop: 22,
      offsetHeight: 66
    } as HTMLElement);

    act(() => {
      updateFn();
    });

    const expectedY = 22 + 66 / 2;
    expect(mockDispatchFn).toHaveBeenNthCalledWith(1, {
      type: "set",
      stop: lineDiagram[0].route_stop.id,
      coords: [11, expectedY]
    });

    useDispatchSpy.mockClear();
  });
});
