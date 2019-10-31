import { reducer } from "../fetch";

describe("reducer", () => {
  it("handles a fetch complete action", () => {
    const newState = reducer(
      { error: false, isLoading: true, data: null, initial: null },
      { type: "FETCH_COMPLETE", payload: [] }
    );
    expect(newState).toEqual({
      data: [],
      initial: [],
      isLoading: false,
      error: false
    });
  });

  it("handles a fetch error action", () => {
    const newState = reducer(
      { error: false, isLoading: true, data: null, initial: null },
      { type: "FETCH_ERROR" }
    );
    expect(newState).toEqual({
      data: null,
      initial: null,
      isLoading: false,
      error: true
    });
  });

  it("handles an unknown action", () => {
    const newState = reducer(
      { error: false, isLoading: true, data: null, initial: null },
      // @ts-ignore
      { type: "UNKNOWN" }
    );
    expect(newState).toEqual({
      data: null,
      initial: null,
      isLoading: true,
      error: false
    });
  });
});
