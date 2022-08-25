export const isFetchError = <T>(r: FetchResult<T>): r is FetchError =>
  typeof r === "object" && "statusText" in r;

export const throwIfFetchFailed = <T>(result: FetchResult<T>) => {
  if (isFetchError(result)) {
    throw new Error(`Fetch failed: ${result}`);
  }

  return result;
};

export type FetchError = { status: number; statusText: string };
export type FetchResult<T> = T | FetchError;
export const fetchJson = async <T>(
  ...args: Parameters<typeof fetch>
): Promise<FetchResult<T>> => {
  const resp = await fetch(...args);
  if (resp.status != 200) {
    return resp;
  }

  return resp.json();
};
