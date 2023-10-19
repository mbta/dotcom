import setupAlgoliaAutocomplete from "../autocomplete/index";
import { within } from "@testing-library/dom";
import getSources from "../autocomplete/sources";
import {
  AutocompleteSource,
  GetSourcesParams,
  OnInputParams
} from "@algolia/autocomplete-core";
import { Item } from "../autocomplete/__autocomplete";

const body = `
  <div
    data-turbolinks-permanent
    id="test-autocomplete"
    class="c-search-bar__autocomplete"
    data-geolocation
    data-locations
    data-algolia="routes,stops,drupal"
  ></div>
  <div id="test-autocomplete-no-attributes"></div>
`;

describe("Algolia v1 autocomplete", () => {
  beforeEach(() => {
    document.body.innerHTML = body;
  });

  it("instantiates with container with data attributes", () => {
    const container = document.getElementById("test-autocomplete");
    expect(container).toBeDefined();
    setupAlgoliaAutocomplete(container!);
    const generatedAutocompleteSearchForm = within(container!).getByRole(
      "search"
    );
    expect(generatedAutocompleteSearchForm).toBeDefined();
  });

  it("matches snapshot", () => {
    const container = document.getElementById("test-autocomplete");
    setupAlgoliaAutocomplete(container!);
    expect(container).toMatchSnapshot();
  });

  it("instantiates with container without data attributes", () => {
    const container = document.getElementById(
      "test-autocomplete-no-attributes"
    );
    expect(container).toBeDefined();
    setupAlgoliaAutocomplete(container!);
    const generatedAutocompleteSearchForm = within(container!).getByRole(
      "search"
    );
    expect(generatedAutocompleteSearchForm).toBeDefined();
  });

  it("doesn't instantiate with invalid container", () => {
    expect(() => {
      // @ts-expect-error
      setupAlgoliaAutocomplete(null);
    }).toThrow();
    const badContainer = document.getElementById("test-doesnt-exist");
    expect(() => {
      setupAlgoliaAutocomplete(badContainer!);
    }).toThrow();
  });
});

const mockGetSourcesParams = (query: string | undefined) =>
  ({
    query,
    setIsOpen: jest.fn() as GetSourcesParams<Item>["setIsOpen"]
  } as OnInputParams<Item>);
describe("getSources", () => {
  it.each`
    query
    ${""}
    ${"1"}
    ${"A"}
    ${"So"}
  `("returns empty if query ($query) is too short", async ({ query }) => {
    const sources = await getSources({}, mockGetSourcesParams(query));
    expect(sources).toEqual([]);
  });

  it("returns default geolocation source if no query", async () => {
    const sources = (await getSources(
      { geolocation: "" },
      mockGetSourcesParams(undefined)
    )) as AutocompleteSource<Item>[];
    expect(sources).toHaveLength(1);
    const [source] = sources;
    expect(source.sourceId).toEqual("geolocation");
  });

  it("returns a list of sources based on a few data attributes", async () => {
    const sources = (await getSources(
      { algolia: "routes,stops", locations: "" },
      mockGetSourcesParams("Something")
    )) as AutocompleteSource<Item>[];
    expect(sources).toHaveLength(2);
    expect(sources.map(s => s.sourceId)).toEqual(["algolia", "locations"]);
  });
});
