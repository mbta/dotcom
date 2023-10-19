import {
  MBTAItemType,
  ContentItem,
  RouteItem,
  SourceItem,
  StopItem
} from "./__autocomplete";

function isStopItem(x: SourceItem): x is StopItem {
  return Object.keys(x).includes("stop");
}

export function isRouteItem(x: SourceItem): x is RouteItem {
  return Object.keys(x).includes("route");
}

export function isContentItem(x: SourceItem): x is ContentItem {
  return Object.keys(x).includes("_content_type");
}

/**
 * @param {SourceItem} item - A result retreived from the autocomplete
 * @returns The surmised type of data represented in the `item`.
 */
export const getItemType = (item: SourceItem): MBTAItemType => {
  if (isStopItem(item)) return "stops";
  if (isRouteItem(item)) return "routes";
  if (isContentItem(item)) return "drupal";
  return "locations";
};

/**
 * @param {SourceItem} item - A result retreived from the autocomplete
 * @returns The path of the attribute to be highlighted in a
 * `AutocompleteComponents` type component.
 */
export const getTitleAttribute = (item: SourceItem): string[] => {
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
