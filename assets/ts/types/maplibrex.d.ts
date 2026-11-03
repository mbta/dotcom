import type { Map } from "maplibre-gl";

// MaplibreX ships TypeScript sources that can't be type-checked from `deps/`,
// so only the surface used by this app is declared here.
export const MapManager: {
  get(mapId: string): Map | undefined;
};
