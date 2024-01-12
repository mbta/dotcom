/* eslint-disable func-names */
import { assert } from "chai";
import jsdom from "mocha-jsdom";
import sinon from "sinon";
import { AlgoliaWithGeo } from "../algolia-search-with-geo";
import * as MapsHelpers from "../maps-helpers";
import testConfig from "../../ts/jest.config";

const { testURL } = testConfig;

describe("AlgoliaWithGeo", function() {
  jsdom({ url: testURL });

  beforeEach(function() {
    window.jQuery = jsdom.rerequire("jquery");
    document.body.innerHTML = `<div id="algolia-error">There was an error</div>`;
    this.algoliaWithGeo = new AlgoliaWithGeo(
      {
        stops: {
          indexName: "stops"
        }
      },
      { stops: { foo: "bar" } }
    );
  });

  describe("AlgoliaWithGeo._doSearch", function() {
    it("searches both indexes and updates widgets when both have returned", function(done) {
      this.algoliaWithGeo.enableLocationSearch(true);
      this.algoliaWithGeo.addActiveQuery("stops");
      const gmsStub = sinon
        .stub(MapsHelpers, "autocomplete")
        .resolves({ locations: "loc" });
      this.algoliaWithGeo.updateWidgets = function(results) {
        assert.equal(gmsStub.getCall(0).args[0].input, "query");
        assert.deepEqual(results, {
          results: [],
          locations: "loc"
        });
        done();
      };
      sinon.stub(this.algoliaWithGeo, "_processAlgoliaResults").returnsArg(0);
      sinon.stub(this.algoliaWithGeo, "_sendQueries").resolves({ results: [] });
      this.algoliaWithGeo.search({
        indexName: "index",
        query: "query",
        params: {}
      });
    });
  });
});
