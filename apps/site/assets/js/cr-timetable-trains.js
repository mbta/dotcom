import {
  CRTimetableTrainIcons,
  removeTrain,
  allTrainsClass
} from "./cr-timetable-train-icons";

/* eslint-disable class-methods-use-this */
export const channelDataId = "js-cr-vehicle-data";
const vehicleScheduleDataId = "js-cr-vehicle-schedules-data";
const vehicleStopSequenceDataId = "js-cr-vehicle-prior-stops-data";

export class CRTimetableTrains {
  constructor(dataEl) {
    // Don't render trains on days that are not today
    if (window.location.search.includes("date")) {
      return;
    }
    this.data = {};
    try {
      this.getData();
    } catch (e) {
      throw new Error(
        "Not able to parse initial data from Commuter Rail Timetable",
        e.message
      );
    }
    this.bind();
    this.channelId = dataEl.getAttribute("data-channel");
    this.addEventListeners();
    this.icons = new CRTimetableTrainIcons({
      schedules: this.schedules,
      priorStops: this.priorStops
    });

    setInterval(this.fetchLiveData, 15000);
  }

  buildUrl(channelId) {
    // channelId = "vehicles:<routeId>:<directionId>"
    if (channelId) {
      const routeData = channelId.split(":");
      const routeId = routeData[1];
      const directionId = routeData[2];
      return `/schedules/line_api/realtime?id=${routeId}&direction_id=${directionId}`;
    }
    return null;
  }

  fetchLiveData() {
    const url = this.channelId ? this.buildUrl(this.channelId) : null;
    if (url) {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.liveData = data;
        })
        .catch(err => {
          console.log(`error: ${err}`);
        });
    }
  }

  getData() {
    const schedules = document.getElementById(vehicleScheduleDataId);
    this.data.schedulesInfo = JSON.parse(schedules.textContent);
    const priorStops = document.getElementById(vehicleStopSequenceDataId);
    this.data.stopMap = JSON.parse(priorStops.textContent);
  }

  get schedules() {
    return this.data.schedulesInfo;
  }

  set schedules(sched) {
    this.data.schedulesInfo = sched;
  }

  get priorStops() {
    return this.data.stopMap;
  }

  set priorStops(stops) {
    this.data.stopMap = stops;
  }

  bind() {
    this.onVehicles = this.onVehicles.bind(this);
    this.onRemoveVehicles = this.onRemoveVehicles.bind(this);
    this.fetchLiveData = this.fetchLiveData.bind(this);
    this.buildUrl = this.buildUrl.bind(this);
  }

  addEventListeners() {
    window.$(document).on(this.channelId, this.onVehicles);
    window.$(document).on("vehicles:remove", this.onRemoveVehicles);
    document.addEventListener(
      "turbolinks:before-render",
      this.teardown.bind(this),
      {
        passive: true
      }
    );
  }

  removeEventListeners() {
    window.$(document).off(this.channelId, this.onVehicles);
    window.$(document).off("vehicles:remove", this.onRemoveVehicles);
  }

  onVehicles(ev, { data }) {
    // eslint-disable-next-line no-shadow
    data.forEach(vehicle =>
      this.icons.addOrUpdateTrain(vehicle, this.liveData)
    );
  }

  onRemoveVehicles(ev, { data }) {
    data.forEach(d => removeTrain(d.toString().split("-")[1]));
  }

  teardown() {
    this.removeEventListeners();
  }
}

export default function() {
  document.addEventListener(
    "turbolinks:load",
    () => {
      const dataEls = document.getElementById(channelDataId);
      if (dataEls) {
        return new CRTimetableTrains(dataEls);
      }
      return {};
    },
    { passive: true }
  );
}
