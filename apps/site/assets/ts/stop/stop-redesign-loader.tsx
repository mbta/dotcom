import React from "react";
import ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider
} from "react-router-dom";
import { ErrorBoundary } from "@sentry/react";
import StopPageRedesign from "./components/StopPageRedesign";
import Loading from "../components/Loading";
import ErrorPage from "../components/ErrorPage";
import { RoutePattern } from "../__v3api";
import { fetchJson, isFetchFailed } from "../helpers/fetch-json";
import { Polyline } from "../leaflet/components/__mapdata";

export interface RoutePatternWithPolyline
  extends Omit<RoutePattern, "representative_trip_polyline"> {
  representative_trip_polyline: Polyline;
}
export type GroupedRoutePatterns = Record<
  string,
  Record<string, RoutePatternWithPolyline[]>
>;

const fetchStopRoutePatterns = async (
  stopId: string
): Promise<GroupedRoutePatterns | null> => {
  const data = await fetchJson<GroupedRoutePatterns>(
    `/api/stop/${stopId}/route-patterns`
  );
  if (isFetchFailed(data)) {
    // eslint-disable-next-line no-console
    console.error(
      `Failed to fetch route pattern information: ${data.status} ${data.statusText}`
    );
    return null;
  }
  return data;
};

const routesConfig = (stopId: string): RouteObject[] => [
  {
    path: "/stops/:stopId",
    loader: () => fetchStopRoutePatterns(stopId),
    shouldRevalidate: () => false,
    element: (
      <ErrorBoundary fallback={ErrorPage}>
        <StopPageRedesign stopId={stopId} />
      </ErrorBoundary>
    ),
    hasErrorBoundary: true
  }
];

const render = (): void => {
  const rootEl = document.getElementById("react-stop-redesign-root");
  const stopId = rootEl?.dataset.mbtaStopId;
  if (!stopId) return;

  ReactDOM.render(
    <RouterProvider
      router={createBrowserRouter(routesConfig(stopId))}
      fallbackElement={<Loading />}
    />,
    rootEl
  );
};

export const onLoad = (): void => {
  render();
};

export default onLoad;
