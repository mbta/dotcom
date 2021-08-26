import React from "react";
import { renderToString } from "react-dom/server";
import { useSelector } from "react-redux";
import { RouteStop } from "../__schedule";
import CrowdingPill from "./CrowdingPill";
import { TooltipWrapper, vehicleArrowIcon } from "../../../helpers/icon";
import { StopCoord, CoordState, CIRC_RADIUS } from "./graphics/graphic-helpers";
import { MapMarker } from "../../../leaflet/components/__mapdata";
import { LiveDataByStop } from "./__line-diagram";

interface VehicleIconsProps {
  stop: RouteStop;
  liveData: LiveDataByStop;
  vehicleMarkers: MapMarker[];
}

const VehicleIcons = ({
  stop,
  liveData,
  vehicleMarkers
}: VehicleIconsProps): JSX.Element | null => {
  const coords: StopCoord | null = useSelector(
    (state: CoordState) => state[stop.id]
  );

  if (!coords) return null;

  const stopId = stop.id;

  const vehicleData = stop["is_beginning?"]
    ? liveData[stopId].vehicles.filter(vehicle => vehicle.status === "stopped")
    : liveData[stopId].vehicles;

  const ids = vehicleData.map(v => v.id);

  const filteredVehiclesMarkers = vehicleMarkers.filter(marker => {
    const foundIndex = ids.findIndex(id => id === marker.id);
    return foundIndex !== -1;
  });

  const [x, y] = coords;
  const left = `${x - CIRC_RADIUS}px`;

  const tooltips = filteredVehiclesMarkers
    .filter(vehicle => vehicle.id && vehicle.status)
    .map(vehicle => {
      const top = `${{
        // eslint-disable-next-line camelcase
        in_transit: y - 50,
        incoming: y - 25,
        stopped: y - 10
      }[vehicle.status!] || y}px`;

      return (
        <div
          key={vehicle.id!}
          className="m-schedule-diagram__vehicle"
          style={{ top, left }}
        >
          <TooltipWrapper
            tooltipText={`<div class="m-schedule-diagram__vehicle-tooltip">${
              vehicle.vehicle_crowding
                ? `${renderToString(
                    <CrowdingPill crowding={vehicle.vehicle_crowding} />
                  )}<br/>`
                : ""
            }${vehicle.tooltip_text}</div>`}
            tooltipOptions={{
              placement: "right",
              animation: false,
              html: true
            }}
          >
            {vehicleArrowIcon("m-schedule-diagram__vehicle--icon")}
          </TooltipWrapper>
        </div>
      );
    });

  return <>{tooltips}</>;
};

export default VehicleIcons;
