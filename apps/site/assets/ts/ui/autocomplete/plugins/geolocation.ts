import { LocationItem } from "../__autocomplete";
import { AutocompleteJSPlugin } from "../plugins";
import getGeolocationTemplate from "../templates/geolocation";

/**
 * Generates a plugin for Algolia Autocomplete which enables geolocation. This
 * displays a prompt on search input focus to enable geolocation, executes the
 * geolocation, and uses the resulting location to navigate to Transit Near Me.
 */
export default function createGeolocationPlugin(): AutocompleteJSPlugin {
  return {
    getSources({ query, setIsOpen }) {
      if (!query) {
        return [
          {
            sourceId: "geolocation",
            templates: {
              item: getGeolocationTemplate(setIsOpen)
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
