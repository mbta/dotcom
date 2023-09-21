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

const routesConfig = (stopId: string): RouteObject[] => [
  {
    path: "/stops/:stopId",
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
