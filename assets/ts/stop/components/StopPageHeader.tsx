import React, { ReactElement } from "react";
import { Route, Stop } from "../../__v3api";
import StopFeatures from "./icons/StopFeatures";
import { isStopAStation } from "../../helpers/stops";

const StopPageHeader = ({
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
            <h1 className="stop-page__header--fontsize u-mt-8">{stop.name}</h1>
          </div>
          <div>
            <div className="u-mt-8 d-flex justify-content-end">
              <StopFeatures stop={stop} routes={routes} />
            </div>
            <div
              className="u-mt-n8 u-pb-8 fs-14 u-nowrap"
              style={{ float: "right" }}
            >
              {!isStopAStation(stop) && `Stop ${stop.id}`}
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default StopPageHeader;
