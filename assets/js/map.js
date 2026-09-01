import * as maplibregl from "maplibre-gl";

/**
 * This is a LiveView hook this initializes a maplibre-gl map.
 */
export default {
  /**
   * We have to keep a list of markers so we can remove them when the markers are updated.
   */
  markers: [],
  /**
   * Creates a new maplibre-gl map with the given config and adds it to the phx-hook DOM element.
   *
   * When the map is loaded, it sets up event handlers to receive updates from the LiveView.
   * It also sends a "map-loaded" event to the LiveView to let it know this the map is ready for updates.
   */
  mounted() {
    this.config = JSON.parse(this.el.dataset.config);

    this.map = new maplibregl.Map({
      container: this.el.querySelector(".mbta-map-wrapper"),
      ...this.config,
    });

    this.map.addControl(new maplibregl.NavigationControl(), "top-left");

    this.map.on("load", () => {
      this.handleEvent("update-lines", _ => this.updateLines());
      this.handleEvent("update-markers", _ => this.updateMarkers());
      this.pushEventTo(this.el, "map-loaded", {});
    });
  },
  /**
   * Destroys the map when the hook is removed.
   */
  destroyed () {
    delete this.map;
  },
  /**
   * Convert lines to GeoJSON features and add them to the map.
   */
  addLines(lines) {
    this.map.addSource("lines", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: lines.map(this.lineToFeature)
      }
    });

    this.map.addLayer({
      id: "lines",
      type: "line",
      source: "lines",
      paint: {
        "line-color": ["get", "color"],
        "line-width": ["get", "width"],
      }
    });
  },
  /**
   * Add each marker to the map and update the markers array.
   */
  addMarkers(markers) {
    markers.forEach(marker => {
      const mapMarker = new maplibregl.Marker({
        anchor: marker.anchor,
        element: marker.element
      });

      this.markers.push(mapMarker);

      mapMarker.setLngLat(marker.coordinates).addTo(this.map);
    });
  },
  /**
   * Returns the SW and NE most coordinates from a collection of coordinates.
   */
  calcBoundsFromCoordinates(coordinatesCollection) {
    return [
      this.getSWCoordinates(coordinatesCollection),
      this.getNECoordinates(coordinatesCollection),
    ];
  },
  /**
   * Fit the map to a collection of coordinates.
   * Limit the zoom to the zoom, maxZoom, or a sensible default of 16.
   */
  fitMapToCoordinates(coordinatesCollection) {
    const bounds = this.calcBoundsFromCoordinates(coordinatesCollection);
    const maxZoom = this.config.zoom || this.config.maxZoom || 16;

    this.map.fitBounds(bounds, {maxZoom, padding: 50});
  },
  /**
   * Fit the map to the center of the map if one is provided in the config.
   * Otherwise, do nothing.
   */
  fitMapToCenter() {
    if ("center" in this.config) {
      this.fitMapToCoordinates([this.config.center]);
    }
  },
  /**
   * Calculate the bounds of collection of markers and fit the map to those bounds.
   */
  fitMapToMarkers(markers) {
    const coordinates = markers.map(marker => marker.coordinates);

    this.fitMapToCoordinates(coordinates);
  },
  /**
   * Returns the NE most coordinates from a collection of coordinates.
   */
  getNECoordinates(coordinatesCollection) {
    const highestLng = Math.max(
      ...coordinatesCollection.map((coordinates) => coordinates[0])
    );
    const highestLat = Math.max(
      ...coordinatesCollection.map((coordinates) => coordinates[1])
    );

    return [highestLng, highestLat];
  },
  /**
   * Returns the SW most coordinates from a collection of coordinates.
   */
  getSWCoordinates(coordinatesCollection) {
    const lowestLng = Math.min(
      ...coordinatesCollection.map((coordinates) => coordinates[0])
    );
    const lowestLat = Math.min(
      ...coordinatesCollection.map((coordinates) => coordinates[1])
    );

    return [lowestLng, lowestLat];
  },
  /**
   * Converts a line object to a GeoJSON feature.
   */
  lineToFeature(line) {
    return {
      type: "Feature",
      properties: {
        color: line.color,
        width: line.width,
      },
      geometry: {
        type: "LineString",
        coordinates: line.coordinates,
      },
    };
  },
  /**
   * If the map already has a source and layer for the lines, remove them to prepare for a redraw.
   */
  resetLines() {
    if (this.map.getLayer("lines")) {
      this.map.removeLayer("lines");
    }

    if (this.map.getSource("lines")) {
      this.map.removeSource("lines");
    }
  },
  /**
   * Remove all markers from the map and reset the markers array.
   */
  resetMarkers() {
    this.markers.forEach(marker => marker.remove());

    this.markers = [];
  },
  /**
   * Updating lines involves four steps:
   *
   * 1. Get all the line elements from the DOM.
   * 2. Parse the JSON data from each element.
   * 3. Reset the existing lines on the map.
   * 4. Add the new lines to the map.
   *
   * If there are no lines, we skip the last step.
   */
  updateLines() {
    const elements = this.el.querySelectorAll("[data-line]");
    const lines = Array.from(elements).map(element => {
      return JSON.parse(element.getAttribute("data-line"));
    });

    this.resetLines();

    if (lines.length === 0) {
      return;
    }

    this.addLines(lines);
  },
  /**
   * Updating markers involves five steps:
   *
   * 1. Get all the marker elements from the DOM.
   * 2. Parse the JSON data from each element.
   * 3. Filter out any markers that don't have coordinates.
   * 4. Reset the existing markers on the map.
   * 5. Add the new markers to the map.
   * 6. Fit the map to the bounds of the markers.
   *
   * If there are no markers, we skip the last two steps.
   */
  updateMarkers() {
    this.resetMarkers();

    const markers = Array.from(this.el.querySelectorAll("[data-coordinates]")).map(element => {
      return {
        anchor: element.getAttribute("data-anchor"),
        coordinates: JSON.parse(element.getAttribute("data-coordinates")),
        element
      }
    }).filter(marker => marker.coordinates.length === 2);

    if (markers.length === 0) {
      this.fitMapToCenter();

      return;
    }

    this.addMarkers(markers);

    this.fitMapToMarkers(markers);
  }
}
