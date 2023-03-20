import React, { ReactElement } from "react";
import { Route, Stop } from "../../__v3api";
import { StopFeatures } from "./icons/StopFeatures";
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
      {/* Including `container` on the header class causes some weird
          interactions with the stop.id and justify content
          Added to a separate dive to get the desired behavior
       */}
      <div className="container">
        <header
          className="d-flex justify-content-space-between"
          style={{ alignItems: "center" }}
        >
          <div className="d-flex">
            <h1 className="stop-page__header--fontsize mt-16">{stop.name}</h1>
          </div>
          <div>
            <div className="mt-8">
              <StopFeatures stop={stop} routes={routes} />
            </div>
            <div className="mt-n20 pb-8">
              {!isStopAStation(stop) && `Stop ${stop.id}`}
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export { StopPageHeaderRedesign };
