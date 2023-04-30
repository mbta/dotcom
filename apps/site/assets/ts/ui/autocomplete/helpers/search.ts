import { MBTAItemType, SourceItem, ValidSearchType } from "../__autocomplete.d";
import {
  isContentItem,
  isLocationItem,
  isPopularLocationItem,
  isRouteItem,
  isStopItem
} from "./type-guards";

export const searchTypes = [
  "locations",
  "standard",
  "search_page",
  "projects_page"
] as const;

/**
 * @param {ValidSearchType} searchType - The type of autocomplete
 * @returns The placeholder text for the autocomplete input.
 */
export function placeholderForType(searchType: ValidSearchType): string {
  switch (searchType) {
    case "locations":
      return "Enter a location";
    case "search_page":
      return "Search for routes, places, information and more";
    case "projects_page":
      return "Enter keyword(s)";
    default:
      return "Search for routes, info, and more";
  }
}

/**
 * @param {SourceItem} item - A result retreived from the autocomplete
 * @returns The surmised type of data represented in the `item`.
 */
export const getItemType = (item: SourceItem): MBTAItemType => {
  if (isStopItem(item)) return "stops";
  if (isRouteItem(item)) return "routes";
  if (isPopularLocationItem(item)) return "popular";
  if (isLocationItem(item)) return "locations";

  if (isContentItem(item)) {
    // eslint-disable-next-line no-underscore-dangle
    switch (item._content_type) {
      case "project_update":
      case "project":
        return "projects";

      case "news_entry":
        return "news";

      case "event":
        return "events";

      case "page":
        return "pages";

      default:
        if (item.file_name_raw) return "documents";
        return "drupal";
    }
  }
  return "drupal";
};

/**
 * @param {SourceItem} item - A result retreived from the autocomplete
 * @param {MBTAItemType} type - The surmised type of data represented in the
 * `item`.
 * @returns The path of the attribute to be highlighted in a
 * `AutocompleteComponents` type component.
 */
export const getTitleAttribute = (
  item: SourceItem,
  type: MBTAItemType
): string[] => {
  if (isStopItem(item)) {
    return ["stop", "name"];
  }
  if (isRouteItem(item)) {
    return ["route", "name"];
  }

  if (isContentItem(item)) {
    switch (type) {
      case "drupal":
      case "projects":
      case "pages":
      case "documents":
      case "events":
      case "news":
        // eslint-disable-next-line no-underscore-dangle
        if (item._content_type === "search_result") {
          return ["search_result_title"];
        }
        if (item.search_api_datasource === "entity:file") {
          return ["file_name_raw"];
        }
        return ["content_title"];

      default:
        return ["name"];
    }
  }

  return ["name"];
};
