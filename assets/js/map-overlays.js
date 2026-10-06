import * as maplibregl from "maplibre-gl";

const createMapOverlays = MapManager => {
  const fitMap = hook => {
    const mapId = hook.el.dataset.mapId;
    const map = MapManager.has(mapId) && MapManager.get(mapId);
    if (!map) return;

    const coordinates = Array.from(
      hook.el.querySelectorAll("[data-coordinates]")
    )
      .map(element => JSON.parse(element.dataset.coordinates))
      .filter(
        position =>
          position.length === 2 &&
          position.every(coordinate => Number.isFinite(coordinate))
      );

    if (!coordinates.length) {
      coordinates.push(map.getCenter().toArray());
    }

    const bounds = coordinates.reduce(
      (result, position) => result.extend(position),
      new maplibregl.LngLatBounds(coordinates[0], coordinates[0])
    );

    map.fitBounds(bounds, {
      padding: 50,
      maxZoom: Number(hook.el.dataset.maxZoom) || 16
    });
  };

  const MapBounds = {
    mounted() {
      const hook = this;
      const waitForMap = () => {
        const mapId = hook.el.dataset.mapId;
        const map = MapManager.has(mapId) && MapManager.get(mapId);
        if (!map) {
          hook.animationFrame = window.requestAnimationFrame(waitForMap);
          return;
        }

        if (map.loaded()) {
          fitMap(hook);
        } else {
          map.once("load", () => fitMap(hook));
        }
      };

      this.handleEvent("update-markers", () => {
        const mapId = this.el.dataset.mapId;
        const map = MapManager.has(mapId) && MapManager.get(mapId);
        if (map && map.loaded()) {
          fitMap(this);
        } else if (map) {
          map.once("load", () => fitMap(this));
        }
      });
      waitForMap();
    },

    destroyed() {
      if (this.animationFrame) {
        window.cancelAnimationFrame(this.animationFrame);
      }
    }
  };

  const MapIcon = {
    mounted() {
      this.addMarker();
    },

    updated() {
      this.removeMarker();
      this.addMarker();
    },

    destroyed() {
      this.removeMarker();
    },

    addMarker() {
      const mapId = this.el.dataset.mapId;
      const map = MapManager.has(mapId) && MapManager.get(mapId);
      const coordinates = JSON.parse(this.el.dataset.coordinates);
      if (!map || coordinates.length !== 2) return;

      const element = this.el.cloneNode(true);
      element.removeAttribute("id");

      const marker = new maplibregl.Marker({
        anchor: this.el.dataset.anchor || "center",
        element,
        rotation: Number(this.el.dataset.rotation) || 0
      })
        .setLngLat(coordinates)
        .addTo(map);

      const popupHTML = this.el.dataset.popup;
      if (popupHTML) {
        const popup = new maplibregl.Popup({
          className: "m-schedule-line__stop-popup",
          focusAfterOpen: false
        }).setHTML(popupHTML);
        marker.setPopup(popup);
      }

      this.marker = marker;
    },

    removeMarker() {
      if (this.marker) {
        this.marker.remove();
        this.marker = undefined;
      }
    }
  };

  return { MapBounds, MapIcon };
};

export default createMapOverlays;
