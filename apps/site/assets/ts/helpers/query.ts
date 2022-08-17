export interface QueryParams {
  [key: string]: string;
}

export const paramsToString = (params: QueryParams): string => {
  const p = new URLSearchParams("");
  Object.entries(params).forEach(([key, value]) => {
    p.set(key, value);
  });
  return params ? `?${p.toString()}` : "";
};

export const parseQuery = (query: string): QueryParams => {
  const p = new URLSearchParams(query);

  const allParams: QueryParams = {};
  p.forEach((value, key) => {
    allParams[key] = value;
  });

  return allParams;
};
