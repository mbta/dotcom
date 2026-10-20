import maplibregl from "maplibre-gl";
import { MapManager } from "maplibrex";

/**
 * Hook that places custom HTML elements on a MaplibreX map.
 *
 * Set `data-map-id` to the id of the map. Each child with a
 * `data-coordinates` attribute (JSON `[lng, lat]`) becomes a marker, using a
 * clone of that child as the marker element. The optional `data-popup`
 * attribute is the HTML for a popup that opens when the marker is clicked.
 */
const StopMarkers = {
  mounted() {
    this.markers = [];
    this.renderMarkers();
  },

  updated() {
    this.renderMarkers();
  },

  destroyed() {
    this.removeMarkers();
  },

  removeMarkers() {
    this.markers.forEach(marker => marker.remove());
    this.markers = [];
  },

  renderMarkers() {
    this.removeMarkers();

    const map = MapManager.get(this.el.dataset.mapId);
    if (!map) return;

    this.el.querySelectorAll("[data-coordinates]").forEach(source => {
      const coordinates = JSON.parse(source.getAttribute("data-coordinates"));
      if (coordinates.length !== 2) return;

      const marker = new maplibregl.Marker({
        anchor: source.getAttribute("data-anchor") || "center",
        element: source.cloneNode(true)
      }).setLngLat(coordinates);

      const popupHtml = source.getAttribute("data-popup");
      if (popupHtml) {
        marker.setPopup(
          new maplibregl.Popup({
            className: "m-schedule-line__stop-popup",
            focusAfterOpen: false
          }).setHTML(popupHtml)
        );
      }

      marker.addTo(map);
      this.markers.push(marker);
    });
  }
};

export default StopMarkers;
