import { Hit, SearchResponse } from "@algolia/client-search";
import getAlgoliaResults from "../autocomplete/sources/getAlgoliaResults";
import getLocations from "../autocomplete/sources/getLocations";
import {
  AutocompleteItem,
  Item,
  LocationItem
} from "../autocomplete/__autocomplete";
import { GetSourcesParams } from "@algolia/autocomplete-core";

const mockLocationPredictions = {
  predictions: JSON.stringify([
    { address: "123 Sesame St", highlighted_spans: {} },
    { address: "50 Wisteria Lane", highlighted_spans: {} },
    { address: "1600 Pennsylvania Ave", highlighted_spans: {} }
  ])
};

const mockAddressDetails = {
  result: JSON.stringify({
    latitude: 1,
    longitude: 2,
    formatted: ""
  })
};

const mockFetch = (returnedData: unknown) => () =>
  new Promise((resolve: Function) =>
    resolve({
      json: () => returnedData,
      ok: true,
      status: 200,
      statusText: "OK"
    })
  );

describe("getLocations", () => {
  beforeEach(() => {
    window.fetch = jest
      .fn()
      .mockImplementationOnce(mockFetch(mockLocationPredictions))
      .mockImplementation(mockFetch(mockAddressDetails));
  });

  test("makes GET request to backend", async () => {
    await getLocations({ query: "some area" } as GetSourcesParams<Item>);
    expect(window.fetch).toHaveBeenCalledWith(
      "/places/autocomplete/some%20area/2/null"
    );
  });

  test("returns results with URLs to transit near me", async () => {
    const response = await getLocations({
      query: "this place"
    } as GetSourcesParams<Item>);
    const urls = (response as LocationItem[]).map(r => r.url);
    urls.forEach(u => {
      expect(u).toStartWith("/transit-near-me?");
      expect(u).toContain("&query=this%20place");
    });
  });
});

const mockAlgoliaResponse = {
  results: [
    {
      hits: [{ objectID: "1" }, { objectID: "2" }] as Hit<{}>[],
      index: "anAlgoliaIndex"
    },
    {
      hits: [
        { objectID: "a" },
        { objectID: "b" },
        { objectID: "c" }
      ] as Hit<{}>[],
      index: "anotherAlgoliaIndex"
    }
  ] as SearchResponse[]
};

describe("getAlgoliaResults", () => {
  beforeAll(() => {
    window.fetch = jest.fn().mockImplementation(mockFetch(mockAlgoliaResponse));
  });

  test("makes POST request to backend", async () => {
    await getAlgoliaResults(["anAlgoliaIndex", "anotherAlgoliaIndex"])({
      query: "doesn't matter"
    } as GetSourcesParams<Item>);
    expect(window.fetch).toHaveBeenCalledWith("/search/query", {
      body:
        '{"algoliaQuery":"doesn\'t matter","algoliaIndexes":["anAlgoliaIndex","anotherAlgoliaIndex"]}',
      headers: { "Content-Type": "application/json" },
      method: "POST"
    });
  });
  test("adds index to individual hit result", async () => {
    const hits = await getAlgoliaResults([
      "anAlgoliaIndex",
      "anotherAlgoliaIndex"
    ])({ query: "doesn't matter" } as GetSourcesParams<Item>);
    expect((hits as AutocompleteItem[]).map(hit => hit.index)).toEqual([
      "anAlgoliaIndex",
      "anAlgoliaIndex",
      "anotherAlgoliaIndex",
      "anotherAlgoliaIndex",
      "anotherAlgoliaIndex"
    ]);
  });
});
