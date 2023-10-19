import { StateUpdater } from "@algolia/autocomplete-core";
import { AutocompleteSource } from "@algolia/autocomplete-js";
import { Hit } from "@algolia/client-search";
import AlgoliaItemTemplate, {
  getGeolocationTemplate,
  getLocationItemTemplate,
  transitNearMeURL
} from "./template";
import {
  AutocompleteItem,
  LocationItem,
  RawAddress,
  SourceItem
} from "./__autocomplete";
import { isContentItem } from "./helpers";
import { ValidAlgoliaIndex } from ".";

export const locationSource: AutocompleteSource<SourceItem> = {
  sourceId: "locations",
  async getItems({ query }): Promise<LocationItem[]> {
    return fetch(`/places/autocomplete/${encodeURIComponent(query)}/2/null`)
      .then(response => response.json())
      .then(async response => {
        const { predictions } = response;
        const addressDataList = JSON.parse(predictions);
        return Promise.all(
          addressDataList.map(async (a: RawAddress) =>
            fetch(`/places/details/${encodeURIComponent(a.address)}`)
              .then(res => res.json())
              .then(res => {
                const { latitude, longitude, formatted } = JSON.parse(
                  res.result
                );
                const url = transitNearMeURL(
                  latitude,
                  longitude,
                  `from=search&query=${query}&address=${encodeURIComponent(
                    formatted
                  )}`
                );

                return {
                  ...a,
                  url
                } as LocationItem;
              })
          )
        );
      })
      .catch(() => []);
  },
  getItemUrl({ item }) {
    return item.url;
  },
  templates: {
    item({ item }) {
      return getLocationItemTemplate(item as LocationItem);
    }
  }
};

export function geolocationSource(
  setIsOpen: StateUpdater<boolean>
): AutocompleteSource<SourceItem> {
  return {
    sourceId: "geolocation",
    getItems() {
      // a hack to make the template appear, no backend is queried in this case
      return [{} as AutocompleteItem];
    },
    templates: {
      item() {
        return getGeolocationTemplate(setIsOpen);
      }
    }
  };
}

export function algoliaSource(
  algoliaIndexes: ValidAlgoliaIndex[]
): AutocompleteSource<SourceItem> {
  return {
    sourceId: "algolia",
    templates: {
      item: AlgoliaItemTemplate
    },
    async getItems({ query: algoliaQuery }) {
      const data = await fetch("/search/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ algoliaQuery, algoliaIndexes })
      })
        .then(res => res.json())
        .then(({ results }) => results)
        .catch(() => {
          return [];
        });

      return data.flatMap((result: { hits: Hit<AutocompleteItem>[] }) => {
        return result.hits;
      });
    },
    getItemUrl({ item }) {
      // eslint-disable-next-line no-underscore-dangle
      return isContentItem(item) ? item._content_url : item.url;
    }
  };
}
