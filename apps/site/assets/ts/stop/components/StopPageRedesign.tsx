import React, { ReactElement } from "react";
import useStop from "../../hooks/useStop";
import StationInformation from "./StationInformation";
import StopMapRedesign from "./StopMapRedesign";
import { useRoutesByStop } from "../../hooks/useRoute";
import StopPageHeaderRedesign from "./StopPageHeaderRedesign";
import Loading from "../../components/Loading";
import StopPageDepartures from "./StopPageDepartures";
import { isASilverLineRoute } from "../../models/route";

const StopPageRedesign = ({
  stopId
}: {
  stopId: string;
}): ReactElement<HTMLElement> => {
  const stop = useStop(stopId);
  const routesWithPolylines = useRoutesByStop(stopId);
  // Return loading indicator while waiting on data fetch
  if (!stop || !routesWithPolylines) {
    return <Loading />;
  }
  const routes = routesWithPolylines.map(([route]) => route);
  const polylines = routesWithPolylines
    .filter(
      ([route]) => [0, 1, 2].includes(route.type) || isASilverLineRoute(route)
    )
    .flatMap(([, polyline]) => polyline);

  return (
    <article>
      <StopPageHeaderRedesign stop={stop} routes={routes} />
      {/* Route and Map Div */}
      <div className="container">
        <div className="stop-routes-and-map">
          <StopPageDepartures routes={routes} stop={stop} />
          <StopMapRedesign stop={stop} lines={polylines} />
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
