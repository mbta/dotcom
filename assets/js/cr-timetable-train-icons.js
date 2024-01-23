import { addOrUpdateTooltip, removeTooltip } from "./cr-timetable-tooltips";

export const trainIcon = id =>
  `<div class="${id} js-train-icon"><span class="notranslate c-svg__icon-commuter-rail-default"><svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="m36.54 11.28a1.8073 1.8073 0 0 1 -.81-1.54v-4.79a3.03356 3.03356 0 0 0 -2.38-2.89 75.79021 75.79021 0 0 0 -8.71-2 3.37685 3.37685 0 0 0 -1.38.01c-2.6.57-5.22 1.08-7.8 1.8-1.52.42-3.12 1.26-3.12 3.08v4.76a1.78965 1.78965 0 0 1 -.83 1.54 3.14612 3.14612 0 0 0 -1.5 2.69v20.22a3.14244 3.14244 0 0 0 1.18 2.43l5.12 3.75-4.13 7.66h3.37l.58-1.06h15.81l.59 1.06h3.34l-4.09-7.66h.01l5.01-3.71a3.17036 3.17036 0 0 0 1.19-2.47v-20.22a3.17047 3.17047 0 0 0 -1.45-2.66zm-10.08-7.48a.99881.99881 0 0 1 1.21-.98l4.94 1.04a.98623.98623 0 0 1 .79.97v2.94a.99652.99652 0 0 1 -1.19.98l-4.94-.96a.99672.99672 0 0 1 -.81-.98zm-2.46 11.28a2.69727 2.69727 0 1 1 -1.91.79 2.69913 2.69913 0 0 1 1.91-.79zm-9.1-10.25a.98522.98522 0 0 1 .8-.97l4.94-1.04a.99473.99473 0 0 1 1.2.98v3.01a.99775.99775 0 0 1 -.8.98l-4.95.96a1.00066 1.00066 0 0 1 -1.19-.98zm1.0938 29.67a1.955 1.955 0 1 1 1.95-1.96 1.96318 1.96318 0 0 1 -1.95 1.96zm3.7062 5.97h8.63l.88995 1.6h-10.39995zm-2.68 4.86.91-1.65h12.19l.92 1.65zm15.98-10.83a1.955 1.955 0 1 1 1.95-1.96 1.96319 1.96319 0 0 1 -1.95 1.96z"></path></svg></span></div>`;
const emptySpaceForIcon = "&nbsp;";

export const removeTrain = id => {
  const vehicleIcons = Array.from(document.getElementsByClassName(id));
  vehicleIcons.forEach(i => {
    // eslint-disable-next-line no-param-reassign
    i.innerHTML = emptySpaceForIcon;
    return removeTooltip(i.parentNode.id);
  });
};

export class CRTimetableTrainIcons {
  constructor(props) {
    this.priorStops = props.priorStops;
    this.schedules = props.schedules;
  }

  addOrUpdateTrain(data) {
    // Splat together vehicle struct and stop name data
    const {
      data: { vehicle: vehicleStruct, stop_name: stopName },
      marker: { tooltip_text }
    } = data;
    const vehicle = { ...vehicleStruct, stop_name: stopName };

    const vehicleContainerId = this.vehicleContainerId(vehicle);
    const vehicleContainer = document.getElementById(vehicleContainerId);

    if (!vehicleContainer) {
      // This happens on "Via Haverhill" etc vehicles
      return;
    }

    // If the train isn't currently in this container, remove the other instance
    if (vehicleContainer.innerHTML.trim() === emptySpaceForIcon) {
      removeTrain(vehicle.id);
    }

    this.addTrain(vehicle, vehicleContainer);
    const text = "<p class='prediction-tooltip'>" + tooltip_text + "</p>";
    addOrUpdateTooltip(text, vehicleContainerId);
  }

  addTrain(vehicle, vehicleContainer) {
    // eslint-disable-next-line no-param-reassign
    vehicleContainer.innerHTML = trainIcon(vehicle.id);
  }

  vehicleContainerId(vehicle) {
    const stop = `${vehicle.stop_name}-${vehicle.trip_id}`;
    if (vehicle.status !== "in_transit") {
      return stop;
    }
    // For vehicles in transit with prior stop data, put the vehicle in the prior stop container
    const stopSequence = this.schedules[stop]?.stop_sequence || 1;
    return this.priorStops[`${vehicle.trip_id}-${stopSequence - 1}`];
  }
}
