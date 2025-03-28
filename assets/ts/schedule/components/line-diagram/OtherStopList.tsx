import React, { ReactElement } from "react";
import { RouteStop, StopTree } from "../__schedule";
import StopCard from "./StopCard";
import { Alert } from "../../../__v3api";

interface Props {
  alerts: Alert[];
  handleStopClick: (stop: RouteStop) => void;
  otherRouteStops: RouteStop[];
  searchQuery?: string;
  stopTree: StopTree | null;
}

const stopCountWords = (stopCount: number): string =>
  stopCount === 1 ? `1 Stop` : `${stopCount} Stops`;

const OtherStopList = ({
  alerts,
  handleStopClick,
  otherRouteStops,
  searchQuery,
  stopTree
}: Props): ReactElement<HTMLElement> | null =>
  (otherRouteStops.length > 0 && (
    <details className="group/other-stops">
      <summary className="flex justify-between w-full bg-charcoal-90 border-x-[1px] border-b-[1px] group-open/other-stops:border-b-0 border-charcoal-80 cursor-pointer p-3 font-medium">
        <span>
          {stopCountWords(otherRouteStops.length)} Served By Other Trips On This
          Route
        </span>
        <span className="text-brand-primary group-open/other-stops:hidden">
          Show
        </span>
        <span className="text-brand-primary hidden group-open/other-stops:inline">
          Hide
        </span>
      </summary>
      <ul className="list-unstyled p-0 m-0">
        {otherRouteStops.map(stop => (
          <StopCard
            alerts={alerts}
            forceShowSchedule
            key={stop.id}
            noLineDiagram
            onClick={handleStopClick}
            routeStopList={otherRouteStops}
            searchQuery={searchQuery}
            stopId={stop.id}
            stopTree={stopTree}
          />
        ))}
      </ul>
    </details>
  )) ||
  null;

export default OtherStopList;
