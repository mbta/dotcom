import { fetchJsonOrThrow } from "../../../helpers/fetch-json";
import { Item, PopularItem } from "../__autocomplete";
import { WithUrls, itemWithUrl } from "../helpers";
import { AutocompleteJSPlugin, debounced } from "../plugins";
import PopularItemTemplate from "../templates/popular";

/**
 * Generates a plugin for Algolia Autocomplete which displays a list of popular
 * locations on search input focus, and on selection navigates to a URL.
 */
export default function createPopularLocationsPlugin(
  urlType: string = "transit-near-me"
): AutocompleteJSPlugin {
  return {
    getSources({ query }) {
      if (!query) {
        return debounced([
          {
            sourceId: "popular",
            templates: {
              item: PopularItemTemplate
            },
            getItemUrl({ item }: { item: Item }) {
              return item.url as string;
            },
            async getItems() {
              const { result: locations } = await fetchJsonOrThrow<{
                result: WithUrls<PopularItem>[];
              }>("/places/popular");
              return locations.map(location => itemWithUrl(location, urlType));
            }
          }
        ]);
      }
      return [];
    }
  };
}
