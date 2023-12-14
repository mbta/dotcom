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

const mockLocations = {
  result: [
    {
      address: "123 Sesame St",
      highlighted_spans: {},
      latitude: 1,
      longitude: 2,
      urls: {
        "transit-near-me": "/transit-near-me/1/2",
        "retail-sales-locations": "/retail/1/2",
        "proposed-sales-locations": "/proposed/1/2"
      }
    },
    {
      address: "50 Wisteria Lane",
      highlighted_spans: {},
      latitude: 3,
      longitude: 4,
      urls: {
        "transit-near-me": "/transit-near-me/3/4",
        "retail-sales-locations": "/retail/3/4",
        "proposed-sales-locations": "/proposed/3/4"
      }
    },
    {
      address: "1600 Pennsylvania Ave",
      highlighted_spans: {},
      latitude: 5,
      longitude: 6,
      urls: {
        "transit-near-me": "/transit-near-me/5/6",
        "retail-sales-locations": "/retail/5/6",
        "proposed-sales-locations": "/proposed/5/6"
      }
    }
  ]
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
    beforeAll(() => {
      window.fetch = jest.fn().mockImplementation(mockFetch(mockLocations));
    });

    test("does nothing without a query", () => {
      const params = {} as GetSourcesParams<Item>;
      const { getSources } = createLocationsPlugin(3);
      expect(getSources!(params)).toEqual([]);
    });

    test("makes GET request to backend", async () => {
      const params = {
        query: "some area"
      } as GetSourcesParams<Item>;
      const { getSources } = createLocationsPlugin(3);
      const sources = (await getSources!(params)) as AutocompleteSource<Item>[];
      await sources[0].getItems(params);
      expect(window.fetch).toHaveBeenCalledWith("/places/search/some%20area/3");
    });

    test("returns results with URLs to chosen URL type", async () => {
      const params = {
        query: "this place"
      } as GetSourcesParams<Item>;
      const { getSources } = createLocationsPlugin(3, "transit-near-me");
      const sources = (await getSources!(params)) as AutocompleteSource<Item>[];
      const response = await sources[0].getItems(params);
      (response as LocationItem[]).forEach(location => {
        expect(location.url).toContain("/transit-near-me");
      });
    });
  });

  describe("geolocation", () => {
    beforeAll(() => {
      window.fetch = jest.fn().mockImplementation(
        mockFetch({
          result: {
            address: "51.1, 45.3",
            highlighted_spans: {},
            latitude: 51.1,
            longitude: 45.3,
            urls: {
              "transit-near-me": "/transit-near-me/51.1/45.3",
              "retail-sales-locations": "/retail/51.1/45.3",
              "proposed-sales-locations": "/proposed/51.1/45.3"
            }
          }
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
    });

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
      const { getSources } = createGeolocationPlugin("retail-sales-locations");
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
      fireEvent.click(screen.getByRole("button"));
      await waitFor(() => {
        expect(
          window.navigator.geolocation.getCurrentPosition
        ).toHaveBeenCalled();
        expect(window.Turbolinks.visit).toHaveBeenCalledWith(
          "/retail/51.1/45.3"
        );
      });
    });
  });
});
