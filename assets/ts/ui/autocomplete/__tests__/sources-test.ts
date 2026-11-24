import {
  AutocompleteState,
  OnInputParams,
  OnSelectParams,
  StateUpdater
} from "@algolia/autocomplete-core";
import { waitFor } from "@testing-library/dom";
import { AutocompleteItem, LocationItem, PopularItem } from "../__autocomplete";
import { UrlType } from "../helpers";
import {
  algoliaSource,
  geolocationSource,
  locationSource,
  popularLocationSource
} from "../sources";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([])
    })
  ) as jest.Mock;
});
afterEach(() => jest.resetAllMocks());

const mockCoords = {
  latitude: 40,
  longitude: -71
};
const mockUrlsResponse = {
  result: {
    urls: {
      "retail-sales-locations": `/fares/retail-sales-locations?latitude=${mockCoords.latitude}&longitude=${mockCoords.longitude}`,
      "proposed-sales-locations": `/fare-transformation/proposed-sales-locations?latitude=${mockCoords.latitude}&longitude=${mockCoords.longitude}`
    },
    longitude: mockCoords.longitude,
    latitude: mockCoords.latitude
  }
};

function setMocks(geoSuccess: boolean, fetchSuccess: boolean): void {
  const getCurrentPositionMock = geoSuccess
    ? jest.fn().mockImplementationOnce(success =>
        Promise.resolve(
          success({
            coords: mockCoords
          })
        )
      )
    : jest
        .fn()
        .mockImplementationOnce((success, error) =>
          Promise.resolve(error({ code: 1, message: "GeoLocation Error" }))
        );

  (global.navigator as any).geolocation = {
    getCurrentPosition: getCurrentPositionMock
  };

  if (fetchSuccess) {
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockUrlsResponse)
    } as Response);
  } else {
    jest.spyOn(global, "fetch").mockRejectedValue({
      ok: false,
      status: 404
    });
  }
}

describe("geolocationSource", () => {
  Object.defineProperty(window, "location", {
    value: {
      assign: jest.fn()
    }
  });

  test("defines a template", () => {
    expect(geolocationSource().templates.item).toBeTruthy();
  });
  test("defines a getItems function", () => {
    expect(
      geolocationSource().getItems({} as OnInputParams<{ value: string }>)
    ).toBeTruthy();
  });
  test("has optional getItemUrl", () => {
    expect(geolocationSource("proposed-sales-locations")).toContainKey(
      "getItemUrl"
    );
  });
  describe("onSelect", () => {
    function setupGeolocationSource(
      urlType?: UrlType,
      onLocationFound?: () => void
    ) {
      const source = geolocationSource(urlType, onLocationFound);
      const setContextMock = jest.fn();
      const setQueryMock = jest.fn();
      const onSelectParams = {
        setContext: setContextMock as StateUpdater<
          AutocompleteState<{ value: string }>["context"]
        >,
        setQuery: setQueryMock as StateUpdater<
          AutocompleteState<{ value: string }>["query"]
        >
      } as OnSelectParams<{ value: string }>;
      return { source, onSelectParams };
    }

    test("redirects to a URL on success", async () => {
      setMocks(true, true);
      const { source, onSelectParams } = setupGeolocationSource(
        "retail-sales-locations"
      );
      expect(source.getItems({} as OnInputParams<{ value: string }>)).toEqual([
        { value: "Use my location" }
      ]);
      source.onSelect!(onSelectParams);

      await waitFor(() => {
        expect(onSelectParams.setQuery).toHaveBeenCalledWith(
          "Getting your location..."
        );
        expect(global.fetch).toHaveBeenCalledWith(
          `/places/urls?latitude=${mockCoords.latitude}&longitude=${mockCoords.longitude}`
        );
        expect(window.location.assign).toHaveBeenCalledExactlyOnceWith(
          `/fares/retail-sales-locations?latitude=${mockCoords.latitude}&longitude=${mockCoords.longitude}`
        );
      });
    });
    test("fires onLocationFound on success", async () => {
      setMocks(true, true);
      const onLocationFoundMock = jest.fn();
      const { source, onSelectParams } = setupGeolocationSource(
        undefined,
        onLocationFoundMock
      );
      source.onSelect!(onSelectParams);
      await waitFor(() => {
        expect(onLocationFoundMock).toHaveBeenCalledWith(mockCoords);
      });
    });
    test("displays error on geolocation error", async () => {
      setMocks(false, true);
      const { source, onSelectParams } = setupGeolocationSource();
      source.onSelect!(onSelectParams);
      await waitFor(() => {
        expect(onSelectParams.setQuery).toHaveBeenCalledWith(
          "undefined needs permission to use your location."
        );
        expect(global.fetch).not.toHaveBeenCalled();
        expect(window.location.assign).not.toHaveBeenCalled();
      });
    });
    test("displays error on fetch error", async () => {
      setMocks(true, false);
      const { source, onSelectParams } = setupGeolocationSource(
        "proposed-sales-locations"
      );
      source.onSelect!(onSelectParams);
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          `/places/urls?latitude=${mockCoords.latitude}&longitude=${mockCoords.longitude}`
        );
        expect(window.location.assign).not.toHaveBeenCalledWith(
          mockUrlsResponse.result.urls["proposed-sales-locations"]
        );
        expect(onSelectParams.setQuery).toHaveBeenCalledWith(
          "undefined needs permission to use your location."
        );
      });
    });
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
    expect(
      locationSource("any query", 5, "retail-sales-locations")
    ).toContainKey("getItemUrl");
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
    expect(algoliaSource("query", [{}]).templates.item).toBeTruthy();
  });
  test("defines a getItems function", () => {
    const query = "new project";
    const indexes = [{ drupal_test: {} }];
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
      algoliaSource("question", [{ stops: { hitsPerPage: 7 } }], false)
    ).not.toContainKey("getItemUrl");
    expect(
      algoliaSource("question", [{ stops: { hitsPerPage: 7 } }])
    ).toContainKey("getItemUrl");
  });
});
