import { ViewHook } from "phoenix_live_view";
import L from "leaflet";

const bostonCenter: L.LatLng = L.latLng(42.360718, -71.05891);
const baseMap = L.tileLayer("https://cdn.mbta.com/osm_tiles/{z}/{x}/{y}.png", {
  attribution:
    "&amp;copy <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors",
  minZoom: 5,
  maxZoom: 16
});

const mapMarkerIcon = (iconUrl: string): L.Icon =>
  L.icon({
    iconUrl,
    iconSize: [38, 56],
    iconAnchor: [19, 28]
  });

const fromMarker = L.marker(bostonCenter, {
  icon: mapMarkerIcon("/icon-svg/icon-map-pin-a.svg"),
  autoPan: true
});
const toMarker = L.marker(bostonCenter, {
  icon: mapMarkerIcon("/icon-svg/icon-map-pin-b.svg"),
  autoPan: true
});

const createMap = (id: string): L.Map => {
  const map = L.map(id).setView(bostonCenter, 14);
  baseMap.addTo(map);
  return map;
};

interface LocationProps {
  latitude: number;
  longitude: number;
  name?: string;
  stop_id?: string;
}

const TripPlannerMap: Partial<ViewHook> = {
  mounted() {
    const hook = (this as unknown) as ViewHook;
    if (hook.el) {
      const map = createMap(hook.el.id);
      const handleData = (marker: L.Marker) => (data: object): void => {
        const { latitude, longitude } = data as LocationProps;
        if (!latitude || !longitude) {
          marker.removeFrom(map);
        } else {
          marker.setLatLng([latitude, longitude]).addTo(map);
          map.flyToBounds(map.getBounds().extend([latitude, longitude]), {
            padding: [10, 10]
          });
        }
      };
      hook.handleEvent("trip-planner-form--from", handleData(fromMarker));
      hook.handleEvent("trip-planner-form--to", handleData(toMarker));
    }
  }
};

export default TripPlannerMap;
