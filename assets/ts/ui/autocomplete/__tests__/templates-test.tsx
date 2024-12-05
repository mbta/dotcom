import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
import { HighlightResultOption } from "@algolia/client-search";
import AlgoliaItemTemplate from "../templates/algolia";
import { GeolocationComponent } from "../templates/geolocation";
import LocationItemTemplate from "../templates/location";
import PopularItemTemplate from "../templates/popular";
import { templateWithLink } from "../templates/helpers";

const mockComponentHighlight = jest.fn();
export function mockTemplateParam<T extends BaseItem>(item: T, query: string) {
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
      _highlightResult: {
        content_title: { matchedWords: ["one"] } as HighlightResultOption
      }
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
      _highlightResult: {
        content_title: { matchedWords: [] as string[] } as HighlightResultOption
      }
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
      _highlightResult: {
        content_title: { matchedWords: ["search "] } as HighlightResultOption
      }
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
          } as HighlightResultOption,
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
    municipality: "Town",
    state: "MA",
    url:
      "/transit-near-me?latitude=42.352271&longitude=-71.055242&name=South+Station"
  } as PopularItem;
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
    formatted: "123 Main St, Town, MA, USA",
    street_address: "123 Main St",
    municipality: "Town",
    state: "MA",
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
  Object.defineProperty(window, "location", {
    value: {
      assign: jest.fn()
    }
  });
  describe("on success", () => {
    const setIsOpenMock = jest.fn();

    test("redirects to a URL", async () => {
      setMocks(true, true);
      render(
        <GeolocationComponent
          setIsOpen={setIsOpenMock}
          urlType="transit-near-me"
        />
      );
      const button = screen.getByRole("button");
      expect(button).toHaveTextContent(
        "Use my location to find transit near me"
      );

      const user = userEvent.setup();
      await user.click(button);
      await waitFor(() => {
        expect(setIsOpenMock).toHaveBeenCalledWith(true);
        expect(screen.queryByText("Redirecting...")).toBeTruthy();
        expect(global.fetch).toHaveBeenCalledWith(
          `/places/urls?latitude=${mockCoords.latitude}&longitude=${mockCoords.longitude}`
        );
        expect(window.location.assign).toHaveBeenCalledExactlyOnceWith(
          `/transit-near-me?latitude=${mockCoords.latitude}&longitude=${mockCoords.longitude}`
        );
      });
    });

    test("fires onLocationFound", async () => {
      setMocks(true, true);
      const onLocationFoundMock = jest.fn();
      render(
        <GeolocationComponent
          setIsOpen={setIsOpenMock}
          onLocationFound={onLocationFoundMock}
        />
      );
      const button = screen.getByRole("button");
      expect(button).toHaveTextContent("Use my location");
      const user = userEvent.setup();
      await user.click(button);

      await waitFor(() => {
        expect(setIsOpenMock).toHaveBeenCalledWith(true);
        expect(onLocationFoundMock).toHaveBeenCalledWith(mockCoords);
      });

      await waitFor(
        () => {
          expect(setIsOpenMock).toHaveBeenCalledWith(false);
        },
        { timeout: 2000 }
      );
    });
  });

  describe("displays error", () => {
    const errorText =
      "needs permission to use your location. Please update your browser's settings or refresh the page and try again.";

    test("on geolocation error", async () => {
      const user = userEvent.setup();
      setMocks(false, true);
      const setIsOpenMock = jest.fn();
      render(
        <GeolocationComponent
          setIsOpen={setIsOpenMock}
          urlType="transit-near-me"
        />
      );

      await user.click(screen.getByRole("button"));
      await waitFor(() => {
        expect(setIsOpenMock).toHaveBeenCalledWith(true);
        expect(global.fetch).not.toHaveBeenCalled();
        expect(window.location.assign).not.toHaveBeenCalled();
      });

      await waitFor(
        () => {
          expect(setIsOpenMock).not.toHaveBeenCalledWith(false);
        },
        { timeout: 3000 }
      );
      expect(screen.getByText(errorText, { exact: false })).toBeTruthy();
    });

    test("on fetch error", async () => {
      const user = userEvent.setup();
      setMocks(true, false);
      const setIsOpenMock = jest.fn();
      render(
        <GeolocationComponent
          setIsOpen={setIsOpenMock}
          urlType="proposed-sales-locations"
        />
      );
      const button = screen.getByRole("button");
      expect(button).toHaveTextContent(/^Use my location$/);
      await user.click(button);

      await waitFor(() => {
        expect(setIsOpenMock).toHaveBeenCalledWith(true);
        expect(global.fetch).toHaveBeenCalledWith(
          `/places/urls?latitude=${mockCoords.latitude}&longitude=${mockCoords.longitude}`
        );
        expect(window.location.assign).not.toHaveBeenCalledWith(
          mockUrlsResponse.result.urls["proposed-sales-locations"]
        );
        expect(
          screen.getByText(
            "needs permission to use your location. Please update your browser's settings or refresh the page and try again.",
            { exact: false }
          )
        ).toBeTruthy();
      });
      await waitFor(
        () => {
          expect(setIsOpenMock).not.toHaveBeenCalledWith(false);
        },
        { timeout: 3000 }
      );
    });
  });
});
