import React, { ReactElement } from "react";
import { Stop, EnhancedRoute } from "../../__v3api";
import TabComponent from "./Tab";
import { Tab, TypedRoutes, RouteWithDirections } from "./__stop";
import { parkingIcon, modeIcon } from "../../helpers/icon";
import { isASilverLineRoute } from "../../models/route";
import accessible from "./StopAccessibilityIcon";
import {
  Dispatch,
  clickRoutePillAction,
  clickFeaturePillAction
} from "../state";
import { modeByV3ModeType } from "../../components/ModeFilter";
import GlxOpen from "../../components/GlxOpen";
import { typedRoutesHasBusRoute } from "../../helpers/routes";
import useIsGlxOpen from "../../hooks/useIsGlxOpen";

interface Props {
  stop: Stop;
  routes: TypedRoutes[];
  tabs: Tab[];
  zoneNumber: string;
  dispatch: Dispatch | undefined;
  selectedTab: string;
}

const subwayModeIds = [
  "Blue",
  "Green",
  "Green-B",
  "Green-C",
  "Green-D",
  "Green-E",
  "Mattapan",
  "Orange",
  "Red"
];

const parking = (
  { parking_lots: parkingLots }: Stop,
  dispatch?: Dispatch
): ReactElement<HTMLElement> | false =>
  parkingLots.length > 0 && (
    <a
      className="m-stop-page__header-feature"
      href="#header-parking"
      onClick={() => dispatch && dispatch(clickFeaturePillAction("parking"))}
    >
      <span className="m-stop-page__icon">
        {parkingIcon("u-color-gray-light")}
      </span>
    </a>
  );

const modeType = (modeId: string): string => {
  if (modeId.startsWith("CR-")) return "CR";

  if (subwayModeIds.includes(modeId)) return modeId;

  return "Bus";
};

const modeIconFeature = (
  { id, type }: EnhancedRoute,
  dispatch: Dispatch
): ReactElement<HTMLElement> => (
  <a
    href="#route-card-list"
    onClick={() => dispatch(clickRoutePillAction(modeByV3ModeType[type]))}
    key={modeType(id)}
    className="m-stop-page__header-feature"
  >
    <span className="m-stop-page__icon">{modeIcon(id)}</span>
  </a>
);

interface BusRoutesAcc {
  bus: RouteWithDirections[];
  silverLine: RouteWithDirections[];
}

const doSplitSilverLine = (
  acc: BusRoutesAcc,
  route: RouteWithDirections
): BusRoutesAcc =>
  isASilverLineRoute(route.route.id)
    ? { ...acc, silverLine: acc.silverLine.concat([route]) }
    : { ...acc, bus: acc.bus.concat([route]) };

const splitSilverLine = (
  routes: RouteWithDirections[]
): RouteWithDirections[] => {
  const acc: BusRoutesAcc = { bus: [], silverLine: [] };
  const { bus, silverLine } = routes.reduce(doSplitSilverLine, acc);
  return bus.slice(0, 1).concat(silverLine.slice(0, 1));
};

const iconableRoutesForType = ({
  // eslint-disable-next-line camelcase
  group_name,
  routes
}: TypedRoutes): RouteWithDirections[] => {
  // eslint-disable-next-line camelcase
  if (group_name === "subway") return routes;

  // eslint-disable-next-line camelcase
  if (group_name === "bus") return splitSilverLine(routes);

  return routes.length ? [routes[0]] : [];
};

const iconableRoutes = (typedRoutes: TypedRoutes[]): RouteWithDirections[] =>
  typedRoutes.reduce(
    (acc: RouteWithDirections[], typeAndRoutes: TypedRoutes) =>
      acc.concat(iconableRoutesForType(typeAndRoutes)),
    []
  );

const modes = (
  typedRoutes: TypedRoutes[],
  dispatch: Dispatch
): ReactElement<HTMLElement> | null => (
  <>
    {iconableRoutes(typedRoutes).map(({ route }) =>
      modeIconFeature(route, dispatch)
    )}
  </>
);

const crZone = (
  zoneNumber: string,
  dispatch: Dispatch
): ReactElement<HTMLElement> | false =>
  !!zoneNumber &&
  zoneNumber.length > 0 && (
    <a
      href="#route-card-list"
      onClick={() => dispatch(clickRoutePillAction("commuter_rail"))}
      className="m-stop-page__header-feature"
    >
      <span className="m-stop-page__icon c-icon__cr-zone">
        {`Zone ${zoneNumber}`}
      </span>
    </a>
  );

const features = (
  stop: Stop,
  routes: TypedRoutes[],
  zoneNumber: string,
  dispatch: Dispatch
): ReactElement<HTMLElement> => (
  <div className="m-stop-page__header-features">
    {modes(routes, dispatch)}
    {crZone(zoneNumber, dispatch)}
    {accessible(stop, typedRoutesHasBusRoute(routes), dispatch)}
    {parking(stop, dispatch)}
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

export default Header;
