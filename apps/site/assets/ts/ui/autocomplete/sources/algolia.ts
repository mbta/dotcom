/* eslint-disable import/prefer-default-export */
import { forEach, set } from "lodash";
import { AutocompleteSource } from "@algolia/autocomplete-js";
import { Hit } from "@algolia/client-search";
import projectsRequest from "../requests/projects.json";
import searchRequest from "../requests/search.json";
import standardRequest from "../requests/standard.json";
import stopRequest from "../requests/stops.json";
import {
  AutocompleteItem,
  SourceItem,
  ValidSearchType
} from "../__autocomplete";
import AlgoliaItemTemplate from "../template";
import { isContentItem } from "../helpers/type-guards";

const requestForType = {
  locations: stopRequest,
  standard: standardRequest,
  search_page: searchRequest,
  projects_page: projectsRequest
};

function requestBodyForSource(query: string, type: ValidSearchType): BodyInit {
  const body = requestForType[type];
  const withQuery = forEach(body.requests, item => {
    set(item, "query", query);
  });
  return JSON.stringify({ requests: withQuery });
}

/**
 * @param {ValidSearchType} searchType - The type of autocomplete.
 * @returns {AutocompleteSource<SourceItem>} A configuration object representing
 * the source for the autocomplete, for fetching and rendering data from one or
 * more Algolia indexes.
 */
export const algoliaSource = (
  searchType: ValidSearchType
): AutocompleteSource<SourceItem> => ({
  sourceId: "algolia",
  templates: {
    item: AlgoliaItemTemplate
  },
  async getItems({ query }) {
    const data = await fetch("/search/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: requestBodyForSource(query, searchType)
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
});
