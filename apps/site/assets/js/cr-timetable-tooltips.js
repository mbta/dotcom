import { hasPredictionTime } from "../ts/models/prediction";

const tooltipDivider = "<hr class='tooltip-divider'>";
const vehicleTooltipId = vehicleContainerId => `${vehicleContainerId}-tooltip`;

export const addOrUpdateTooltip = (vehicleTooltip, vehicleContainerId) => {
  const containerId = vehicleTooltipId(vehicleContainerId);
  const container = document.getElementById(containerId);
  const currentTooltip = container.getAttribute("data-original-title");
  const stopTooltip = container.getAttribute("data-stop");
  // If the tooltip is visible, it will have an aria-describedby attribute
  const tooltipVisible = container.getAttribute("aria-describedby");

  if (stopTooltip) {
    const tooltip = [vehicleTooltip, stopTooltip].join(tooltipDivider);
    // Avoid unnecessary updates
    if (tooltip === currentTooltip) {
      return;
    }
    container.setAttribute("data-original-title", tooltip);
  } else {
    // Avoid unnecessary updates
    if (vehicleTooltip === currentTooltip) {
      return;
    }
    container.setAttribute("data-original-title", vehicleTooltip);
  }

  if (tooltipVisible) {
    window.jQuery(container).tooltip("show");
  }
};

export const removeTooltip = parentId => {
  const tooltipId = `${parentId}-tooltip`;
  const container = document.getElementById(tooltipId);
  const stopTooltip = container.getAttribute("data-stop");
  window.jQuery(container).tooltip("hide");
  if (stopTooltip) {
    container.setAttribute("data-original-title", stopTooltip);
  } else {
    container.removeAttribute("data-original-title");
  }
};

export const maybeAddTrackToTooltip = (marker, realtimeData) => {
  const vehicleId = marker.id;

  for (const stopId in realtimeData) {
    if (
      realtimeData[stopId].vehicles &&
      realtimeData[stopId].vehicles.length > 0
    ) {
      const { vehicles } = realtimeData[stopId];
      const found = vehicles.find(v => v.id === vehicleId);
      if (found) {
        const { headsigns } = realtimeData[stopId];
        const liveHeadsigns = headsigns.filter(hasPredictionTime);

        let prediction = null;
        const headsign = liveHeadsigns[0];
        if (headsign) {
          const predictedOrScheduledTime =
            headsign.time_data_with_crowding_list[0].time_data;
          ({ prediction } = predictedOrScheduledTime);
        }
        if (prediction && prediction.track) {
          return `${marker.tooltip_text} on Track ${prediction.track}`;
        }
      }
    }
  }
  return marker.tooltip_text;
};
