import React from "react";
import { renderToString } from "react-dom/server";
import { RouteType } from "../../../__v3api";
import { LineDiagramVehicle, CrowdingType } from "../__schedule";
import { TooltipWrapper, vehicleArrowIcon } from "../../../helpers/icon";
import CrowdingPill from "./CrowdingPill";
import { statusDescriptions, vehicleTypeNames } from "../../../models/vehicle";

interface Props {
  routeType: RouteType | null;
  stopName: string | null;
  vehicles: LineDiagramVehicle[];
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

// need a string for usage in the tooltip text
const CrowdingIconString = (crowding: CrowdingType): string =>
  renderToString(<CrowdingPill crowding={crowding} />);

const VehicleIcons = ({
  routeType,
  stopName,
  vehicles
}: Props): JSX.Element => {
  const tooltips = vehicles.map(vehicle => (
    <div
      key={vehicle.id}
      className={`m-schedule-diagram__vehicle m-schedule-diagram__vehicle--${
        vehicle.status
      }`}
    >
      <TooltipWrapper
        tooltipText={`<div class="m-schedule-diagram__vehicle-tooltip">${
          vehicle.crowding ? `${CrowdingIconString(vehicle.crowding)}<br/>` : ""
        }${tooltipText(routeType, stopName, vehicle)}</div>`}
        tooltipOptions={{ placement: "right", animation: false, html: true }}
      >
        {vehicleArrowIcon("m-schedule-diagram__vehicle--icon")}
      </TooltipWrapper>
    </div>
  ));

  return <>{tooltips}</>;
};

export default VehicleIcons;
