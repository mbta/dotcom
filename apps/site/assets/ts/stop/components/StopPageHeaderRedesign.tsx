import React, { ReactElement } from "react";
import { Stop } from "../../__v3api";
import { TypedRoutes } from "./__stop";
import StopFeatures from "./StopFeatures";
import { typedRoutesHasBusRoute } from "../../helpers/routes";

const StopPageHeaderRedesign = ({
  stop,
  typedRoutes
}: {
  stop: Stop | undefined;
  typedRoutes: TypedRoutes[] | undefined;
}): ReactElement<HTMLElement> => {
  return (
    <div className="u-bg--gray-bordered-background">
      <header className="d-flex justify-content-space-between container">
        <div className="d-flex">
          <h3>{stop && stop.name}</h3>
          <div className="ps-16 mt-12">
            {stop && typedRoutes && (
              <StopFeatures stop={stop} typedRoutes={typedRoutes} />
            )}
          </div>
        </div>
        <div className="mt-20">
          {stop &&
            typedRoutes &&
            typedRoutesHasBusRoute(typedRoutes) &&
            `Stop ${stop.id}`}
        </div>
      </header>
    </div>
  );
};

export default StopPageHeaderRedesign;
