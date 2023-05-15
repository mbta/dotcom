import React, { ReactElement } from "react";
import { chain, omit } from "lodash";
import useStop from "../../hooks/useStop";
import StationInformation from "./StationInformation";
import StopMapRedesign from "./StopMapRedesign";
import { useRoutesByStop } from "../../hooks/useRoute";
import StopPageHeaderRedesign from "./StopPageHeaderRedesign";
import Loading from "../../components/Loading";
import StopPageDepartures from "./StopPageDepartures";
import Alerts from "../../components/Alerts";
import { Route } from "../../__v3api";
import { useSchedulesByStop } from "../../hooks/useSchedules";
import { useAlertsByStop } from "../../hooks/useAlerts";
import DeparturesAndMap from "./DeparturesAndMap";

const StopPageRedesign = ({
  stopId
}: {
  stopId: string;
}): ReactElement<HTMLElement> => {
  const stop = useStop(stopId);
  const routesWithPolylines = useRoutesByStop(stopId);
  // TODO maybe move to the StopDeparturesPage (or keep it here for loading indicator)
  const schedules = useSchedulesByStop(stopId);
  const alerts = useAlertsByStop(stopId);
  //

  // Return loading indicator while waiting on data fetch
  if (!stop || !routesWithPolylines || !schedules || !alerts) {
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
        <Alerts alerts={alerts} />
        <DeparturesAndMap
          routes={routes}
          stop={stop}
          schedules={schedules}
          lines={polylines}
        />
        <footer>
          <StationInformation stop={stop} />
        </footer>
      </div>
    </article>
  );
};

export default StopPageRedesign;
