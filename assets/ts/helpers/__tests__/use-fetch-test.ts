import { act, renderHook } from "@testing-library/react-hooks";
import useFetch, {
  FetchStatus,
  gotError,
  hasData,
  isNotStarted,
  isLoading
} from "../use-fetch";

interface TestDataType {
  isRunningATest: boolean;
}
const mockTestData: TestDataType = { isRunningATest: true };
const mockGoodResponse = {
  json: () => mockTestData,
  ok: true,
  status: 200,
  statusText: "OK"
};
const mockFetchPromiseChain = {
  then: (responseHandler: (response: any) => void) => {
    responseHandler(mockGoodResponse);

    return {
      then: (successHandler: (json: any) => void) => {
        successHandler(mockTestData);

        return {
          catch: jest.fn()
        };
      }
    };
  }
};

describe("useFetch", () => {
  it("returns a state and a fetch function", () => {
    const { result } = renderHook(() => useFetch<TestDataType>());
    const [initialState, fetch] = result.current;

    expect(initialState).toEqual({
      status: FetchStatus.NotStarted,
      data: undefined
    });

    expect(typeof fetch).toBe("function");
  });

  it("fetch uses the provided fetcher and parser", () => {
    const fetcher = jest.fn().mockImplementation(() => mockFetchPromiseChain);
    const parser = jest.fn().mockImplementation(data => data);

    const { result } = renderHook(() => useFetch<TestDataType>());
    const [, fetch] = result.current;

    act(() => {
      fetch({ fetcher, parser });
    });

    expect(fetcher).toHaveBeenCalled();
    expect(parser).toHaveBeenCalled();
  });

  it("sets the parsed data as state.data once complete", () => {
    const fetcher = jest.fn().mockImplementation(() => mockFetchPromiseChain);
    const parser = jest.fn().mockImplementation(data => data);

    const { result } = renderHook(() => useFetch<TestDataType>());
    const [, fetch] = result.current;

    act(() => {
      fetch({ fetcher, parser });
    });

    const [state] = result.current;

    expect(state).toEqual({
      status: FetchStatus.Data,
      data: mockTestData
    });
  });

  it("sets error true if there was an error", () => {
    const mockFetchErrorPromiseChain = {
      then: () => ({
        then: () => ({
          catch: (errorHandler: () => void) => {
            errorHandler();
          }
        })
      })
    };
    const fetcher = jest
      .fn()
      .mockImplementation(() => mockFetchErrorPromiseChain);
    const parser = jest.fn().mockImplementation(data => data);

    const { result } = renderHook(() => useFetch<TestDataType>());
    const [, fetch] = result.current;

    act(() => {
      fetch({ fetcher, parser });
    });

    const [state] = result.current;

    expect(state).toEqual({
      status: FetchStatus.Error,
      data: undefined
    });
  });
});

describe("isNotStarted", () => {
  it("returns true if the state has a status of NotStarted", () => {
    expect(isNotStarted({ status: FetchStatus.NotStarted })).toBeTruthy();
    expect(isNotStarted({ status: FetchStatus.Loading })).toBeFalsy();
    expect(isNotStarted({ status: FetchStatus.Data })).toBeFalsy();
    expect(isNotStarted({ status: FetchStatus.Error })).toBeFalsy();
  });
});

describe("isLoading", () => {
  it("returns true if the state has a status of NotStarted", () => {
    expect(isLoading({ status: FetchStatus.Loading })).toBeTruthy();
    expect(isLoading({ status: FetchStatus.NotStarted })).toBeFalsy();
    expect(isLoading({ status: FetchStatus.Data })).toBeFalsy();
    expect(isLoading({ status: FetchStatus.Error })).toBeFalsy();
  });
});

describe("hasData", () => {
  it("returns true if the state has a status of NotStarted", () => {
    expect(hasData({ status: FetchStatus.Data })).toBeTruthy();
    expect(hasData({ status: FetchStatus.NotStarted })).toBeFalsy();
    expect(hasData({ status: FetchStatus.Loading })).toBeFalsy();
    expect(hasData({ status: FetchStatus.Error })).toBeFalsy();
  });
});

describe("gotError", () => {
  it("returns true if the state has a status of NotStarted", () => {
    expect(gotError({ status: FetchStatus.Error })).toBeTruthy();
    expect(gotError({ status: FetchStatus.NotStarted })).toBeFalsy();
    expect(gotError({ status: FetchStatus.Loading })).toBeFalsy();
    expect(gotError({ status: FetchStatus.Data })).toBeFalsy();
  });
});
