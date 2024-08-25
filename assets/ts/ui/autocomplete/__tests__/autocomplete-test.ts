import setupAlgoliaAutocomplete from "./../index";
import { within } from "@testing-library/dom";

const body = `
  <div id="test-autocomplete">
    <div class="c-search-bar__autocomplete" data-config="basic-config" data-placeholder="Search for routes, info, and more"></div>
    <div class="c-search-bar__autocomplete-results"></div>
  </div>

  <div id="test-autocomplete-no-attributes"></div>

  <div id="test-autocomplete-bad">
    <div class="c-search-bar__autocomplete"></div>
    <div class="c-search-bar__autocomplete-results"></div>
  </div>

  <div id="test-autocomplete-worse">
    <div class="c-search-bar__autocomplete" data-config="fake"></div>
    <div class="c-search-bar__autocomplete-results"></div>
  </div>
`;
const pushToLiveViewFn = jest.fn();
describe("Algolia v1 autocomplete", () => {
  beforeEach(() => {
    document.body.innerHTML = body;
  });

  it("instantiates with container with data attributes", () => {
    const container = document.getElementById("test-autocomplete");
    expect(container).toBeDefined();
    setupAlgoliaAutocomplete(container!, pushToLiveViewFn);
    const generatedAutocompleteSearchForm = within(container!).getByRole(
      "search"
    );
    expect(generatedAutocompleteSearchForm).toBeDefined();
  });

  it("matches snapshot", () => {
    const container = document.getElementById("test-autocomplete");
    setupAlgoliaAutocomplete(container!, pushToLiveViewFn);
    expect(container).toMatchSnapshot();
  });

  it("instantiates with container without data attributes", () => {
    const container = document.getElementById(
      "test-autocomplete-no-attributes"
    );
    expect(container).toBeDefined();
    expect(() => {
      setupAlgoliaAutocomplete(container!, pushToLiveViewFn);
    }).toThrowWithMessage(Error, "container needed");
  });

  it("instantiates with container without data attributes", () => {
    const container = document.getElementById("test-autocomplete-bad");
    expect(container).toBeDefined();
    expect(() => {
      setupAlgoliaAutocomplete(container!, pushToLiveViewFn);
    }).toThrowWithMessage(Error, "config needed");
  });

  it("instantiates with container with bad data attributes", () => {
    const container = document.getElementById("test-autocomplete-worse");
    expect(container).toBeDefined();
    expect(() => {
      setupAlgoliaAutocomplete(container!, pushToLiveViewFn);
    }).toThrowWithMessage(Error, "config needed");
  });
});
