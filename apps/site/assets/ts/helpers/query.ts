export interface QueryParams {
  [key: string]: string;
}

// The encoder/decoder functions must be injected
// because this helper is used by some vanilla JS files,
// and MochaJS insists that the window object does not
// include encodeURIComponent or decodeURIComponent,
// which causes a compiler error. If/when there are
// no more JS modules using these helpers, the
// injections should be removed.
type EncoderDecoder = (str: string) => string;

export const paramsToString = (
  params: QueryParams,
  encoder: EncoderDecoder
): string => {
  if (!params || Object.keys(params).length === 0) {
    return "";
  }

  return `?${Object.keys(params)
    .map(key => `${key}=${encoder(params[key])}`)
    .join("&")}`;
};

type QueryReducer = (params: QueryParams, kvString: string) => QueryParams;

const queryReducer = (decoder: EncoderDecoder): QueryReducer => (
  params: QueryParams,
  kvString: string
) => {
  const [key, val] = kvString.split("=");
  return { ...params, [decoder(key)]: decoder(val.replace(/\+/g, " ")) };
};

export const parseQuery = (
  query: string,
  decoder: EncoderDecoder
): QueryParams =>
  query
    ? query
        .substring(1)
        .split("&")
        .reduce(queryReducer(decoder), {})
    : {};
