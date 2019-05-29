import * as Helpers from "./helpers";

export default class Marker {
  constructor(parent, data, index = 0) {
    this.parent = parent;
    this.id = data.id;
    this.data = data;
    this.marker = null;
    this.infoWindow = null;
    this.icon = null;
    this.bind();

    if (!this.id) {
      throw new Error("marker has no id");
    }

    if (!data.latitude || !data.longitude) {
      throw new Error("invalid lat/lng values for marker");
    }

    this.latLng = new window.google.maps.LatLng(data.latitude, data.longitude);

    this.buildIcon();

    const zIndex = this.data.z_index || 0;

    // Add a marker to map
    if (this.data["visible?"]) {
      this.marker = new window.google.maps.Marker({
        position: this.latLng,
        map: this.parent.getMap(),
        icon: this.icon,
        zIndex: zIndex + index
      });

      if (this.data.tooltip) {
        this.marker.addListener("mouseover", this.showInfoWindow, {
          passive: true
        });
        this.marker.addListener("mouseout", this.closeInfoWindow, {
          passive: true
        });
      }

      this.addLabel();
    }
  }

  buildIcon() {
    if (this.data.icon) {
      this.icon = Helpers.buildIcon(this.data.icon, this.data.size);
    }
  }

  addLabel() {
    if (this.marker && this.data.label) {
      const label = {
        color: this.data.label.color,
        fontFamily: this.data.label.font_family,
        fontSize: this.data.label.font_size,
        fontWeight: this.data.label.font_weight,
        text: this.data.label.text
      };

      this.marker.setLabel(label);
    }
  }

  update(data) {
    this.data = data;

    const newPosition = new window.google.maps.LatLng(
      data.latitude,
      data.longitude
    );
    this.latLng = newPosition;

    if (this.marker) {
      this.buildIcon();
      this.marker.setIcon(this.icon);
      this.slowMove(newPosition);
    }
  }

  remove() {
    this.closeInfoWindow();

    if (this.marker) {
      this.marker.setMap(null);
    }
  }

  bind() {
    this.showInfoWindow = this.showInfoWindow.bind(this);
    this.closeInfoWindow = this.closeInfoWindow.bind(this);
  }

  getLatLng() {
    return this.latLng;
  }

  isVisible() {
    return !!this.data["visible?"];
  }

  showInfoWindow() {
    if (this.data.tooltip) {
      this.parent.showInfoWindow(this.marker, this.data.tooltip);
    }
  }

  closeInfoWindow() {
    this.parent.closeInfoWindow();
  }

  slowMove(moveTo) {
    const current = this.latLng;
    const animationDuration = 0.5;

    var deltaLat = (moveTo.lat() - current.lat()) / 100;
    var deltaLng = (moveTo.lng() - current.lng()) / 100;

    var delay = 10 * animationDuration;
    for (var i = 0; i < 100; i++) {
      this.doSlowMove(deltaLat, deltaLng, delay * i);
    }
  }

  doSlowMove(deltaLat, deltaLng, delay) {
    requestAnimationFrame(() => {
      const lat = this.latLng.lat() + deltaLat;
      const lng = this.latLng.lng() + deltaLng;
      this.latLng = new window.google.maps.LatLng(lat, lng);
      this.marker.setPosition(this.latLng);
    }, delay);
  }
}
