import React, { ReactElement } from "react";
import { Route, Stop } from "../../__v3api";
import { StopFeatures } from "./icons/StopFeatures";
import { routesHasBusRoute } from "../../helpers/routes";
import { isStopAStation } from "../../helpers/stops";

const StopPageHeaderRedesign = ({
  stop,
  routes
}: {
  stop: Stop;
  routes: Route[];
}): ReactElement<HTMLElement> => {
  return (
    <div className="u-bg--gray-bordered-background">
      <header
        className="d-flex justify-content-space-between container"
        style={{ alignItems: "center" }}
      >
        <div className="d-flex">
          <h3>{stop.name}</h3>
          <div className="ps-16 mt-12">
            <StopFeatures stop={stop} routes={routes} />
          </div>
        </div>
        <div>
          {routesHasBusRoute(routes) &&
            !isStopAStation(stop) &&
            `Stop ${stop.id}`}
        </div>
      </header>
    </div>
  );
};

export { StopPageHeaderRedesign };
