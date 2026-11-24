import { MapHooks } from "maplibrex";
import { ViewHook } from "phoenix_live_view";

const MAPLIBREX_STATE = "_maplibrex";

interface MapHookState {
  map: { setStyle: (style: unknown) => unknown };
  config: { style?: unknown };
}

type MapHookInstance = ViewHook & { [MAPLIBREX_STATE]?: MapHookState };

/**
 * Wraps MaplibreX's map hook so that a patch of the map element doesn't reset
 * the style when the style hasn't changed.
 *
 * MaplibreX compares the previous and new style with `!==`. For a style object
 * (as opposed to a URL) the freshly parsed config never equals the old one, so
 * every patch, including the one that follows a LiveView reconnect, calls
 * `map.setStyle` and wipes out all of the sources and layers added since.
 */
const callOriginalUpdated = (hook: MapHookInstance): void =>
  (MapHooks.MapHook.updated as (this: MapHookInstance) => void).call(hook);

const MapHookWithStableStyle = {
  ...MapHooks.MapHook,

  updated(this: MapHookInstance) {
    const state = this[MAPLIBREX_STATE];
    const rawConfig = this.el.dataset.config;
    const styleUnchanged =
      !!state &&
      !!rawConfig &&
      JSON.stringify(JSON.parse(rawConfig).style) ===
        JSON.stringify(state.config.style);

    if (!state || !styleUnchanged) {
      callOriginalUpdated(this);
      return;
    }

    const { map } = state;
    // Shadow the prototype method for the duration of the call only
    map.setStyle = () => map;
    try {
      callOriginalUpdated(this);
    } finally {
      delete (map as Partial<typeof map>).setStyle;
    }
  }
};

export default MapHookWithStableStyle;
