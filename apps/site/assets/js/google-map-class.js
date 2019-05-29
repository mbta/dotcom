import styles from "./google-map/styles";
import Marker from "./google-map/marker";
import Polyline from "./google-map/polyline";

export default class GoogleMap {
  constructor(id, data) {
    this.bind();
    this.addEventListeners();
    this.id = id;
    this.map = null;
    this.transitLayer = null;
    this.markers = {};
    this.polylines = [];
    this.data = data;
    this.defaultZoom = data.zoom || 17;
    this.defaultCenter = null;
    this.infoWindow = null;
    this.boundPadding = null;
    this.resetBoundsOnUpdate = data["reset_bounds_on_update?"];
    this.el = document.getElementById(id);

    if (!this.el) {
      throw new Error(`unable to find parent element with id ${this.id}`);
    }

    this.init();
  }

  init() {
    if (!window.google) {
      throw new Error("window.google is not initiated");
    }

    if (!window.google.maps) {
      throw new Error("window.google.maps is not initiated");
    }

    this.el.classList.add("c-google-map");
    this.el.classList.add("js-google-map");
    this.map = new window.google.maps.Map(this.el, this.data.dynamic_options);

    if (this.data.bound_padding) {
      this.boundPadding = this.data.bound_padding;
    }

    this.setDefaultCenter();
    this.data.paths.forEach(this.addPolyline);
    this.data.markers.forEach(this.addMarker);
    this.addLayers();
    this.resetZoom();
    this.resetBounds();
    this.map.setOptions({ styles });
  }

  bind() {
    this.addMarker = this.addMarker.bind(this);
    this.addPolyline = this.addPolyline.bind(this);
    this.resetBounds = this.resetBounds.bind(this);
    this.panToBounds = this.panToBounds.bind(this);
  }

  addEventListeners() {
    window.addEventListener("resize", this.panToBounds);
  }

  getMap() {
    return this.map;
  }

  setDefaultCenter() {
    if (this.data.default_center) {
      this.center = {
        id: "default-center",
        latitude: this.data.default_center.latitude,
        longitude: this.data.default_center.longitude,
        "visible?": false
      };
      this.addCenterToBounds();
    }
  }

  addCenterToBounds() {
    if (!this.center) {
      throw new Error(`center not set for map ${this.id}`);
    }
    this.addMarker(this.center);
    this.resetBounds();
  }

  removeCenterFromBounds() {
    if (this.center) {
      this.removeMarker(this.center.id);
      this.resetBounds();
    }
  }

  addPolyline(data) {
    const polyline = new Polyline(data, this.map);
    this.polylines.push(polyline);
  }

  addOrUpdateMarker(data) {
    const marker = this.markers[data.id];
    if (marker) {
      marker.update(data);
    } else {
      this.addMarker(data, 0);
    }

    if (this.resetBoundsOnUpdate) {
      this.resetBounds();
    }
  }

  addMarker(markerData, index = 0) {
    const existing = this.markers[markerData.id];
    if (existing) {
      existing.remove();
    }
    const marker = new Marker(this, markerData, index);

    this.markers[marker.id] = marker;
  }

  addMarkerToBounds(marker) {
    this.bound.extend(marker.getLatLng());
  }

  removeMarker(id) {
    const marker = this.markers[id];
    if (marker) {
      marker.remove();
      this.markers[id] = null;
    }

    if (this.resetBoundsOnUpdate) {
      this.resetBounds();
    }
  }

  addLayers() {
    if (this.data.layers && this.data.layers.transit === true) {
      this.transitLayer = new window.google.maps.TransitLayer();
      this.transitLayer.setMap(this.map);
    }
  }

  resetBounds(markerIds) {
    this.bound = new window.google.maps.LatLngBounds();
    const markers = markerIds
      ? markerIds.map(id => this.markers[id])
      : this.activeMarkers();

    markers.forEach(marker => {
      if (marker) this.addMarkerToBounds(marker);
    });

    this.panToBounds();
  }

  activeMarkers() {
    // filter out markers that have been set to null
    return Object.values(this.markers).filter(marker => marker);
  }

  visibleMarkers() {
    return this.activeMarkers().filter(marker => marker.isVisible());
  }

  panToBounds() {
    const ne = this.bound.getNorthEast();
    const sw = this.bound.getSouthWest();

    if (ne.equals(sw)) {
      // if the north-east and south-west corners are the same, it's a
      // single-bound bounds, so just set the center
      this.map.setCenter(ne);
    } else {
      // otherwise, pan to the bounds
      this.map.fitBounds(this.bound, this.boundPadding);
      this.map.panToBounds(this.bound);
    }
  }

  resetZoom() {
    this.map.setZoom(this.defaultZoom || 17);
  }

  showInfoWindow(marker, content) {
    if (this.infoWindow) {
      // If info window is displayed on another marker, close it
      this.closeInfoWindow();
    }

    this.infoWindow = new window.google.maps.InfoWindow({ content });
    this.infoWindow.open(this.map, marker);
  }

  closeInfoWindow() {
    if (this.infoWindow) {
      this.infoWindow.close();
      this.infoWindow.setMap(null);
      this.infoWindow = null;
    }
  }
}
