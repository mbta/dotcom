import jsdom from "mocha-jsdom";
import sinon from "sinon";
import { expect } from "chai";
import AlgoliaAutocompleteWithGeo, {
  addFilterParam
} from "../algolia-autocomplete-with-geo";
import * as GoogleMapsHelpers from "../google-maps-helpers";
import google from "./google-stubs";
import testConfig from "./../../ts/jest.config";

const { testURL } = testConfig;

/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-unused-expressions */

describe("AlgoliaAutocompleteWithGeo", function() {
  let $;
  jsdom({ url: testURL });
  const selectors = {
    input: "autocomplete-input",
    container: "autocomplete-container",
    locationLoadingIndicator: "loading-indicator",
    resetButton: "reset-button"
  };
  const indices = ["stops", "routes"];

  beforeEach(function() {
    document.body.innerHTML = `
      <div id="powered-by-google-logo"></div>
      <div id="${selectors.container}">
        <input id="${selectors.input}" type="text" />
        <div id="${selectors.resetButton}"></div>
      </div>
      <div id="${selectors.locationLoadingIndicator}"></div>
    `;
    window.encodeURIComponent = string => {
      return string.replace(/\s/g, "%20").replace(/\&/g, "%26");
    };
    window.autocomplete = jsdom.rerequire("autocomplete.js");
    window.jQuery = jsdom.rerequire("jquery");
    window.location = {
      assign: sinon.spy()
    };
    $ = window.jQuery;
    this.parent = {
      onLocationResults: sinon.spy(results => results)
    };
    this.client = {
      reset: sinon.spy(),
      updateParamsByKey: sinon.spy()
    };
    const locationParams = {
      position: 1,
      hitLimit: 3
    };
    this.popular = [
      {
        name: "test"
      }
    ];
    this.ac = new AlgoliaAutocompleteWithGeo({
      id: "id",
      popular: this.popular,
      parent: this.parent,
      selectors,
      indices,
      locationParams
    });
    this.ac.init(this.client);
  });

  describe("constructor", function() {
    it("adds locations to indices at the proper position", function() {
      expect(this.ac._indices).to.have.members([
        "stops",
        "locations",
        "routes",
        "usemylocation",
        "popular"
      ]);
      expect(this.ac._indices[1]).to.equal("locations");
      expect(this.ac._loadingIndicator).to.be.an.instanceOf(
        window.HTMLDivElement
      );
      expect(this.ac._parent).to.equal(this.parent);
    });
  });

  describe("_datasetSource", function() {
    it('returns a callback that calls google for "location" index', function(done) {
      this.ac.init(this.client);
      sinon.stub(GoogleMapsHelpers, "autocomplete").resolves({
        locations: {
          hits: [
            {
              hitTitle: "location result"
            }
          ]
        }
      });
      const source = this.ac._datasetSource("locations");
      const callback = sinon.spy();
      const result = source("location query", callback);
      Promise.resolve(result).then(() => {
        setTimeout(() => {
          expect(GoogleMapsHelpers.autocomplete.called).to.be.true;
          expect(callback.called).to.be.true;
          GoogleMapsHelpers.autocomplete.restore();
          done();
        }, this.ac.debounceInterval + 500);
      });
    });

    it("returns a callback that returns the popular array that was provided", function() {
      const source = this.ac._datasetSource("popular");
      const callback = sinon.spy();
      const result = source("popular", callback);
      expect(callback.called).to.be.true;
      expect(callback.args[0][0]).to.equal(this.popular);
    });

    it("returns a callback that returns a blank usemylocation result", function() {
      const source = this.ac._datasetSource("usemylocation");
      const callback = sinon.spy();
      const result = source("usemylocation", callback);
      expect(callback.called).to.be.true;
      expect(JSON.stringify(callback.args[0][0])).to.equal(
        JSON.stringify([{}])
      );
    });
  });

  describe("useMyLocationSearch", function() {
    it("redirects to Transit Near Me if geocode succeeds", function(done) {
      window.navigator.geolocation = {
        getCurrentPosition: resolve => {
          resolve({ coords: { latitude: 42.0, longitude: -71.0 } });
        }
      };
      window.encodeURIComponent = str => str;
      sinon
        .stub(GoogleMapsHelpers, "reverseGeocode")
        .resolves("10 Park Plaza, Boston MA");
      const result = this.ac.useMyLocationSearch();
      Promise.resolve(result).then(() => {
        expect(window.location.assign.called).to.be.true;
        expect(window.location.assign.args[0][0]).to.equal(
          "/transit-near-me?latitude=42&longitude=-71&address=10 Park Plaza, Boston MA"
        );
        done();
      });
    });
    it("resets search if geolocation fails", function(done) {
      window.navigator.geolocation = {
        getCurrentPosition: (_resolve, reject) => {
          reject({ code: 1, message: "User denied Geolocation" });
        }
      };
      const result = this.ac.useMyLocationSearch();
      Promise.resolve(result).then(() => {
        // eslint-disable-next-line no-underscore-dangle
        expect(this.ac._input.value).to.equal("");
        // eslint-disable-next-line no-underscore-dangle
        expect(this.ac._input.disabled).to.be.false;
        done();
      });
    });
  });

  describe("location searches", function() {
    beforeEach(function() {
      this.locationSearchResults = {
        locations: { hits: [{ hitTitle: "location result" }] }
      };

      this.client.search = sinon.stub().resolves(this.locationSearchResults);

      window.google = google;

      sinon.spy(this.ac, "showLocation");
    });

    describe("onHitSelected", function() {
      let getJSONStub;

      beforeEach(function() {
        getJSONStub = sinon.stub(window.jQuery, "getJSON");
        getJSONStub.callsFake(_url => {
          const deferred = window.jQuery.Deferred();
          deferred.resolve(
            {
              result:
                '{"longitude":-71.0679696,"latitude":42.3517525,"formatted":"Park Plaza, Boston, MA 02116, USA"}'
            },
            "success"
          );
          return deferred.promise();
        });
      });

      it('does a location search when index is "locations"', function(done) {
        window.encodeURIComponent = params => {
          const forceString = params.toString();
          return forceString.replace(/\s/g, "%20").replace(/\&/g, "%26");
        };
        this.ac.init(this.client);

        const result = this.ac.onHitSelected({
          originalEvent: {
            _args: [
              {
                id: "location-1",
                address: "Boston, MA 02128, USA"
              },
              "locations"
            ]
          }
        });

        Promise.resolve(result).then(() => {
          expect(
            getJSONStub.calledWith(
              `/places/details/Boston%2C%20MA%2002128%2C%20USA`
            )
          ).to.be.true;

          expect(this.ac.showLocation.called).to.be.true;
          expect($(`#${selectors.input}`).val()).to.equal(
            "Boston, MA 02128, USA"
          );

          expect(window.location.assign.called).to.be.true;
          expect(window.location.assign.args[0][0]).to.contain(
            "latitude=42.3517525"
          );
          expect(window.location.assign.args[0][0]).to.contain(
            "longitude=-71.0679696"
          );
          expect(window.location.assign.args[0][0]).to.contain(
            "address=Boston,%20MA"
          );

          done();
        });
      });
    });
  });

  describe("addFilterParam", () => {
    it("adds filter param on schedule pages", () => {
      const cr = addFilterParam({}, "/schedules/commuter-rail");
      expect(cr.filter).to.equal("commuter_rail");

      const cr2 = addFilterParam({}, "/schedules/commuter-rail/");
      expect(cr2.filter).to.equal("commuter_rail");

      const subway = addFilterParam({}, "/schedules/subway");
      expect(subway.filter).to.equal("subway");

      const subway2 = addFilterParam({}, "/schedules/subway/");
      expect(subway2.filter).to.equal("subway");

      const bus = addFilterParam({}, "/schedules/bus");
      expect(bus.filter).to.equal("bus");

      const bus2 = addFilterParam({}, "/schedules/bus/");
      expect(bus2.filter).to.equal("bus");

      const homepage = addFilterParam({}, "/");
      expect(homepage).not.to.have.key("filter");

      const tripPlanner = addFilterParam({}, "/trip-planner");
      expect(tripPlanner).not.to.have.key("filter");
    });
  });
});

/* eslint-enable func-names */
/* eslint-enable prefer-arrow-callback */
/* eslint-enable no-unused-expressions */
