import { omit } from "lodash";
import { OnSubmitParams } from "@algolia/autocomplete-core";
import { OnStateChangeProps } from "@algolia/autocomplete-js";
import {
  ContentItem,
  Item,
  LocationItem,
  PopularItem,
  RouteItem,
  SearchResultItem,
  StopItem
} from "./__autocomplete";
import { isLGDown } from "../../helpers/media-breakpoints";

export function isStopItem(x: Item): x is StopItem {
  return Object.keys(x).includes("stop");
}

export function isRouteItem(x: Item): x is RouteItem {
  return Object.keys(x).includes("route");
}

export function isContentItem(x: Item): x is ContentItem {
  return Object.keys(x).includes("_content_type");
}

export function isSearchResultItem(x: Item): x is SearchResultItem {
  // eslint-disable-next-line no-underscore-dangle
  return isContentItem(x) && x._content_type === "search_result";
}

export const getTitleAttribute = (item: Item): string[] => {
  if (isStopItem(item)) {
    return ["stop", "name"];
  }
  if (isRouteItem(item)) {
    return ["route", "name"];
  }

  // @ts-ignore
  // eslint-disable-next-line no-underscore-dangle
  return Object.keys(item._highlightResult);
};

const navStateChange: (props: OnStateChangeProps<Item>) => void = ({
  state
}) => {
  // grey out the page and disable scrolling when search is open
  if (isLGDown()) {
    if (state.isOpen) {
      document.documentElement.dataset.navOpen = "true";
    } else {
      delete document.documentElement.dataset.navOpen;
    }
  }
};

export const STATE_CHANGE_HANDLERS: Record<
  string,
  (props: OnStateChangeProps<Item>) => void
> = {
  nav: navStateChange
};

export const SUBMIT_HANDLERS: Record<
  string,
  (props: OnSubmitParams<Item>) => void
> = {
  to_search_page({ state }) {
    window.Turbolinks.visit(`/search?query=${state.query}`);
  }
};

export type WithUrls<T> = T & { urls: Record<string, string> };

// The backend returns all possible URLs, use urlType to get the desired one
export const itemWithUrl = (
  initialItem: WithUrls<LocationItem | PopularItem>,
  urlType: string
): Omit<typeof initialItem, "urls"> => {
  const item = omit(initialItem, "urls");
  item.url = initialItem.urls[urlType];
  return item;
};
