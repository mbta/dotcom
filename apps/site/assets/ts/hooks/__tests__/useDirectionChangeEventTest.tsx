import { fireEvent } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";
import useDirectionChangeEvent from "../useDirectionChangeEvent";

describe("useDirectionChangeEvent", () => {
  test("listens to the 'changeddirection' event", () => {
    const { result } = renderHook(() => useDirectionChangeEvent(0));
    expect(result.current).toEqual(0);

    act(() => {
      fireEvent(
        document,
        new CustomEvent("changeddirection", { detail: { direction: 1 } })
      );
    });

    expect(result.current).toEqual(1);
  });
});
