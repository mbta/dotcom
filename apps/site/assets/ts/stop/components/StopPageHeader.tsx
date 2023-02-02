import React, { ReactElement } from "react";
import { StopPageData } from "./__stop";
import BreadcrumbContainer from "./BreadcrumbContainer";
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
  <>
    <BreadcrumbContainer stop={stop} />
    <Header
      dispatch={dispatch}
      stop={stop}
      routes={routes}
      zoneNumber={zoneNumber}
      tabs={tabs}
      selectedTab={selectedTab}
    />
  </>
);

export default StopPageHeader;
