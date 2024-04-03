import { LocationItem } from "../__autocomplete";
import { STATE_CHANGE_HANDLERS } from "../helpers";
import { AutocompleteJSPlugin } from "../plugins";
import getGeolocationTemplate from "../templates/geolocation";

/**
 * Generates a plugin for Algolia Autocomplete which enables geolocation. This
 * displays a prompt on search input focus to enable geolocation, executes the
 * geolocation, and on selection navigates to a URL.
 */
export default function createGeolocationPlugin(
  urlType: string = "transit-near-me",
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
    getSources({ query, setIsOpen }) {
      if (!query) {
        return [
          {
            sourceId: "geolocation",
            templates: {
              item: getGeolocationTemplate(setIsOpen, urlType)
            },
            getItemUrl({ item }) {
              return item.url as string;
            },
            getItems() {
              // a hack to make the template appear, no backend is queried in this case
              return [{} as LocationItem];
            }
          }
        ];
      }
      return [];
    }
  };
}
