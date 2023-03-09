import React, { ReactElement } from "react";
import { Stop } from "../../__v3api";
import TabComponent from "./Tab";
import { Tab, TypedRoutes } from "./__stop";
import { Dispatch } from "../state";
import GlxOpen from "../../components/GlxOpen";
import { typedRoutesHasBusRoute } from "../../helpers/routes";
import useIsGlxOpen from "../../hooks/useIsGlxOpen";
import StopAccessibilityIcon from "./StopAccessibilityIcon";
import ModeIcons from "./ModeIcons";
import CommuterRailZoneIcon from "./CommuterRailZoneIcon";
import ParkingIcon from "./ParkingIcon";

interface Props {
  stop: Stop;
  routes: TypedRoutes[];
  tabs: Tab[];
  zoneNumber: string;
  dispatch: Dispatch | undefined;
  selectedTab: string;
}

const features = (
  stop: Stop,
  routes: TypedRoutes[],
  zoneNumber: string,
  dispatch: Dispatch
): ReactElement<HTMLElement> => (
  <div className="m-stop-page__header-features">
    <ModeIcons typedRoutes={routes} dispatch={dispatch} />
    <CommuterRailZoneIcon zoneNumber={zoneNumber} dispatch={dispatch} />
    <StopAccessibilityIcon
      stop={stop}
      isBusStop={typedRoutesHasBusRoute(routes)}
      dispatch={dispatch}
    />
    <ParkingIcon stop={stop} dispatch={dispatch} />
  </div>
);

const nameUpcaseClass = (routes: TypedRoutes[]): string =>
  routes.length === 1 && routes[0].group_name === "bus"
    ? ""
    : "m-stop-page__name--upcase";

const Header = ({
  stop,
  routes,
  tabs,
  zoneNumber,
  dispatch,
  selectedTab
}: Props): ReactElement<HTMLElement> => {
  const emptyFunc = (): void => {};
  const dispatchOrEmptyFunc = dispatch || emptyFunc;
  const isGlxOpen = useIsGlxOpen(stop.id)[0];
  return (
    <div className={`m-stop-page__header${isGlxOpen ? " glx-open" : ""}`}>
      <div className="m-stop-page__header-container">
        <GlxOpen pageType="station-page" stopId={stop.id} />
        <h1 className={`m-stop-page__name ${nameUpcaseClass(routes)}`}>
          {stop.name}
        </h1>

        {features(stop, routes, zoneNumber, dispatchOrEmptyFunc)}

        <div className="header-tabs">
          {tabs.map(tab => (
            <TabComponent
              selected={selectedTab === tab.id}
              dispatch={dispatchOrEmptyFunc}
              key={tab.id}
              tab={tab}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export { features, Header as default };
