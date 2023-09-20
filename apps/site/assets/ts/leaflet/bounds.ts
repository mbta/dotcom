import { LatLng, latLng, LatLngBounds, latLngBounds } from "leaflet";
import { MapMarker as Marker } from "./components/__mapdata";

const getBounds = (markers: Marker[]): LatLngBounds | undefined => {
  if (!markers.length) return undefined;
  const points: LatLng[] = markers.map(m => latLng(m.latitude, m.longitude));
  return latLngBounds(points);
};

export default getBounds;
