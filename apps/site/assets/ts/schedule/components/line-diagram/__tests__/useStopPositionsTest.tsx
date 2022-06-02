import React, { MutableRefObject } from "react";
import * as redux from "react-redux";
import { createLineDiagramCoordStore } from "../graphics/graphic-helpers";
import { act, renderHook } from "@testing-library/react-hooks";
import useStopPositions from "../graphics/useStopPositions";
import simpleLineDiagram from "./lineDiagramData/simple.json";
import { LineDiagramStop } from "../../__schedule";
import { HTMLAttributes } from "enzyme";

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
    const ref0 = refsMap.get(lineDiagram[0].route_stop.id);
    expect(ref0).toBeTruthy();
    expect(ref0).toHaveProperty("current"); // it's a ref!
    expect(typeof ref0).toBe("object");
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

    // useDispatch() fired for every stop on initialization
    expect(mockDispatchFn).toHaveBeenCalledTimes(lineDiagram.length);

    act(() => {
      updateFn();
    });

    // useDispatch() fired for every stop when invoked manually
    expect(mockDispatchFn).toHaveBeenCalledTimes(lineDiagram.length * 2);

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
    const updateFn = result.current[1];

    // useDispatch() fired for every stop on initialization
    expect(mockDispatchFn).toHaveBeenCalledTimes(lineDiagram.length);

    act(() => {
      // Trigger the window resize event.
      window.dispatchEvent(new Event("resize"));
    });

    // useDispatch() fired for every stop when invoked manually
    expect(mockDispatchFn).toHaveBeenCalledTimes(lineDiagram.length * 2);
    useDispatchSpy.mockClear();
  });

  it("can use refs to determine y coordinate", () => {
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);

    const useRefSpy = jest.spyOn(React, "useRef");
    const mockUseRef = {
      current: { offsetTop: 22, offsetHeight: 66 }
    } as MutableRefObject<HTMLAttributes>;
    useRefSpy.mockReturnValue(mockUseRef);

    const { result } = renderHook(() => useStopPositions(lineDiagram), {
      wrapper
    });
    const updateFn = result.current[1];

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
