import { ViewHook } from "phoenix_live_view";

interface FitBoundsPayload {
  map_id: string; // eslint-disable-line camelcase
  bounds: [[number, number], [number, number]];
  padding?: number;
  max_zoom?: number; // eslint-disable-line camelcase
}

/**
 * Hook that lets the server fit a MaplibreX map to a set of bounds with
 * `push_event(socket, "fit-bounds", %{map_id: ..., bounds: ..., padding: ..., max_zoom: ...})`.
 *
 * It forwards the request to the map as MaplibreX's own `maplibrex:fit_bounds`
 * event, so it behaves the same as `MaplibreX.Components.Map.fit_bounds/3`.
 */
const FitBounds: Partial<ViewHook> = {
  mounted(this: ViewHook) {
    this.handleEvent(
      "fit-bounds",
      ({
        map_id: mapId,
        bounds,
        padding,
        max_zoom: maxZoom
      }: FitBoundsPayload) => {
        document.getElementById(mapId)?.dispatchEvent(
          new CustomEvent("maplibrex:fit_bounds", {
            detail: { bounds, padding, maxZoom }
          })
        );
      }
    );
  }
};

export default FitBounds;
