import { doWhenGoogleMapsIsReady } from "./google-maps-loaded";
import GoogleMap from "./google-map-class";

export class TripPlannerResults {
  constructor() {
    this.bind();
    this.maps = {};
    this.firstMap = null;
    this.addEventListeners();
    this.initFirstMap();

    $("[data-planner-body]").on("hide.bs.collapse", this.toggleIcon);
    $("[data-planner-body]").on("show.bs.collapse", this.toggleIcon);
    $("[data-planner-body]").on("shown.bs.collapse", this.initPlanMap);
    $(".js-trip-plan-alert-toggle").on("click", this.toggleAlertDropdownText);
  }

  bind() {
    this.initPlanMap = this.initPlanMap.bind(this);
    this.onUpdateMarker = this.onUpdateMarker.bind(this);
    this.onRemoveMarker = this.onRemoveMarker.bind(this);
  }

  addEventListeners() {
    const $ = window.jQuery;
    $(document).on("trip-plan:update-marker", this.onUpdateMarker);
    $(document).on("trip-plan:remove-marker", this.onRemoveMarker);
  }

  onUpdateMarker({ detail }) {
    if (!this.firstMap) {
      return;
    }
    if (detail.latitude && detail.longitude) {
      const id = `marker-${detail.label}`;
      const markerData = {
        id,
        latitude: detail.latitude,
        longitude: detail.longitude,
        tooltip: detail.title,
        size: "large",
        icon: "map-pin",
        label: {
          color: "#fff",
          font_size: "22px",
          font_weight: "bold",
          text: detail.label,
          font_family: "Helvetica Neue, Helvetica, Arial"
        },
        "visible?": true
      };
      this.firstMap.addOrUpdateMarker(markerData);
      this.updateMapCenter(this.firstMap);
    }
  }

  onRemoveMarker({ detail }) {
    if (!this.firstMap) {
      return;
    }
    this.firstMap.removeMarker(`marker-${detail.label}`);
    this.updateMapCenter(this.firstMap);
    this.updateMapZoom(this.firstMap);
  }

  updateMapCenter(map) {
    if (map) {
      switch (map.visibleMarkers().length) {
        case 0:
        case 1:
          map.addCenterToBounds();
          break;

        default:
          map.removeCenterFromBounds();
      }
    }
  }

  updateMapZoom(map) {
    if (map && map.visibleMarkers().length === 0) {
      map.resetZoom();
    }
  }

  toggleAlertDropdownText(e) {
    const target = $(e.target);
    if (target.text().trim() === "(view alert)") {
      target.text("(hide alert)");
    } else {
      target.text("(view alert)");
    }
  }

  toggleIcon(e) {
    const container = $(e.target).parent();
    const icon = $(container).find("[data-planner-header] i");
    icon.toggleClass("fa-angle-up fa-angle-down");
  }

  initFirstMap() {
    const id = "trip-plan-map--initial";
    if (!document.getElementById(id)) {
      return;
    }
    const data = JSON.parse(
      document.querySelector("[data-for=trip-plan-map--initial]").innerHTML
    );
    this.firstMap = new GoogleMap(id, data);
  }

  initPlanMap(ev) {
    // TODO: make sure new page has different selector
    const el = ev.target.querySelector(".js-trip-plan-map-dynamic-data");
    const id = el.getAttribute("data-for");
    // check if map was already initialized
    if (this.maps[id]) {
      return;
    }
    const data = JSON.parse(el.innerHTML);
    this.maps[id] = new GoogleMap(id, data);
  }
}

export function init() {
  const $ = window.jQuery;
  $(document).on("turbolinks:load", () => {
    $(".js-trip-plan-alert-toggle").show();
    $(".js-trip-plan-alert-toggle").trigger("click");
    doWhenGoogleMapsIsReady(() => new TripPlannerResults());
  });
}
