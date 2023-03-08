import React, { ReactElement } from "react";
import { features } from "./Header";
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
          <div className="ps-16 mt-20">
            {stop && typedRoutes && (
              <StopFeatures stop={stop} typedRoutes={typedRoutes} />
            )}
          </div>
        </div>
        <div className="mt-20">
          {/* Should show stop number for bus stops, blank at all other stop types */}
          {stop &&
            typedRoutes &&
            typedRoutesHasBusRoute(typedRoutes) &&
            "Stop 1234 Placeholder"}
        </div>
      </header>
    </div>
  );
};

export default StopPageHeaderRedesign;
