import { doWhenGoogleMapsIsReady } from "./google-maps-loaded";
import GoogleMap from "./google-map-class";

export class RouteMap {
  constructor(dataEl) {
    this.bind();
    this.channelId = dataEl.getAttribute("data-channel");
    const id = dataEl.getAttribute("data-for");
    const data = JSON.parse(dataEl.innerHTML);
    this.map = new GoogleMap(id, data);
    this.addEventListeners();
  }

  bind() {
    this.onVehicles = this.onVehicles.bind(this);
    this.onRemoveVehicles = this.onRemoveVehicles.bind(this);
  }

  addEventListeners() {
    window.$(document).on(this.channelId, this.onVehicles);
    window.$(document).on("vehicles:remove", this.onRemoveVehicles);
  }

  removeEventListeners() {
    window.$(document).off(this.channelId, this.onVehicles);
    window.$(document).off("vehicles:remove", this.onRemoveVehicles);
  }

  clearMap() {
    this.map
      .activeMarkers()
      .filter(RouteMap.isVehicle)
      .forEach(marker => this.map.removeMarker(marker.id));
  }

  onVehicles(ev, { data, event }) {
    if (event === "reset") this.clearMap();
    data.forEach(({ marker }) => this.map.addOrUpdateMarker(marker));
  }

  onRemoveVehicles(ev, { data, event }) {
    data.forEach(id => this.map.removeMarker(id));
  }

  static isVehicle(marker) {
    return marker.id.slice(0, 8) === "vehicle-";
  }
}

const maps = [];

function init() {
  doWhenGoogleMapsIsReady(() => {
    const dataEls = document.getElementsByClassName(
      "js-route-map-dynamic-data"
    );
    Array.from(dataEls).forEach(dataEl => maps.push(new RouteMap(dataEl)));
  });
}

function teardown() {
  maps.forEach(map => map.removeEventListeners());
  while (maps.length > 0) maps.pop();
}

export default function() {
  document.addEventListener("turbolinks:load", init, { passive: true });
  document.addEventListener("turbolinks:before-render", teardown, {
    passive: true
  });
}
