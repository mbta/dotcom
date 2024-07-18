import { ViewHook } from "phoenix_live_view";
import L from "leaflet";
import "../../js/leaflet-css";

const LeafletMap: Partial<ViewHook> = {
  mounted() {
    if (this.el) {
      const mapid = this.el.id;
      const map = L.map(mapid).setView([42.360718, -71.05891], 14);
      L.tileLayer("https://cdn.mbta.com/osm_tiles/{z}/{x}/{y}.png", {}).addTo(
        map
      );
    }
  }
};

export default LeafletMap;
