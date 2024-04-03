import { fetchJsonOrThrow } from "../../../helpers/fetch-json";
import { Item, LocationItem } from "../__autocomplete";
import { STATE_CHANGE_HANDLERS, WithUrls, itemWithUrl } from "../helpers";
import { AutocompleteJSPlugin, debounced } from "../plugins";
import LocationItemTemplate from "../templates/location";

/**
 * Generates a plugin for Algolia Autocomplete which enables searching for a
 * specified number geographic locations given a user-input string. Results are
 * rendered with a location 'pin' icon, with matching text depicted in bold. On
 * selection, navigates to a URL.
 */
export default function createLocationsPlugin(
  numResults: number,
  urlType: string = "transit_near_me",
  stateChangeListener: string | undefined
): AutocompleteJSPlugin {
  return {
    subscribe({ onActive }) {
      onActive(props => {
        if (stateChangeListener) {
          STATE_CHANGE_HANDLERS[`${stateChangeListener}`](props);
        }
      });
    },
    getSources({ query }) {
      if (query) {
        return debounced([
          {
            sourceId: "locations",
            templates: {
              item: LocationItemTemplate
            },
            getItemUrl({ item }: { item: Item }) {
              return item.url as string;
            },
            async getItems() {
              const { result: locations } = await fetchJsonOrThrow<{
                result: WithUrls<LocationItem>[];
              }>(`/places/search/${encodeURIComponent(query)}/${numResults}`);
              return locations.map(location => itemWithUrl(location, urlType));
            }
          }
        ]);
      }
      return [];
    }
  };
}
