import { reducer } from "../fetch";

describe("reducer", () => {
  it("handles a fetch complete action", () => {
    const newState = reducer(
      { error: false, isLoading: true, data: null },
      { type: "FETCH_COMPLETE", payload: [] }
    );
    expect(newState).toEqual({ data: [], isLoading: false, error: false });
  });

  it("handles a fetch error action", () => {
    const newState = reducer(
      { error: false, isLoading: true, data: null },
      { type: "FETCH_ERROR" }
    );
    expect(newState).toEqual({ data: null, isLoading: false, error: true });
  });

  it("handles an unknown action", () => {
    const newState = reducer(
      { error: false, isLoading: true, data: null },
      // @ts-ignore
      { type: "UNKNOWN" }
    );
    expect(newState).toEqual({ data: null, isLoading: true, error: false });
  });
});
