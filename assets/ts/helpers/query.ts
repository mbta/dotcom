export interface QueryParams {
  [key: string]: string;
}

// The decoder function must be injected
// because this helper is used by some vanilla JS files,
// and MochaJS insists that the window object does not
// include decodeURIComponent,
// which causes a compiler error. If/when there are
// no more JS modules using these helpers, the
// injection should be removed.
type Decoder = (str: string) => string;

type QueryReducer = (params: QueryParams, kvString: string) => QueryParams;

const queryReducer = (decoder: Decoder): QueryReducer => (
  params: QueryParams,
  kvString: string
) => {
  const [key, val] = kvString.split("=");

  if (key === "") {
    return params;
  }

  if (val === undefined) {
    return { ...params, [decoder(key)]: val };
  }

  return { ...params, [decoder(key)]: decoder(val.replace(/\+/g, " ")) };
};

export const parseQuery = (query: string, decoder: Decoder): QueryParams =>
  query
    ? query
        .substring(1)
        .split("&")
        .reduce(queryReducer(decoder), {})
    : {};
