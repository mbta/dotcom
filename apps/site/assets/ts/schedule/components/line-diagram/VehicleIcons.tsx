import React from "react";
import { renderToString } from "react-dom/server";
import { useSelector } from "react-redux";
import { RouteStop, LineDiagramVehicle } from "../__schedule";
import CrowdingPill from "./CrowdingPill";
import { TooltipWrapper, vehicleArrowIcon } from "../../../helpers/icon";
import { StopCoord, CoordState, CIRC_RADIUS } from "./graphics/graphic-helpers";

interface VehicleIconsProps {
  stop: RouteStop;
  vehicles: LineDiagramVehicle[] | null;
}

const CrowdingIconString = (vehicle: LineDiagramVehicle): string =>
  renderToString(<CrowdingPill crowding={vehicle.crowding} />);

const VehicleIcons = ({
  stop,
  vehicles
}: VehicleIconsProps): JSX.Element | null => {
  const coords: StopCoord | null = useSelector(
    (state: CoordState) => state[stop.id]
  );
  if (!vehicles || !coords) return null;
  const [x, y] = coords;
  const left = `${x - CIRC_RADIUS}px`;
  const tooltips = vehicles.map(vehicle => {
    const top = `${{
      // eslint-disable-next-line camelcase
      in_transit: y - 50,
      incoming: y - 25,
      stopped: y - 10
    }[vehicle.status] || y}px`;

    return (
      <div
        key={vehicle.id}
        className="m-schedule-diagram__vehicle"
        style={{ top, left }}
      >
        <TooltipWrapper
          tooltipText={`<div class="m-schedule-diagram__vehicle-tooltip">${
            vehicle.crowding ? `${CrowdingIconString(vehicle)}<br/>` : ""
          }${vehicle.tooltip}</div>`}
          tooltipOptions={{ placement: "right", animation: false, html: true }}
        >
          {vehicleArrowIcon("m-schedule-diagram__vehicle--icon")}
        </TooltipWrapper>
      </div>
    );
  });

  return <>{tooltips}</>;
};

export default VehicleIcons;
