export const isFetchFailed = <T>(r: FetchResult<T>): r is FetchFailed =>
  typeof r === "object" && "statusText" in r;

export const throwIfFetchFailed = <T>(result: FetchResult<T>): T => {
  if (isFetchFailed(result)) {
    throw new Error(`Fetch failed: ${result}`);
  }

  return result;
};

export type FetchFailed = Response;
export type FetchResult<T> = T | FetchFailed;
export const fetchJson = async <T>(
  ...args: Parameters<typeof fetch>
): Promise<FetchResult<T>> => {
  const resp = await fetch(...args);
  if (!resp.ok) {
    return resp;
  }

  return resp.json();
};

export const fetchJsonOrThrow = async <T>(
  ...args: Parameters<typeof fetch>
): Promise<T> => fetchJson<T>(...args).then(throwIfFetchFailed);
