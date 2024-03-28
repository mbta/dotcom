import setupAlgoliaAutocomplete from "../autocomplete/index";
import { within } from "@testing-library/dom";

const body = `
  <div
    id="test-autocomplete"
  >
   <div class="c-search-bar__autocomplete"
      data-geolocation
      data-locations
      data-algolia="routes,stops,drupal"
      data-placeholder="Search for routes, info, and more"
    ></div>
    <div class="c-search-bar__autocomplete-results"></div>
  </div>
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
    expect(() => {
      setupAlgoliaAutocomplete(container!);
    }).toThrowWithMessage(Error, "container needed");
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
