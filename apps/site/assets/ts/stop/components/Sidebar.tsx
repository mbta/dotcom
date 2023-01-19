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
import ExternalRiptaConnection from "./ExternalRiptaConnection";

interface Props {
  dispatch: Dispatch;
  expandedBlocks: ExpandableBlockState;
  focusedBlock?: ExpandableBlockName;
  stop: Stop;
  routes: TypedRoutes[];
  retailLocations: RetailLocationWithDistance[];
}

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
      <ExternalRiptaConnection routes={routes} />
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
