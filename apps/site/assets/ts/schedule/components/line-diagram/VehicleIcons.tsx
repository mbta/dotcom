import React from "react";
import { renderToString } from "react-dom/server";
import { useSelector } from "react-redux";
import { CrowdingType, RouteStop, LineDiagramVehicle } from "../__schedule";
import CrowdingPill from "./CrowdingPill";
import { TooltipWrapper, vehicleArrowIcon } from "../../../helpers/icon";
import { StopCoord, CoordState } from "./state-helpers";
import { BRANCH_LINE_WIDTH, CIRC_RADIUS } from "./graphics/graphic-helpers";
import { RouteType } from "../../../__v3api";
import { statusDescriptions, vehicleTypeNames } from "../../../models/vehicle";

interface VehicleIconsProps {
  stop: RouteStop;
  vehicles: LineDiagramVehicle[] | null;
}

const tooltipText = (
  routeType: RouteType | null,
  stopName: string | null,
  vehicle: LineDiagramVehicle
): string => {
  const status =
    stopName && stopName.length
      ? `${statusDescriptions[vehicle.status]} ${stopName}`
      : "";

  if (routeType !== null) {
    let vehicleName = vehicleTypeNames[routeType];
    if (routeType === 2) vehicleName = `${vehicleName} ${vehicle.trip_name}`;

    if (vehicle.headsign) {
      return `${vehicle.headsign} ${vehicleName.toLowerCase()} ${status}`;
    }

    return `${vehicleName} ${status}`;
  }

  return `Vehicle ${status}`;
};

const CrowdingIconString = (crowding: CrowdingType): string =>
  renderToString(<CrowdingPill crowding={crowding} />);

const VehicleIcons = ({
  stop,
  vehicles
}: VehicleIconsProps): JSX.Element | null => {
  const coords: StopCoord | null = useSelector(
    (state: CoordState) => state[stop.id]
  );
  if (!vehicles || !coords) return null;
  const [x, y] = coords;
  const left = `${x - BRANCH_LINE_WIDTH + CIRC_RADIUS + 1}px`;
  const routeType = stop.route ? stop.route.type : null;
  const tooltips = vehicles.map(vehicle => {
    const top = `${{
      // eslint-disable-next-line @typescript-eslint/camelcase
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
            vehicle.crowding
              ? `${CrowdingIconString(vehicle.crowding)}<br/>`
              : ""
          }${tooltipText(routeType, stop.name, vehicle)}</div>`}
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
