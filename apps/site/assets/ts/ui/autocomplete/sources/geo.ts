import { StateUpdater } from "@algolia/autocomplete-core";
import { AutocompleteSource } from "@algolia/autocomplete-js";
import {
  getGeolocationTemplate,
  getLocationItemTemplate,
  getPopularItemTemplate
} from "../template";
import popularPlaces from "./popular.json";
import {
  AutocompleteItem,
  LocationItem,
  PopularLocationItem,
  RawAddress,
  SourceItem,
  ValidSearchType
} from "../__autocomplete";

export function transitNearMeURL(
  latitude: number,
  longitude: number,
  extraParams?: string
): string | null {
  return `/transit-near-me?latitude=${latitude}&longitude=${longitude}&${extraParams &&
    extraParams}`;
}

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
  type: ValidSearchType,
  setIsOpen: StateUpdater<boolean>
): AutocompleteSource<SourceItem> {
  return {
    sourceId: "geolocation",
    getItems() {
      // a hack to make the template appear, no backend is queried in this case
      return [{} as AutocompleteItem];
    },
    getItemInputValue: () => "",
    templates: {
      item() {
        return getGeolocationTemplate(type, setIsOpen);
      }
    }
  };
}

export const popularLocationsSource: AutocompleteSource<SourceItem> = {
  sourceId: "popular",
  getItems() {
    return popularPlaces.map(
      (item): PopularLocationItem => {
        const { latitude, longitude, name } = item;
        const url = transitNearMeURL(
          latitude,
          longitude,
          `from=search&query=${name}`
        );

        return {
          ...item,
          url: url!
        };
      }
    );
  },
  getItemInputValue: () => "",
  templates: {
    item({ item }) {
      return getPopularItemTemplate(item as PopularLocationItem);
    }
  }
};
