import React from "react";
import { renderToString } from "react-dom/server";
import { useSelector } from "react-redux";
import { RouteStop, LineDiagramVehicle } from "../__schedule";
import CrowdingPill from "./CrowdingPill";
import { TooltipWrapper, vehicleArrowIcon } from "../../../helpers/icon";
import { StopCoord, CoordState, CIRC_RADIUS } from "./graphics/graphic-helpers";
import {
  vehicleRealtimeStatusText,
  vehicleName
} from "../../../models/vehicle";
import { MapMarker } from "../../../leaflet/components/__mapdata";

interface VehicleIconsProps {
  stop: RouteStop;
  vehicles: LineDiagramVehicle[] | null;
  vehicleMarkers: MapMarker[];
}

// fallback to get the tooltip if vehicle channel data is not available
const tooltipTextFromVehicle = (
  stop: RouteStop,
  vehicle: LineDiagramVehicle
): string => {
  const routeType = stop.route ? stop.route.type : null;
  const stopName = stop.name;
  const status =
    stopName && stopName.length
      ? `${vehicleRealtimeStatusText(vehicle)} ${stopName}`
      : "";

  if (routeType !== null) {
    let baseText = vehicleName(routeType);
    if (routeType === 2) baseText += ` ${vehicle.trip_name}`;

    if (vehicle.headsign) {
      return `${vehicle.headsign} ${baseText.toLowerCase()} ${status}`;
    }
    return `${baseText} ${status}`;
  }
  return `Vehicle ${status}`;
};

const tooltipTextFromVehicleMarker = (
  vehicle: LineDiagramVehicle,
  vehicleMarkers: MapMarker[]
): string | null => {
  const found = vehicleMarkers.find(
    (marker: MapMarker) => marker.id === vehicle.id
  );
  if (found && found.tooltip_text) return found.tooltip_text;
  return null;
};

const CrowdingIconString = (vehicle: LineDiagramVehicle): string =>
  renderToString(<CrowdingPill crowding={vehicle.crowding} />);

const VehicleIcons = ({
  stop,
  vehicles,
  vehicleMarkers
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

    const tooltipFromVehicleMarker = tooltipTextFromVehicleMarker(
      vehicle,
      vehicleMarkers
    );

    return (
      <div
        key={vehicle.id}
        className="m-schedule-diagram__vehicle"
        style={{ top, left }}
      >
        <TooltipWrapper
          tooltipText={`<div class="m-schedule-diagram__vehicle-tooltip">${
            vehicle.crowding ? `${CrowdingIconString(vehicle)}<br/>` : ""
          }${tooltipFromVehicleMarker ||
            tooltipTextFromVehicle(stop, vehicle)}</div>`}
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
