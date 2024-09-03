import { OnInputParams } from "@algolia/autocomplete-core";
import {
  algoliaSource,
  geolocationSource,
  locationSource,
  popularLocationSource
} from "../sources";
import { AutocompleteItem, LocationItem, PopularItem } from "../__autocomplete";

const setIsOpenMock = jest.fn();

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([])
    })
  ) as jest.Mock;
});
afterEach(() => jest.resetAllMocks());

describe("geolocationSource", () => {
  test("defines a template", () => {
    expect(geolocationSource(setIsOpenMock).templates.item).toBeTruthy();
  });
  test("defines a getItems function", () => {
    expect(
      geolocationSource(setIsOpenMock).getItems(
        {} as OnInputParams<LocationItem>
      )
    ).toBeTruthy();
  });
  test("has optional getItemUrl", () => {
    expect(geolocationSource(setIsOpenMock)).not.toContainKey("getItemUrl");
    expect(
      geolocationSource(setIsOpenMock, "proposed-sales-locations")
    ).toContainKey("getItemUrl");
  });
});

describe("locationSource", () => {
  test("defines a template", () => {
    expect(locationSource("any query", 2).templates.item).toBeTruthy();
  });
  test("defines a getItems function", () => {
    const query = "some cool place";
    const numResults = 5;
    expect(
      locationSource(query, numResults).getItems({ query } as OnInputParams<
        LocationItem
      >)
    ).toBeTruthy();
    expect(global.fetch).toHaveBeenCalledWith(
      `/places/search/${encodeURI(query)}/${numResults}`
    );
  });
  test("has optional getItemUrl", () => {
    expect(locationSource("any query", 4)).not.toContainKey("getItemUrl");
    expect(locationSource("any query", 5, "transit-near-me")).toContainKey(
      "getItemUrl"
    );
  });
});

describe("popularLocationSource", () => {
  test("defines a template", () => {
    expect(popularLocationSource().templates.item).toBeTruthy();
  });
  test("defines a getItems function", () => {
    expect(
      popularLocationSource().getItems({ query: "" } as OnInputParams<
        PopularItem
      >)
    ).toBeTruthy();
    expect(global.fetch).toHaveBeenCalledWith("/places/popular");
  });
  test("has optional getItemUrl", () => {
    expect(popularLocationSource()).not.toContainKey("getItemUrl");
    expect(popularLocationSource("retail-sales-locations")).toContainKey(
      "getItemUrl"
    );
  });
});

describe("algoliaSource", () => {
  test("defines a template", () => {
    expect(algoliaSource("query", {}).templates.item).toBeTruthy();
  });
  test("defines a getItems function", () => {
    const query = "new project";
    const indexes = { drupal_test: {} };
    expect(
      algoliaSource(query, indexes).getItems({ query } as OnInputParams<
        AutocompleteItem
      >)
    ).toBeTruthy();
    expect(global.fetch).toHaveBeenCalledWith("/search/query", {
      body: JSON.stringify({
        algoliaQuery: query,
        algoliaIndexesWithParams: indexes
      }),
      headers: { "Content-Type": "application/json" },
      method: "POST"
    });
  });
  test("has optional getItemUrl", () => {
    expect(
      algoliaSource("question", { stops: { hitsPerPage: 7 } }, false)
    ).not.toContainKey("getItemUrl");
    expect(
      algoliaSource("question", { stops: { hitsPerPage: 7 } })
    ).toContainKey("getItemUrl");
  });
});
