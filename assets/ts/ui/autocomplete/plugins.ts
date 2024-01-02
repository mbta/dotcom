import { AutocompletePlugin } from "@algolia/autocomplete-js";
import { Item } from "./__autocomplete";
import { debouncePromise } from "../../helpers/debounce";
import createLocationsPlugin from "./plugins/locations";
import createAlgoliaBackendPlugin from "./plugins/algolia";
import createGeolocationPlugin from "./plugins/geolocation";
import createPopularLocationsPlugin from "./plugins/popular";

export type AutocompleteJSPlugin = Partial<AutocompletePlugin<Item, {}>>;

// prevent search from firing too frequently
export const debounced = debouncePromise(
  (items: Item[]) => Promise.resolve<Item[]>(items),
  300
);

export default function getPlugins(
  dataset: DOMStringMap
): AutocompleteJSPlugin[] {
  const plugins = [];
  const {
    geolocation,
    popularLocations,
    locationsCount,
    locationsUrlType,
    algolia
  } = dataset;
  if (geolocation !== undefined) {
    plugins.push(createGeolocationPlugin(locationsUrlType));
  }
  if (locationsCount !== undefined) {
    const numberOfLocations = parseInt(locationsCount, 10) || 3;
    plugins.push(createLocationsPlugin(numberOfLocations, locationsUrlType));
  }
  if (popularLocations !== undefined) {
    plugins.push(createPopularLocationsPlugin(locationsUrlType));
  }
  const algoliaIndexes = algolia ? algolia.split(",") : [];
  if (algoliaIndexes.length) {
    plugins.unshift(createAlgoliaBackendPlugin(algoliaIndexes));
  }
  return plugins;
}
