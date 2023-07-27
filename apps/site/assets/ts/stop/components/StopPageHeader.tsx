import React, { ReactElement } from "react";
import { StopPageData } from "./__stop";
import Header from "./Header";
import { Dispatch } from "../state";

interface Props {
  stopPageData: StopPageData;
  selectedTab: string;
  dispatch: Dispatch;
}

const StopPageHeader = ({
  stopPageData: { stop, routes, tabs, zone_number: zoneNumber },
  selectedTab,
  dispatch
}: Props): ReactElement<HTMLElement> => (
  <Header
    dispatch={dispatch}
    stop={stop}
    routes={routes}
    zoneNumber={zoneNumber}
    tabs={tabs}
    selectedTab={selectedTab}
  />
);

export default StopPageHeader;
