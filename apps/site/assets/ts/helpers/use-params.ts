/**
 * Basically replacement for use-query-params, query-param, similar packages
 */

export const getParam = (key: string): string | null => {
  const params = new URLSearchParams(window?.location.search ?? undefined);
  return params.get(key);
};

export const updateParams = (
  updatedParams: Record<string, string | null>
): void => {
  const params = new URLSearchParams(window?.location.search ?? undefined);
  Object.entries(updatedParams).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
  });

  window?.history.replaceState(
    {},
    "",
    `${window.location.pathname}?${params.toString()}`
  );
};

export default {
  getParam,
  updateParams
};
