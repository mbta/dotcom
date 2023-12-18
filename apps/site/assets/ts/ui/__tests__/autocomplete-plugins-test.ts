import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Hit, SearchResponse } from "@algolia/client-search";
import { GetSourcesParams } from "@algolia/autocomplete-core";
import {
  AutocompleteSource,
  AutocompleteState,
  SourceTemplates
} from "@algolia/autocomplete-js";
import createAlgoliaBackendPlugin from "../autocomplete/plugins/algolia";
import createLocationsPlugin from "../autocomplete/plugins/locations";
import createGeolocationPlugin from "../autocomplete/plugins/geolocation";
import {
  AutocompleteItem,
  Item,
  LocationItem
} from "../autocomplete/__autocomplete";

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

describe("Algolia v1 plugins", () => {
  describe("algoliaBackend", () => {
    beforeAll(() => {
      window.fetch = jest
        .fn()
        .mockImplementation(mockFetch(mockAlgoliaResponse));
    });

    test("does nothing without a query", () => {
      const params = {} as GetSourcesParams<Item>;
      const { getSources } = createAlgoliaBackendPlugin([
        "anAlgoliaIndex",
        "anotherAlgoliaIndex"
      ]);
      expect(getSources!(params)).toEqual([]);
    });

    test("getItems makes POST request to backend", async () => {
      const params = {
        query: "doesn't matter"
      } as GetSourcesParams<Item>;
      const { getSources } = createAlgoliaBackendPlugin([
        "anAlgoliaIndex",
        "anotherAlgoliaIndex"
      ]);
      const sources = (await getSources!(params)) as AutocompleteSource<Item>[];
      await sources[0].getItems(params);
      expect(window.fetch).toHaveBeenCalledWith("/search/query", {
        body:
          '{"algoliaQuery":"doesn\'t matter","algoliaIndexes":["anAlgoliaIndex","anotherAlgoliaIndex"]}',
        headers: { "Content-Type": "application/json" },
        method: "POST"
      });
    });

    test("getItems adds index to individual hit result", async () => {
      const params = {
        query: "doesn't matter"
      } as GetSourcesParams<Item>;
      const { getSources } = createAlgoliaBackendPlugin([
        "anAlgoliaIndex",
        "anotherAlgoliaIndex"
      ]);
      const sources = (await getSources!(params)) as AutocompleteSource<Item>[];
      const hits = (await sources[0].getItems(params)) as AutocompleteItem[];
      expect(hits.map(hit => hit.index)).toEqual([
        "anAlgoliaIndex",
        "anAlgoliaIndex",
        "anotherAlgoliaIndex",
        "anotherAlgoliaIndex",
        "anotherAlgoliaIndex"
      ]);
    });
  });

  describe("locations", () => {
    beforeEach(() => {
      window.fetch = jest
        .fn()
        .mockImplementationOnce(mockFetch(mockLocationPredictions))
        .mockImplementation(mockFetch(mockAddressDetails));
    });

    test("does nothing without a query", () => {
      const params = {} as GetSourcesParams<Item>;
      const { getSources } = createLocationsPlugin();
      expect(getSources!(params)).toEqual([]);
    });

    test("makes GET request to backend", async () => {
      const params = {
        query: "some area"
      } as GetSourcesParams<Item>;
      const { getSources } = createLocationsPlugin();
      const sources = (await getSources!(params)) as AutocompleteSource<Item>[];
      await sources[0].getItems(params);
      expect(window.fetch).toHaveBeenCalledWith(
        "/places/autocomplete/some%20area/2/null"
      );
    });

    test("returns results with URLs to transit near me", async () => {
      const params = {
        query: "this place"
      } as GetSourcesParams<Item>;
      const { getSources } = createLocationsPlugin();
      const sources = (await getSources!(params)) as AutocompleteSource<Item>[];
      const response = await sources[0].getItems(params);
      const urls = (response as LocationItem[]).map(r => r.url);
      urls.forEach(u => {
        expect(u).toStartWith("/transit-near-me?");
        expect(u).toContain("&query=this%20place");
      });
    });
  });

  describe("geolocation", () => {
    test("return source defining template", async () => {
      const templateItem = {} as LocationItem;
      const params = {
        setIsOpen: value => {}
      } as GetSourcesParams<Item>;
      const { getSources } = createGeolocationPlugin();
      const sources = (await getSources!(params)) as AutocompleteSource<Item>[];
      const item = await sources[0].getItems(params);
      expect(item).toEqual([{}]); // it's a noop
      const itemTemplate = sources[0].templates.item as SourceTemplates<
        Item
      >["item"];
      expect(itemTemplate).toBeDefined();
      render(
        //  @ts-ignore
        itemTemplate({
          item: templateItem,
          state: {
            isOpen: true
          } as AutocompleteState<Item>
        })
      );
      const promptButton = screen.getByRole("button", {
        name: "Use my location to find transit near me"
      });
      expect(promptButton).toBeDefined();
    });

    test("doesn't return source if there's a query", async () => {
      const params = {
        query: "looking for something"
      } as GetSourcesParams<Item>;
      const { getSources } = createGeolocationPlugin();
      const sources = (await getSources!(params)) as AutocompleteSource<Item>[];
      expect(sources).toEqual([]);
    });

    test("finds geolocation and navigates to URL", async () => {
      const params = {
        setIsOpen: value => {}
      } as GetSourcesParams<Item>;
      const { getSources } = createGeolocationPlugin();
      const sources = (await getSources!(params)) as AutocompleteSource<Item>[];
      const itemTemplate = sources[0].templates.item as SourceTemplates<
        Item
      >["item"];
      expect(itemTemplate).toBeDefined();
      render(
        //  @ts-ignore
        itemTemplate({
          item: {} as LocationItem,
          state: {
            isOpen: true
          } as AutocompleteState<Item>
        })
      );
      const mockGeolocation = {
        getCurrentPosition: jest.fn().mockImplementationOnce(success =>
          Promise.resolve(
            success({
              coords: {
                latitude: 51.1,
                longitude: 45.3
              }
            })
          )
        )
      };
      (global as any).navigator.geolocation = mockGeolocation;
      (global as any).Turbolinks = { visit: jest.fn() };
      fireEvent.click(screen.getByRole("button"));
      await waitFor(() => {
        expect(
          window.navigator.geolocation.getCurrentPosition
        ).toHaveBeenCalled();
        expect(window.Turbolinks.visit).toHaveBeenCalledWith(
          "/transit-near-me?latitude=51.1&longitude=45.3"
        );
      });
    });
  });
});
