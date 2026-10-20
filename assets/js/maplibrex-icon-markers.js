import maplibregl from "maplibre-gl";
import { MapManager } from "maplibrex";

/**
 * Hook that places custom HTML elements on a MaplibreX map.
 *
 * Set `data-map-id` to the id of the map. Each child with a
 * `data-coordinates` attribute (JSON `[lng, lat]`) becomes a marker, using a
 * clone of that child as the marker element. Optional attributes on each child:
 *
 *   - `data-marker-id`: stable id for the marker. When the hook updates, markers
 *     with the same id are moved in place (keeping any open popup), new ids are
 *     added, and missing ids are removed. Defaults to the child's position.
 *   - `data-anchor`: marker anchor, e.g. "center" (default) or "bottom"
 *   - `data-rotation`: marker rotation in degrees
 *   - `data-popup`: HTML for a popup that opens when the marker is clicked
 */
const IconMarkers = {
  mounted() {
    this.markers = new Map();
    this.renderMarkers();
  },

  updated() {
    this.renderMarkers();
  },

  destroyed() {
    this.markers.forEach(({ marker }) => marker.remove());
    this.markers.clear();
  },

  renderMarkers() {
    const map = MapManager.get(this.el.dataset.mapId);
    if (!map) return;

    const seen = new Set();

    this.el.querySelectorAll("[data-coordinates]").forEach((source, index) => {
      const coordinates = JSON.parse(source.getAttribute("data-coordinates"));
      if (coordinates.length !== 2) return;

      const id = source.getAttribute("data-marker-id") || `index-${index}`;
      seen.add(id);

      const rotation = Number(source.getAttribute("data-rotation")) || 0;
      const popupHtml = source.getAttribute("data-popup");
      const existing = this.markers.get(id);

      if (existing) {
        existing.marker.setLngLat(coordinates).setRotation(rotation);
        this.updatePopup(existing, popupHtml);
        return;
      }

      const marker = new maplibregl.Marker({
        anchor: source.getAttribute("data-anchor") || "center",
        rotation,
        element: source.cloneNode(true)
      }).setLngLat(coordinates);

      const entry = { marker, popup: null, popupHtml: null };
      this.updatePopup(entry, popupHtml);

      marker.addTo(map);
      this.markers.set(id, entry);
    });

    this.markers.forEach((entry, id) => {
      if (!seen.has(id)) {
        entry.marker.remove();
        this.markers.delete(id);
      }
    });
  },

  updatePopup(entry, popupHtml) {
    if (!popupHtml) {
      if (entry.popup) {
        entry.marker.setPopup(null);
        entry.popup = null;
        entry.popupHtml = null;
      }
      return;
    }

    if (!entry.popup) {
      entry.popup = new maplibregl.Popup({
        className: "m-schedule-line__stop-popup",
        focusAfterOpen: false
      });
      entry.marker.setPopup(entry.popup);
    }

    if (entry.popupHtml !== popupHtml) {
      entry.popup.setHTML(popupHtml);
      entry.popupHtml = popupHtml;
    }
  }
};

export default IconMarkers;
