import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import {
  AutocompleteItem,
  LocationItem,
  PopularItem,
  RouteItem
} from "../__autocomplete";

import {
  AutocompleteComponents,
  AutocompleteRenderer,
  AutocompleteState,
  HTMLTemplate,
  VNode
} from "@algolia/autocomplete-js";
import { BaseItem } from "@algolia/autocomplete-core";
import AlgoliaItemTemplate from "../templates/algolia";
import { GeolocationComponent } from "../templates/geolocation";
import LocationItemTemplate from "../templates/location";
import PopularItemTemplate from "../templates/popular";
import { templateWithLink } from "../templates/helpers";

const mockComponentHighlight = jest.fn();
function mockTemplateParam<T extends BaseItem>(item: T, query: string) {
  return {
    item,
    state: {
      query,
      isOpen: true
    } as AutocompleteState<T>,
    components: ({
      Highlight: mockComponentHighlight
    } as unknown) as AutocompleteComponents,
    html: {} as HTMLTemplate,
    ...({} as AutocompleteRenderer)
  };
}

const renderMockTemplate = (tmpl: string | VNode | VNode[]) =>
  render(tmpl as VNode);

afterEach(() => jest.resetAllMocks());

describe("Algolia template", () => {
  function renderAlgoliaTemplate(item: AutocompleteItem, query = "query") {
    return renderMockTemplate(
      templateWithLink(AlgoliaItemTemplate)(
        mockTemplateParam<AutocompleteItem>(item, query)
      )
    );
  }
  test("renders a simple link", () => {
    const contentItem = {
      _content_url: "/page1",
      _content_type: "page",
      content_title: "Page One",
      index: "drupal",
      objectID: "sdfsda",
      _highlightResult: { content_title: { matchedWords: ["one"] } }
    } as AutocompleteItem;

    renderAlgoliaTemplate(contentItem, "one");
    expect(screen.getByRole("link")).toHaveAttribute("href", "/page1");
  });

  test("Algolia template renders link to text fragment", () => {
    const contentItemNoMatch = {
      _content_url: "/page2",
      _content_type: "page",
      content_title: "Page Two",
      index: "drupal",
      objectID: "sdfsda",
      _highlightResult: { content_title: { matchedWords: [] } }
    } as AutocompleteItem;

    renderAlgoliaTemplate(contentItemNoMatch, "searched text");
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/page2#:~:text=searched%20text"
    );
  });

  test("handles search result content type", () => {
    const searchItem = {
      _search_result_url: "internal:/search/result",
      _content_url: "/content_url",
      _content_type: "search_result",
      content_title: "Fancy search result",
      index: "drupal",
      objectID: "sdfsda",
      _highlightResult: { content_title: { matchedWords: ["search "] } }
    } as AutocompleteItem;

    renderAlgoliaTemplate(searchItem, "search result");
    expect(screen.getByRole("link")).toHaveAttribute("href", "/search/result");
  });

  test("handles route item", () => {
    const route = ({
      index: "routes_test",
      url: "/schedules/111",
      stop_names: [],
      route: {
        type: 3,
        sort_order: 51110,
        name: "111",
        long_name: "Woodlawn - Haymarket Station",
        id: "111",
        direction_names: {
          "0": "Outbound",
          "1": "Inbound"
        },
        direction_destinations: {
          "0": "Woodlawn",
          "1": "Haymarket Station"
        },
        description: "key_bus_route",
        color: "FFC72C"
      },
      rank: 5,
      objectID: "route-111",
      headsigns: ["Woodlawn", "Haymarket Station"],
      _highlightResult: {
        route: {
          name: {
            value: "__aa-highlight__111__/aa-highlight__",
            matchedWords: ["111"],
            matchLevel: "full",
            fullyHighlighted: true
          },
          long_name: {
            value: "Woodlawn - Haymarket Station",
            matchedWords: [],
            matchLevel: "none"
          }
        }
      }
    } as unknown) as RouteItem;
    const { asFragment } = renderAlgoliaTemplate(
      route as AutocompleteItem,
      "red line"
    );

    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByRole("link")).toHaveAttribute("href", route.url);
  });
});

test("Popular template renders", () => {
  const popularItem = {
    name: "South Station",
    stop_id: "place-sstat",
    latitude: 42.4,
    longitude: -71.0,
    icon: "station",
    features: ["red_line", "bus", "commuter_rail", "access"],
    url:
      "/transit-near-me?latitude=42.352271&longitude=-71.055242&name=South+Station"
  };
  const { asFragment } = renderMockTemplate(
    templateWithLink(PopularItemTemplate)(
      mockTemplateParam<PopularItem>(popularItem, "South Station")
    )
  );

  expect(asFragment()).toMatchSnapshot();
});

test("Location template renders", () => {
  const locationItem = {
    address: "South Station, Boston, MA",
    latitude: 42.4,
    longitude: -71.0,
    highlighted_spans: [],
    url:
      "/transit-near-me?latitude=42.352271&longitude=-71.055242&address=South+Station,+Boston,+MA"
  };
  const { asFragment } = renderMockTemplate(
    templateWithLink(LocationItemTemplate)(
      mockTemplateParam<LocationItem>(locationItem, "South Station")
    )
  );

  expect(asFragment()).toMatchSnapshot();
});

describe("Geolocation template", () => {
  const mockCoords = {
    latitude: 40,
    longitude: -71
  };
  const mockUrlsResponse = {
    result: {
      urls: {
        "transit-near-me": `/transit-near-me?latitude=${mockCoords.latitude}&longitude=${mockCoords.longitude}`,
        "retail-sales-locations": `/fares/retail-sales-locations?latitude=${mockCoords.latitude}&longitude=${mockCoords.longitude}`,
        "proposed-sales-locations": `/fare-transformation/proposed-sales-locations?latitude=${mockCoords.latitude}&longitude=${mockCoords.longitude}`
      },
      longitude: mockCoords.longitude,
      latitude: mockCoords.latitude
    }
  };

  Object.defineProperty(window, "location", {
    value: {
      assign: jest.fn()
    }
  });

  const geolocationMock = jest.fn();

  (global.navigator as any).geolocation = {
    getCurrentPosition: geolocationMock
  };

  test("on success redirects to a URL", async () => {
    geolocationMock.mockImplementationOnce(success =>
      Promise.resolve(
        success({
          coords: mockCoords
        })
      )
    );
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockUrlsResponse)
      })
    ) as jest.Mock;
    const setIsOpenMock = jest.fn();
    render(
      <GeolocationComponent
        setIsOpen={setIsOpenMock}
        urlType="transit-near-me"
      />
    );
    expect(screen.getByRole("button")).toHaveTextContent(
      "Use my location to find transit near me"
    );

    act(() => {
      screen.getByRole("button").click();
    });

    await waitFor(() => {
      expect(setIsOpenMock).toHaveBeenCalledWith(true);
      expect(global.fetch).toHaveBeenCalledWith(
        `/places/urls?latitude=${mockCoords.latitude}&longitude=${mockCoords.longitude}`
      );
      expect(screen.queryByText("Redirecting...")).toBeTruthy();
      expect(window.location.assign).toHaveBeenCalledExactlyOnceWith(
        `/transit-near-me?latitude=${mockCoords.latitude}&longitude=${mockCoords.longitude}`
      );
    });

    await waitFor(
      () => {
        expect(setIsOpenMock).toHaveBeenCalledWith(false);
      },
      { timeout: 3000 }
    );
  });

  describe("displays error", () => {
    const errorText =
      "needs permission to use your location. Please update your browser's settings or refresh the page and try again.";

    test("on geolocation error", async () => {
      geolocationMock.mockImplementationOnce((success, error) =>
        Promise.resolve(error({ code: 1, message: "GeoLocation Error" }))
      );
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockUrlsResponse)
        })
      ) as jest.Mock;
      const setIsOpenMock = jest.fn();
      render(
        <GeolocationComponent
          setIsOpen={setIsOpenMock}
          urlType="transit-near-me"
        />
      );
      act(() => {
        screen.getByRole("button").click();
      });

      await waitFor(() => {
        expect(setIsOpenMock).toHaveBeenCalledWith(true);
        expect(global.fetch).not.toHaveBeenCalled();
        expect(window.location.assign).not.toHaveBeenCalled();
      });

      expect(screen.findByText(errorText)).toBeTruthy();

      await waitFor(
        () => {
          expect(setIsOpenMock).not.toHaveBeenCalledWith(false);
        },
        { timeout: 3000 }
      );
    });

    test("on fetch error", async () => {
      geolocationMock.mockImplementationOnce(success =>
        Promise.resolve(
          success({
            coords: mockCoords
          })
        )
      );
      global.fetch = jest.fn(() =>
        Promise.reject({
          ok: false,
          statusText: "a bad time"
        })
      ) as jest.Mock;

      const setIsOpenMock = jest.fn();
      render(
        <GeolocationComponent
          setIsOpen={setIsOpenMock}
          urlType="proposed-sales-locations"
        />
      );
      expect(screen.getByRole("button")).toHaveTextContent(/^Use my location$/);

      act(() => {
        screen.getByRole("button").click();
      });

      await waitFor(() => {
        expect(setIsOpenMock).toHaveBeenCalledWith(true);
        expect(global.fetch).toHaveBeenCalledWith(
          `/places/urls?latitude=${mockCoords.latitude}&longitude=${mockCoords.longitude}`
        );
        expect(window.location.assign).not.toHaveBeenCalled();
      });

      expect(
        screen.findByText(
          "needs permission to use your location. Please update your browser's settings or refresh the page and try again."
        )
      ).toBeTruthy();
      await waitFor(
        () => {
          expect(setIsOpenMock).not.toHaveBeenCalledWith(false);
        },
        { timeout: 3000 }
      );
    });
  });
});
