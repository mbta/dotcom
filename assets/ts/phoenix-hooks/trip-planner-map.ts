import { ViewHook } from "phoenix_live_view";
import L from "leaflet";
import "../../js/leaflet-css";

const bostonCenter: L.LatLng = L.latLng(42.360718, -71.05891);
const baseMap = L.tileLayer("https://cdn.mbta.com/osm_tiles/{z}/{x}/{y}.png", {
  attribution:
    "&amp;copy <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors",
  minZoom: 5,
  maxZoom: 16
});

const createMap = (id: string): L.Map => {
  const map = L.map(id).setView(bostonCenter, 14);
  baseMap.addTo(map);
  return map;
};

const TripPlannerMap: Partial<ViewHook> = {
  mounted() {
    const hook = (this as unknown) as ViewHook;
    if (hook.el) {
      const map = createMap(hook.el.id);
    }
  }
};

export default TripPlannerMap;
