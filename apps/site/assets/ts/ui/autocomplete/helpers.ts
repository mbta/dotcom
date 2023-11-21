import { OnStateChangeProps } from "@algolia/autocomplete-js";
import { ContentItem, Item, RouteItem, StopItem } from "./__autocomplete";
import { isLGDown } from "../../helpers/media-breakpoints";

function isStopItem(x: Item): x is StopItem {
  return Object.keys(x).includes("stop");
}

export function isRouteItem(x: Item): x is RouteItem {
  return Object.keys(x).includes("route");
}

export function isContentItem(x: Item): x is ContentItem {
  return Object.keys(x).includes("_content_type");
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

export function transitNearMeURL(
  latitude: number,
  longitude: number,
  extraParams?: string
): string | null {
  return `/transit-near-me?latitude=${latitude}&longitude=${longitude}${
    extraParams ? `&${extraParams}` : ""
  }`;
}

export const onStateChange: (props: OnStateChangeProps<Item>) => void = ({
  state
}) => {
  // grey out the page and disable scrolling when search is open
  if (isLGDown()) {
    if (state.isOpen) {
      document.documentElement.dataset.navOpen = "true";
    }
  }
};
