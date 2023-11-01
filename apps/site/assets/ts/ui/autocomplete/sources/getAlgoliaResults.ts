import { SearchResponse } from "@algolia/client-search";
import { AutocompleteSource } from "@algolia/autocomplete-js";
import { AutocompleteItem, Item } from "../__autocomplete";

type GetAlgoliaResultsFn = (
  algoliaIndexes: string[]
) => AutocompleteSource<Item>["getItems"];

const getAlgoliaResults: GetAlgoliaResultsFn = algoliaIndexes => ({ query }) =>
  fetch("/search/query", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ algoliaQuery: query, algoliaIndexes })
  })
    .then(res => res.json())
    .then(resp =>
      (resp.results as SearchResponse[]).flatMap(({ hits, index }) =>
        hits.map(hit => ({ ...hit, index } as AutocompleteItem))
      )
    );

export default getAlgoliaResults;
