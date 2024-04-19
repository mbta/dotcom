import { useReducer } from "react";

/**
 * Fetching comprises a simple state machine flow:
 *
 * NotStarted → Loading → Data
 *                      ↳ Error
 */
// Exported just for testing
export enum FetchStatus {
  NotStarted = 1,
  Loading,
  Data,
  Error
}

interface StartFetchAction {
  type: "FETCH_STARTED";
}

const startFetch = (): StartFetchAction => ({ type: "FETCH_STARTED" });

interface CompleteFetchAction<T> {
  type: "FETCH_COMPLETE";
  payload: T;
}

const completeFetch = <T>(payload: T): CompleteFetchAction<T> => ({
  type: "FETCH_COMPLETE",
  payload
});

interface ErrorFetchAction {
  type: "FETCH_ERROR";
}

const errorFetch = (): ErrorFetchAction => ({ type: "FETCH_ERROR" });

export type FetchAction<T> =
  | StartFetchAction
  | CompleteFetchAction<T>
  | ErrorFetchAction;

export interface FetchState<T> {
  status: FetchStatus;
  data?: T;
  errorData?: string;
}

const createInitialState = <T>(): FetchState<T> => ({
  status: FetchStatus.NotStarted,
  data: undefined
});

export const isNotStarted = <T>({ status }: FetchState<T>): boolean =>
  status === FetchStatus.NotStarted;

export const isLoading = <T>({ status }: FetchState<T>): boolean =>
  status === FetchStatus.Loading;

export const hasData = <T>({ status }: FetchState<T>): boolean =>
  status === FetchStatus.Data;

export const gotError = <T>({ status }: FetchState<T>): boolean =>
  status === FetchStatus.Error;

type Reducer<T> = (
  state: FetchState<T>,
  action: FetchAction<T>
) => FetchState<T>;

const createFetchReducer = <T>(): Reducer<T> => (state, action) => {
  switch (action.type) {
    case "FETCH_STARTED":
      return { ...state, status: FetchStatus.Loading, data: undefined };
    case "FETCH_COMPLETE":
      return { ...state, status: FetchStatus.Data, data: action.payload };
    case "FETCH_ERROR":
      return { ...state, status: FetchStatus.Error };
    default:
      return state;
  }
};

export type Fetcher = () => Promise<Response>;

export type Parser<T> = (json: JSON) => T;

interface FetchProps<T> {
  fetcher: Fetcher;
  parser: Parser<T>;
}

export type Fetch<T> = ({ fetcher, parser }: FetchProps<T>) => Promise<void>;

const parseJsonResponse = (response: Response): Promise<JSON> => {
  if (response.ok) return response.json();
  throw new Error(response.statusText);
};

export const fetch = <T>(
  dispatch: (action: FetchAction<T>) => void
): Fetch<T> => ({ fetcher, parser }) => {
  dispatch(startFetch());

  return fetcher()
    .then(parseJsonResponse)
    .then((json: JSON) => dispatch(completeFetch<T>(parser(json))))
    .catch(() => dispatch(errorFetch()));
};

const useFetch = <T>(): [FetchState<T>, Fetch<T>] => {
  const [state, dispatch] = useReducer(
    createFetchReducer<T>(),
    createInitialState<T>()
  );

  return [state, fetch<T>(dispatch)];
};

export default useFetch;
