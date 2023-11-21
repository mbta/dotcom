import { GetSourcesParams, StateUpdater } from "@algolia/autocomplete-core";
import { AutocompleteSource, GetSources } from "@algolia/autocomplete-js";
import { AutocompleteItem, Item, LocationItem } from "./__autocomplete";
import getLocationItemTemplate from "./templates/location";
import getGeolocationTemplate from "./templates/geolocation";
import AlgoliaItemTemplate from "./templates/algolia";
import getLocations from "./sources/getLocations";
import getAlgoliaResults from "./sources/getAlgoliaResults";
import { debouncePromise } from "../../helpers/debounce";

const locationSource: AutocompleteSource<Item> = {
  sourceId: "locations",
  getItems: getLocations,
  getItemUrl({ item }) {
    return (item as LocationItem).url;
  },
  templates: {
    item: getLocationItemTemplate
  }
};

function geolocationSource(
  setIsOpen: StateUpdater<boolean>
): AutocompleteSource<Item> {
  return {
    sourceId: "geolocation",
    getItems() {
      // a hack to make the template appear, no backend is queried in this case
      return [{} as AutocompleteItem];
    },
    templates: {
      item: getGeolocationTemplate(setIsOpen)
    }
  };
}

function algoliaSource(algoliaIndexes: string[]): AutocompleteSource<Item> {
  return {
    sourceId: "algolia",
    templates: {
      item: AlgoliaItemTemplate
    },
    getItems: getAlgoliaResults(algoliaIndexes)
  };
}

// prevent search for firing too frequently
const debouncedSources = debouncePromise(
  (items: Item[]) => Promise.resolve<Item[]>(items),
  300
);

type GetSourcesFn = (
  dataset: DOMStringMap,
  options: GetSourcesParams<Item>
) => ReturnType<GetSources<Item>>;
const getSources: GetSourcesFn = (
  { geolocation, locations, algolia },
  { query, setIsOpen }
) => {
  const sources = [];
  const defaultSources = [];
  const algoliaIndexes = algolia ? algolia.split(",") : [];
  if (geolocation !== undefined) {
    defaultSources.push(geolocationSource(setIsOpen));
  }

  if (!query) {
    return defaultSources;
  }
  if (locations !== undefined) {
    sources.push(locationSource);
  }
  if (algoliaIndexes.length) {
    sources.unshift(algoliaSource(algoliaIndexes));
  }
  return debouncedSources(sources);
};

export default getSources;
