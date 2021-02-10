import React, { ReactElement } from "react";
import { Mode } from "../../__v3api";
import { StopWithRoutes } from "./__tnm";
import { Dispatch } from "../state";
import SidebarTitle from "./SidebarTitle";
import StopWithRoutesCard from "./StopWithRoutesCard";
import ModeFilterContainer from "./ModeFilterContainer";
import stopIncludesModes from "../helpers/stop-includes-modes";

interface Props {
  data: StopWithRoutes[];
  dispatch: Dispatch;
  selectedStopId: string | null;
  shouldFilterStopCards: boolean;
  selectedModes: Mode[];
  emptyMessage: ReactElement<HTMLElement>;
}

interface FilterOptions {
  stopId: string | null;
  modes: Mode[];
}

const filterDataByStopId = (
  data: StopWithRoutes[],
  { stopId }: FilterOptions
): StopWithRoutes[] => {
  if (stopId === null) {
    return data;
  }
  const stopWithRoutes = data.find(d => d.stop.id === stopId);
  return stopWithRoutes ? [stopWithRoutes] : data;
};

const filterDataByModes = (
  data: StopWithRoutes[],
  { modes }: FilterOptions
): StopWithRoutes[] => data.filter(stop => stopIncludesModes(stop, modes));

export const filterData = (
  data: StopWithRoutes[],
  selectedStopId: string | null,
  selectedModes: Mode[],
  shouldFilter: boolean
): StopWithRoutes[] => {
  if (shouldFilter === false) {
    return data;
  }

  const options: FilterOptions = {
    stopId: selectedStopId,
    modes: selectedModes
  };

  return [filterDataByStopId, filterDataByModes].reduce(
    (accumulator, fn) => fn(accumulator, options),
    data
  );
};

const StopsSidebar = ({
  dispatch,
  data,
  selectedStopId,
  selectedModes,
  shouldFilterStopCards,
  emptyMessage
}: Props): ReactElement<HTMLElement> => {
  const filteredData = filterData(
    data,
    selectedStopId,
    selectedModes,
    shouldFilterStopCards
  );
  return (
    <div className="m-tnm-sidebar" id="tnm-sidebar-by-stops">
      <div className="m-tnm-sidebar__fixed-header">
        <div className="m-tnm-sidebar__fixed-header-inner">
          <ModeFilterContainer
            selectedModes={selectedModes}
            dispatch={dispatch}
          />
        </div>
      </div>
      <div className="m-tnm-sidebar__inner">
        <SidebarTitle dispatch={dispatch} viewType="Stops" />
        <div className="m-tnm-sidebar__cards">
          {filteredData.length > 0
            ? filteredData.map(({ stop, routes, distance }) => (
                <StopWithRoutesCard
                  key={stop.id}
                  stop={stop}
                  routes={routes}
                  dispatch={dispatch}
                  distance={distance}
                />
              ))
            : emptyMessage}
        </div>
      </div>
    </div>
  );
};

export default StopsSidebar;
