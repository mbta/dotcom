import { useCallback, useMemo } from "react";
import { isNil, some } from "lodash";
import { useSearchParams } from "react-router-dom";
import { DirectionId, Route } from "../__v3api";

type DepartureRow = {
  route: Route;
  directionId: DirectionId;
  headsign: string;
};

// Search params in URLs are always strings!
type DepartureRowSearchParams = {
  routeId: string;
  directionId: string;
  headsign: string;
};

const getRowParams = (
  params: URLSearchParams
): Record<string, string | null> => {
  const routeId = params.get("route");
  const directionId = params.get("direction_id");
  const headsign = params.get("headsign");
  return { routeId, directionId, headsign };
};

const resetRowParams = (
  params: URLSearchParams,
  newParams: Record<string, string | null>
): URLSearchParams => {
  const { routeId, directionId, headsign } = newParams;
  Object.entries({
    route: routeId,
    direction_id: directionId,
    headsign
  }).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
  });
  return params;
};

/**
 * Coordinates toggling the active departure row with the corresponding URL
 * search parameters, in the format of
 * ?route=`<routeId>`&direction_id=`<directionId>`&headsign=`<headsign>`. Needs
 * to be called from within React Router's `<RouterProvider>` to work with URL
 * search parameters correctly.
 */
const useDepartureRow = (
  routes: Route[]
): {
  activeRow: DepartureRow | null;
  resetRow: () => void;
  setRow: (filters: DepartureRowSearchParams) => void;
} => {
  const [params, setSearchParams] = useSearchParams();

  const activeRow = useMemo(() => {
    const { routeId, directionId, headsign } = getRowParams(params);
    const matchedRoute = routes.find(r => r.id === routeId);
    if (
      some([routeId, directionId, headsign], isNil) ||
      !matchedRoute ||
      !(directionId! in ["0", "1"])
    ) {
      return null;
    }

    // will mislead when headsign doesn't match to any existing data
    return {
      route: matchedRoute,
      directionId: +directionId!,
      headsign
    } as DepartureRow;
  }, [params, routes]);

  const resetRow = useCallback((): void => {
    const newParams = resetRowParams(params, {
      route: null,
      direction_id: null,
      headsign: null
    });
    setSearchParams(newParams);
  }, [params, setSearchParams]);

  const setRow = (newValues: DepartureRowSearchParams): void => {
    const newParams = resetRowParams(params, newValues);
    setSearchParams(newParams);
  };

  return { activeRow, resetRow, setRow };
};

export default useDepartureRow;
