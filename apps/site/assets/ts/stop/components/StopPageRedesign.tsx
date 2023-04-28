import React, { ReactElement } from "react";
import { chain, omit } from "lodash";
import useStop from "../../hooks/useStop";
import StationInformation from "./StationInformation";
import StopMapRedesign from "./StopMapRedesign";
import { useRoutesByStop } from "../../hooks/useRoute";
import StopPageHeaderRedesign from "./StopPageHeaderRedesign";
import Loading from "../../components/Loading";
import StopPageDepartures from "./StopPageDepartures";
import useAlertsForStop from "../../hooks/useAlertsForStop";
import Alerts from "../../components/Alerts";
import { Route } from "../../__v3api";

const StopPageRedesign = ({
  stopId
}: {
  stopId: string;
}): ReactElement<HTMLElement> => {
  const stop = useStop(stopId);
  const routesWithPolylines = useRoutesByStop(stopId);
  const alerts = useAlertsForStop(stopId);
  // Return loading indicator while waiting on data fetch
  if (!stop || !routesWithPolylines) {
    return <Loading />;
  }
  const routes: Route[] = routesWithPolylines.map(rwp =>
    omit(rwp, "polylines")
  );
  const polylines = chain(routesWithPolylines)
    .orderBy("sort_order", "desc")
    .flatMap("polylines")
    .uniqBy("id")
    .value();

  return (
    <article>
      <StopPageHeaderRedesign stop={stop} routes={routes} />
      <div className="container">
        <Alerts alerts={alerts || []} />
        <div className="stop-routes-and-map">
          <StopPageDepartures routes={routes} stop={stop} />
          <StopMapRedesign stop={stop} lines={polylines} />
        </div>
        <footer>
          <StationInformation stop={stop} />
        </footer>
      </div>
    </article>
  );
};

export default StopPageRedesign;
