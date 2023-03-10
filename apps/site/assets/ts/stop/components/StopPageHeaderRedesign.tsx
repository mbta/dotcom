import React, { ReactElement } from "react";
import { Route, Stop } from "../../__v3api";
import StopFeatures from "./StopFeatures";
import { routesHasBusRoute } from "../../helpers/routes";

const StopPageHeaderRedesign = ({
  stop,
  routes
}: {
  stop: Stop | undefined;
  routes: Route[] | undefined;
}): ReactElement<HTMLElement> => {
  return (
    <div className="u-bg--gray-bordered-background">
      <header className="d-flex justify-content-space-between container">
        <div className="d-flex">
          <h3>{stop && stop.name}</h3>
          <div className="ps-16 mt-12">
            {stop && routes && <StopFeatures stop={stop} routes={routes} />}
          </div>
        </div>
        <div className="mt-20">
          {stop && routes && routesHasBusRoute(routes) && `Stop ${stop.id}`}
        </div>
      </header>
    </div>
  );
};

export default StopPageHeaderRedesign;
