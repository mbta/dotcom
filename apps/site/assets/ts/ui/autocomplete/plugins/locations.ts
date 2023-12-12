import { LocationItem } from "../__autocomplete";
import { transitNearMeURL } from "../helpers";
import { AutocompleteJSPlugin, debounced } from "../plugins";
import LocationItemTemplate from "../templates/location";

/**
 * Generates a plugin for Algolia Autocomplete which enables searching for
 * geographic locations given a user-input string. Results are rendered with a
 * location 'pin' icon, with matching text depicted in bold. Links will navigate
 * to Transit Near Me.
 */
export default function createLocationsPlugin(): AutocompleteJSPlugin {
  return {
    getSources({ query }) {
      if (query) {
        return debounced([
          {
            sourceId: "locations",
            templates: {
              item: LocationItemTemplate
            },
            getItems() {
              return fetch(
                `/places/autocomplete/${encodeURIComponent(query)}/2/null`
              )
                .then(response => response.json())
                .then(async response => {
                  const { predictions } = response;
                  const addressDataList = JSON.parse(predictions);
                  return Promise.all(
                    addressDataList.map(
                      (
                        a: Pick<LocationItem, "highlighted_spans" | "address">
                      ) =>
                        fetch(
                          `/places/details/${encodeURIComponent(a.address)}`
                        )
                          .then(res => res.json())
                          .then(res => {
                            const {
                              latitude,
                              longitude,
                              formatted
                            } = JSON.parse(res.result);
                            const url = transitNearMeURL(
                              latitude,
                              longitude,
                              `from=search&query=${encodeURIComponent(
                                query
                              )}&address=${encodeURIComponent(formatted)}`
                            );

                            return {
                              ...a,
                              url
                            } as LocationItem;
                          })
                    )
                  );
                });
            }
          }
        ]);
      }
      return [];
    }
  };
}
