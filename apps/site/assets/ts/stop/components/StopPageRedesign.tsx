import React, { ReactElement } from "react";
import useStop from "../../hooks/useStop";
import StationInformation from "./StationInformation";
import StopMapRedesign from "./StopMapRedesign";
import { useRoutesByStop } from "../../hooks/useRoute";
import StopPageHeaderRedesign from "./StopPageHeaderRedesign";
import Loading from "../../components/Loading";
import StopPageDepartures from "./StopPageDepartures";
import useAlertsForStop from "../../hooks/useAlertsForStop";
import Alerts from "../../components/Alerts";

const StopPageRedesign = ({
  stopId
}: {
  stopId: string;
}): ReactElement<HTMLElement> => {
  const stop = useStop(stopId);
  const routes = useRoutesByStop(stopId);
  const alerts = useAlertsForStop(stopId);

  // Return loading indicator while waiting on data fetch
  if (!stop || !routes) {
    return <Loading />;
  }

  return (
    <article>
      <StopPageHeaderRedesign stop={stop} routes={routes} />
      {/* Route and Map Div */}
      <div className="container">
        <Alerts alerts={alerts || []} />
        <div className="stop-routes-and-map">
          <StopPageDepartures routes={routes} stop={stop} />
          <StopMapRedesign stop={stop} />
        </div>
        {/* Station Information Div */}
        <footer>
          <StationInformation stop={stop} />
        </footer>
      </div>
    </article>
  );
};

export default StopPageRedesign;
