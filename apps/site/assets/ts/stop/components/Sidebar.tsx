import React, { ReactElement } from "react";
import RoutePillList from "./RoutePillList";
import Accessibility from "./sidebar/Accessibility";
import Parking from "./sidebar/Parking";
import BikeStorage from "./sidebar/BikeStorage";
import Fares from "./sidebar/Fares";
import { Stop } from "../../__v3api";
import { TypedRoutes, RetailLocationWithDistance } from "./__stop";
import Feedback from "../../components/Feedback";
import { Dispatch, ExpandableBlockState, ExpandableBlockName } from "../state";
import PillLink from "./PillLink";

interface Props {
  dispatch: Dispatch;
  expandedBlocks: ExpandableBlockState;
  focusedBlock?: ExpandableBlockName;
  stop: Stop;
  routes: TypedRoutes[];
  retailLocations: RetailLocationWithDistance[];
}

const riptaRouteIDs = ["CR-Providence"];

// used to display the external link to the ripta website
const containsRIPTARoute = (routes: TypedRoutes[]): boolean => {
  return routes.some(route => {
    return route.routes.some(route2 => {
      return riptaRouteIDs.includes(route2.route.id);
    });
  });
};

const Sidebar = ({
  dispatch,
  expandedBlocks,
  focusedBlock,
  stop,
  routes,
  retailLocations
}: Props): ReactElement<HTMLElement> => (
  <>
    <div className="m-stop-page__sidebar-pills">
      <RoutePillList routes={routes} />
      {containsRIPTARoute(routes) && (
        <div className="mt-16">
          <div className="u-bold">EXTERNAL CONNECTIONS</div>
          <div className="m-route-pills">
            <PillLink
              displayText="RIPTA"
              linkText="https://www.ripta.com/"
              backgroundColor="gray"
              externalLink
            />
          </div>
        </div>
      )}
    </div>
    <h2>Features</h2>
    <Accessibility
      stop={stop}
      routes={routes}
      dispatch={dispatch}
      isExpanded={expandedBlocks.accessibility}
      isFocused={focusedBlock === "accessibility"}
    />
    <Parking
      stop={stop}
      dispatch={dispatch}
      isExpanded={expandedBlocks.parking}
      isFocused={focusedBlock === "parking"}
    />
    <BikeStorage stop={stop} />
    <Fares stop={stop} retailLocations={retailLocations} />
    <Feedback />
  </>
);

export default Sidebar;
