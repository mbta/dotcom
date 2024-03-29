import { expect } from "chai";
import jsdom from "mocha-jsdom";
import sinon from "sinon";
import AlgoliaAutocomplete from "../algolia-autocomplete";
import Algolia from "../algolia-search";
import testConfig from "./../../ts/jest.config";

const { testURL } = testConfig;

/* eslint-disable no-underscore-dangle */

describe("AlgoliaAutocomplete", () => {
  jsdom({ url: testURL });
  const selectors = {
    input: "autocomplete-input",
    resetButton: "autocomplete-reset"
  };
  const indices = ["stops"];
  const queries = {
    stops: {
      indexName: "stops",
      query: ""
    }
  };
  const queryParams = {
    stops: {
      hitsPerPage: 5,
      facets: ["*"],
      facetFilters: [[]]
    }
  };
  const parent = {
    getParams: () => ({
      from: "stop-search",
      query: ""
    })
  };

  beforeEach(() => {
    document.body.innerHTML = `
      <input id="autocomplete-input"></input>
      <i id="autocomplete-reset"></i>
    `;
    window.autocomplete = jsdom.rerequire("autocomplete.js");
    window.jQuery = jsdom.rerequire("jquery");
    Object.defineProperty(window, "location", {
      value: {
        assign: sinon.spy()
      }
    });
    window.encodeURIComponent = string =>
      string.replace(/\s/g, "%20").replace(/&/g, "%26");
  });
  it("constructor does not initialize autocomplete", () => {
    const ac = new AlgoliaAutocomplete({
      id: "id",
      selectors,
      indices,
      parent
    });
    expect(ac._selectors.resultsContainer).to.equal(
      `${selectors.input}-autocomplete-results`
    );
    expect(ac._indices).to.equal(indices);
    expect(ac._autocomplete).to.equal(null);
  });

  it("constructor can use a containerEl argument", () => {
    document.body.innerHTML = `
      <input id="autocomplete-input"></input>
      <div id="container">
        <input id="autocomplete-input"></input>
        <i id="autocomplete-reset"></i>
      </div>
    `;
    const containerEl = document.getElementById("container");
    const ac = new AlgoliaAutocomplete({
      id: "id",
      selectors,
      indices,
      parent,
      containerEl
    });
    expect(ac._input.parentNode.id).to.equal("container");
    expect(ac.containerElement.id).to.equal("container");
  });

  describe("init", () => {
    it("initializes autocomplete if input exists", () => {
      expect(document.getElementById(selectors.input)).to.be.an.instanceOf(
        window.HTMLInputElement
      );
      const ac = new AlgoliaAutocomplete({
        id: "id",
        selectors,
        indices,
        parent
      });
      const client = new Algolia(queries, queryParams);
      ac.init(client);
      expect(ac._autocomplete).to.be.an("object");
      expect(ac._autocomplete.autocomplete).to.be.an("object");
    });
  });

  describe("_onResults", () => {
    it("only returns the hits for the given index", () => {
      const ac = new AlgoliaAutocomplete({
        id: "id",
        selectors,
        indices,
        parent
      });
      const callback = sinon.spy();
      const results = {
        stops: {
          hits: ["success"]
        },
        otherIndex: {
          hits: ["fail1", "fail2", "fail3"]
        }
      };
      expect(callback.called).to.equal(false);
      ac._onResults(callback, "stops", results);
      expect(callback.called).to.equal(true);
      expect(callback.args[0][0]).to.eql(["success"]);
    });
  });

  describe("onCursorChanged", () => {
    it("sets this._highlightedHit", () => {
      const ac = new AlgoliaAutocomplete({
        id: "id",
        selectors,
        indices,
        parent
      });
      ac.init({});
      expect(ac._highlightedHit).to.equal(null);
      const hit = {
        url: "/success"
      };
      ac.onCursorChanged({ originalEvent: { _args: [hit, indices[0]] } });
      expect(ac._highlightedHit.hit).to.equal(hit);
      expect(ac._highlightedHit.index).to.equal(indices[0]);
    });
  });

  describe("onCursorRemoved", () => {
    it("sets this._highlightedHit to null", () => {
      const ac = new AlgoliaAutocomplete({
        id: "id",
        selectors,
        indices,
        parent
      });
      ac.init({});
      ac._highlightedHit = {
        index: indices[0],
        hit: {
          url: "success"
        }
      };
      ac.onCursorRemoved({});
      expect(ac._highlightedHit).to.equal(null);
    });
  });

  describe("clickFirstResult", () => {
    describe("when results exist:", () => {
      it("clicks the first result of the first index with hits", () => {
        const ac = new AlgoliaAutocomplete({
          id: "id",
          selectors,
          indices: ["stops", "locations"],
          parent
        });
        ac.init({});
        ac._results = {
          stops: {
            hits: [
              {
                url: "/stops",
                stop: {
                  id: "123"
                }
              }
            ]
          },
          locations: {
            hits: [
              {
                url: "/locations"
              }
            ]
          }
        };
        expect(window.location.assign.called).to.equal(false);
        ac.clickFirstResult();
        expect(window.location.assign.called).to.equal(true);
        expect(window.location.assign.args[0][0]).to.equal(
          "/stops/123?from=stop-search&query="
        );
      });

      it("finds the first index with results if some are empty", () => {
        const ac = new AlgoliaAutocomplete({
          id: "id",
          selectors,
          indices: ["stops", "routes"],
          parent
        });
        ac.init({});
        ac._results = {
          stops: {
            hits: []
          },
          routes: {
            hits: [
              {
                route: {
                  id: "123"
                }
              }
            ]
          }
        };
        expect(window.location.assign.called).to.equal(false);
        ac.clickFirstResult();
        expect(window.location.assign.called).to.equal(true);
        expect(window.location.assign.args[0][0]).to.equal(
          "/schedules/123?from=stop-search&query="
        );
      });

      it("does nothing if results list is empty", () => {
        const ac = new AlgoliaAutocomplete({
          id: "id",
          selectors,
          indices: ["stops", "locations"],
          parent
        });
        ac.init({});
        ac._results = {
          stops: {
            hits: []
          },
          locations: {
            hits: []
          }
        };
        expect(window.location.assign.called).to.equal(false);
        ac.clickFirstResult();
        expect(window.location.assign.called).to.equal(false);
      });
    });

    describe("when results do not exist", () => {
      it("does nothing", () => {
        const ac = new AlgoliaAutocomplete({
          id: "id",
          selectors,
          indices: ["stops", "locations"],
          parent
        });
        ac.init({});
        expect(Object.keys(ac._results)).to.have.members([]);
        expect(window.location.assign.called).to.equal(false);
        ac.clickFirstResult();
        expect(window.location.assign.called).to.equal(false);
      });
    });
  });

  describe("clickHighlightedOrFirstResult", () => {
    describe("when this._highlightedHit exists", () => {
      it("visits the highlightedHit url if higlightedHit is not null", () => {
        const ac = new AlgoliaAutocomplete({
          id: "id",
          selectors,
          indices,
          parent
        });
        ac.init({});
        ac._highlightedHit = {
          index: indices[0],
          hit: {
            stop: {
              id: "123"
            }
          }
        };
        expect(window.location.assign.called).to.equal(false);
        ac.clickHighlightedOrFirstResult();
        expect(window.location.assign.called).to.equal(true);
        expect(window.location.assign.args[0][0]).to.equal(
          "/stops/123?from=stop-search&query="
        );
      });
    });

    describe("when this._highlightedHit is null", () => {
      describe("and this._results has results", () => {
        it("visits the url of the first index's results that we get from AlgoliaResult.getUrl", () => {
          const ac = new AlgoliaAutocomplete({
            id: "id",
            selectors,
            indices: ["stops", "locations"],
            parent
          });
          ac.init({});
          ac._results = {
            stops: {
              hits: [
                {
                  stop: {
                    id: "123"
                  }
                }
              ]
            },
            locations: {
              hits: [
                {
                  url: "/fail"
                }
              ]
            }
          };
          expect(ac._highlightedHit).to.equal(null);
          expect(window.location.assign.called).to.equal(false);
          ac.clickHighlightedOrFirstResult();
          expect(window.location.assign.called).to.equal(true);
          expect(window.location.assign.args[0][0]).to.equal(
            "/stops/123?from=stop-search&query="
          );
        });
      });
    });

    describe("and this._results has no results", () => {
      it("does nothing", () => {
        const ac = new AlgoliaAutocomplete({
          id: "id",
          selectors,
          indices: ["stops", "locations"],
          parent
        });
        ac.init({});
        expect(Object.keys(ac._results)).to.have.members([]);
        expect(ac._highlightedHit).to.equal(null);
        expect(window.location.assign.called).to.equal(false);
        ac.clickHighlightedOrFirstResult();
        expect(window.location.assign.called).to.equal(false);
      });
    });
  });

  describe("datasetSource", () => {
    it("returns a callback that performs a search", done => {
      const ac = new AlgoliaAutocomplete({
        id: "id",
        selectors,
        indices: ["stops", "locations"],
        parent
      });
      const client = new Algolia(queries, queryParams);
      client._sendQueries = sinon.stub();
      client._sendQueries.resolves({
        results: [{ hits: [] }]
      });
      ac.init(client);
      expect(Object.keys(ac._results)).to.have.members([]);

      const callback = sinon.spy();
      const returned = ac._datasetSource("stops")("search query", callback);
      expect(returned).to.be.an.instanceOf(Promise);
      Promise.resolve(returned).then(() => {
        expect(ac._results.stops.hits).to.have.members([]);
        expect(callback.called).to.equal(true);
        expect(callback.args[0][0]).to.be.an("array");
        expect(callback.args[0][0]).to.have.members([]);
        done();
      });
    });
  });

  describe("getById", () => {
    it("gets element", () => {
      const ac = new AlgoliaAutocomplete({
        id: "id",
        selectors,
        indices,
        parent
      });

      const input = ac.getById("autocomplete-input");
      expect(input).to.exist;
      expect(input instanceof window.HTMLElement).to.be.true;
    });

    it("gets element with containerEl", () => {
      document.body.innerHTML = `
        <input id="autocomplete-input"></input>
        <div id="container">
          <input id="autocomplete-input"></input>
          <i id="autocomplete-reset"></i>
        </div>
      `;
      const containerEl = document.getElementById("container");
      const ac = new AlgoliaAutocomplete({
        id: "id",
        selectors,
        indices,
        parent,
        containerEl
      });

      const input = ac.getById("autocomplete-input");
      expect(input instanceof window.HTMLElement).to.be.true;
      expect(input.parentNode.id).to.equal("container");
    });
  });
});
