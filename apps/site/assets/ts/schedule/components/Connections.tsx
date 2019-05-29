import React, { ReactElement } from "react";
import ExpandableBlock from "../../components/ExpandableBlock";
import RoutePillList from "../../stop/components/RoutePillList";
import { TypedRoutes } from "../../stop/components/__stop";

interface Props {
  connections: TypedRoutes[];
}

const Connections = ({
  connections
}: Props): ReactElement<HTMLDivElement> | null =>
  connections.length ? (
    <ExpandableBlock
      header={{ text: "Connections", iconSvgText: null }}
      initiallyExpanded={false}
      id="connections"
    >
      <RoutePillList routes={connections} showGroupName />
    </ExpandableBlock>
  ) : null;

export default Connections;
