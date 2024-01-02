import { expect } from "chai";
import jsdom from "mocha-jsdom";
import sinon from "sinon";
import Algolia from "../algolia-search";
import testConfig from "./../../ts/jest.config";

const { testURL } = testConfig;

describe("Algolia", function() {
  jsdom({ url: testURL });

  beforeEach(function() {
    window.jQuery = jsdom.rerequire("jquery");
    document.body.innerHTML = `
      <div id="algolia-error">There was an error</div>
    `;
    this.mockClient = {
      search: sinon.stub().resolves([])
    };
    this.widget = {
      init: sinon.spy(),
      render: sinon.spy()
    };
    this.algolia = new Algolia(
      {
        stops: {
          indexName: "stops"
        }
      },
      { stops: { foo: "bar", hitsPerPage: 5 } }
    );
  });

  describe("constructor", function() {
    it("builds an Algolia object", function() {
      expect(this.algolia).to.be.an.instanceOf(Algolia);
    });
  });

  describe("Algolia.reset", function() {
    it("resets search params regardless of active queries", function() {
      this.algolia._queries["stops"].params = { not_default: "nope" };
      this.algolia._activeQueryIds = [];
      this.algolia.reset();
      expect(this.algolia._queries).to.have.keys(["stops"]);
      expect(this.algolia._queries.stops).to.be.an("object");
      expect(this.algolia._queries.stops).to.have.keys(["indexName", "params"]);
      expect(this.algolia._queries.stops.params).to.have.keys([
        "foo",
        "hitsPerPage"
      ]);
    });
  });

  describe("Algolia._buildAllQueries", function() {
    it("builds a list of queries for result list", function() {
      expect(this.algolia._queries).to.be.an("object");
      expect(this.algolia._queries).to.have.keys(["stops"]);
      const queries = this.algolia._buildAllQueries({});
      expect(queries).to.be.an("array");
      expect(queries).to.have.a.lengthOf(1);

      expect(queries[0]).to.have.all.keys(["indexName", "params", "query"]);
      expect(queries[0].indexName).to.equal("stops");
      expect(queries[0].params).to.have.all.keys([
        "foo",
        "hitsPerPage",
        "clickAnalytics"
      ]);
    });
  });

  describe("Algolia.search", function() {
    it("performs a search", function() {
      this.algolia._doSearch = sinon.spy();
      this.algolia.search({ query: "query" });
      expect(this.algolia._doSearch.called).to.be.true;
      expect(this.algolia._doSearch.args[0][0][0]).to.have.keys([
        "indexName",
        "params",
        "query"
      ]);
      expect(this.algolia._doSearch.args[0][0][0].indexName).to.equal("stops");
      expect(this.algolia._doSearch.args[0][0][0].params).to.have.keys([
        "foo",
        "hitsPerPage",
        "clickAnalytics"
      ]);
    });

    it("returns a promise", function() {
      this.algolia._sendQueries = sinon.stub().resolves({ results: [] });
      sinon.stub(this.algolia, "_processAlgoliaResults").resolves({});
      const returned = this.algolia.search({ query: "query" });
      expect(returned).to.be.an.instanceOf(Promise);
    });

    it("updates the search query if search is called with arguments", function() {
      this.algolia._doSearch = sinon.spy();
      this.algolia.search({ query: "search string" });
      expect(this.algolia._doSearch.args[0][0][0]["query"]).to.equal(
        "search string"
      );
    });

    it("uses a previous query if search is called with no arguments", function() {
      this.algolia._doSearch = sinon.spy();
      this.algolia.search({ query: "previous query" });
      this.algolia.search();
      expect(this.algolia._doSearch.args[0][0][0]["query"]).to.equal(
        "previous query"
      );
    });

    it("returns empty if search is called with blank query", function() {
      this.algolia._doSearch = sinon.spy();
      this.algolia.updateWidgets = sinon.spy();
      this.algolia.search({ query: "" });
      const returned = this.algolia.search();
      expect(this.algolia.updateWidgets.calledWith({}));
    });
  });

  describe("Algolia._processAlgoliaResults", function() {
    it("returns results in a promise", function(done) {
      this.algolia.addWidget(this.widget);
      const response = {
        results: [
          {
            index: "stops",
            hits: []
          }
        ]
      };
      const results = this.algolia._processAlgoliaResults()(response);
      results.then(result => {
        this.algolia.updateWidgets(result);
        expect(this.widget.render.called).to.be.true;
        expect(this.widget.render.args[0]).to.be.an("array");
        expect(this.widget.render.args[0]).to.have.lengthOf(1);
        expect(this.widget.render.args[0][0]).to.have.keys(["stops"]);
        expect(this.widget.render.args[0][0].stops).to.have.keys([
          "index",
          "hits"
        ]);
        expect(this.widget.render.args[0][0].stops.index).to.equal("stops");
        done();
      });
    });
  });

  describe("addPage", function() {
    it("increments the hit count for a group", function() {
      this.algolia._doSearch = sinon.spy();

      expect(document.getElementById("algolia-error")).to.be.an.instanceOf(
        window.HTMLDivElement
      );

      this.algolia.search({ query: "query" });
      expect(this.algolia._doSearch.args[0][0][0].params.hitsPerPage).to.equal(
        5
      );

      this.algolia.addPage("stops");
      expect(this.algolia._queries.stops.params.hitsPerPage);
    });
  });
});
