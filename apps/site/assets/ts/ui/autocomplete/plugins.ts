import { AutocompletePlugin } from "@algolia/autocomplete-js";
import { Item } from "./__autocomplete";
import { debouncePromise } from "../../helpers/debounce";
import createLocationsPlugin from "./plugins/locations";
import createAlgoliaBackendPlugin from "./plugins/algolia";
import createGeolocationPlugin from "./plugins/geolocation";

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
  const { geolocation, locations, algolia } = dataset;
  if (geolocation !== undefined) {
    plugins.push(createGeolocationPlugin());
  }
  if (locations !== undefined) {
    plugins.push(createLocationsPlugin());
  }
  const algoliaIndexes = algolia ? algolia.split(",") : [];
  if (algoliaIndexes.length) {
    plugins.unshift(createAlgoliaBackendPlugin(algoliaIndexes));
  }
  return plugins;
}
