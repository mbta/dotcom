import { assert, expect } from "chai";
import jsdom from "mocha-jsdom";
import sinon from "sinon";
import { FacetBar } from "../facet-bar.js";
import { FacetGroup } from "../facet-group.js";
import { FacetItem } from "../facet-item.js";
import testConfig from "./../../ts/jest.config";

const { testURL } = testConfig;

function getFeatureIcon(feature) {
  return `<span id=${feature}></span>`;
}

describe("facet", function() {
  let $;
  jsdom({ url: testURL });

  const testData = {
    routes: {
      indexName: "routes",
      facetName: "routes",
      item: {
        id: "lines-routes",
        name: "Lines and Routes",
        items: [
          {
            id: "subway",
            name: "Subway",
            facets: ["0", "1"],
            icon: getFeatureIcon("station")
          },
          {
            id: "commuter-rail",
            name: "Commuter Rail",
            facets: ["2"],
            icon: getFeatureIcon("commuter_rail")
          },
          {
            id: "bus",
            name: "Bus",
            facets: ["3"],
            icon: getFeatureIcon("bus")
          },
          {
            id: "ferry",
            name: "Ferry",
            facets: ["4"],
            icon: getFeatureIcon("ferry")
          }
        ]
      }
    },
    stops: {
      indexName: "stops",
      facetName: "stop",
      item: {
        id: "stops",
        name: "Stops",
        prefix: "stop",
        items: [
          {
            id: "stop-subway",
            name: "Subway",
            facets: ["subway"],
            icon: getFeatureIcon("station")
          }
        ]
      }
    }
  };

  const search = {
    updateActiveQueries: sinon.spy()
  };
  const changeAllCheckboxes = state => {
    Object.keys(checkBoxes).forEach(key => {
      $(checkBoxes[key]).prop("checked", state);
    });
  };

  const checkBoxes = {
    parent: "#checkbox-item-lines-routes",
    bus: "#checkbox-item-bus",
    cr: "#checkbox-item-commuter-rail",
    ferry: "#checkbox-item-ferry",
    subway: "#checkbox-item-subway"
  };

  const checkboxHandlers = {
    parent: "#checkbox-container-lines-routes",
    bus: "#checkbox-container-bus",
    cr: "#checkbox-container-commuter-rail",
    ferry: "#checkbox-container-ferry",
    subway: "#checkbox-container-subway"
  };

  beforeEach(function() {
    $ = jsdom.rerequire("jquery");
    $("body").empty();
    $("body").append('<div id="test"></div>');
    this.facetBar = new FacetBar("test", search, testData);
    this.testFacetItem = this.facetBar._items["routes"];
    changeAllCheckboxes(false);
  });

  describe("item event handlers", function() {
    it("makes 7 checkboxes, one for each item", function() {
      assert.equal($("input[type='checkbox']").length, 7);
    });

    it("unchecks all children when unchecking the parent box", function() {
      changeAllCheckboxes(true);
      assert.equal($("input[type='checkbox']:checked").length, 5);
      $(checkboxHandlers.parent).trigger("click");
      assert.equal($("input[type='checkbox']:checked").length, 0);
    });

    it("checks all children when checking the parent box", function() {
      assert.equal($("input[type='checkbox']:checked").length, 0);
      $(checkboxHandlers.parent).trigger("click");
      assert.equal($("input[type='checkbox']:checked").length, 5);
    });

    it("unchecks the parent if any child is unchecked", function() {
      changeAllCheckboxes(true);
      $(checkboxHandlers.bus).trigger("click");
      assert.equal($(checkBoxes.parent).prop("checked"), false);
      assert.equal($(checkBoxes.bus).prop("checked"), false);
    });

    it("checks the parent if all children are checked", function() {
      assert.equal($(checkBoxes.parent).prop("checked"), false);
      $(checkboxHandlers.bus).trigger("click");
      $(checkboxHandlers.cr).trigger("click");
      $(checkboxHandlers.subway).trigger("click");
      assert.equal($(checkBoxes.parent).prop("checked"), false);
      $(checkboxHandlers.ferry).trigger("click");
      assert.equal($(checkBoxes.parent).prop("checked"), true);
    });
  });

  describe("item", function() {
    it("returns a flattened list of active facets", function() {
      changeAllCheckboxes(true);
      assert.deepEqual(this.testFacetItem._item.getActiveFacets(), [
        "routes:0",
        "routes:1",
        "routes:2",
        "routes:3",
        "routes:4"
      ]);
    });
  });

  describe("bar", function() {
    it("properly parses facet data into groups with items", function() {
      assert.deepEqual(Object.keys(this.facetBar._items), ["routes", "stops"]);
      assert.equal(this.facetBar._items["routes"]._item._id, "lines-routes");
      assert.deepEqual(
        this.facetBar._items["routes"]._item._children.map(item => {
          return item._id;
        }),
        ["subway", "commuter-rail", "bus", "ferry"]
      );
      assert.equal(this.facetBar._items["stops"]._item._id, "stops");
      assert.deepEqual(
        this.facetBar._items["stops"]._item._children.map(item => {
          return item._id;
        }),
        ["stop-subway"]
      );
    });

    it("groups update maps to keep track of which facets should be updated", function() {
      assert.deepEqual(Object.keys(this.facetBar._items["routes"]._facetMap), [
        "routes:0,routes:1",
        "routes:2",
        "routes:3",
        "routes:4"
      ]);
      assert.deepEqual(Object.keys(this.facetBar._items["stops"]._facetMap), [
        "stop:subway"
      ]);
    });

    it("updates results for facet items in the facet map", function() {
      const results = {
        "routes:0": 1,
        "routes:1": 2,
        "routes:2": 3,
        "routes:3": 4,
        "routes:4": 5,
        "stop:subway": 10
      };
      this.facetBar.updateCounts(results);
      const routesFacet = this.facetBar._items["routes"]._item;
      const stopsFacet = this.facetBar._items["stops"]._item;
      assert(
        routesFacet._count,
        results["routes:0"] +
          results["routes:1"] +
          results["routes:2"] +
          results["routes:3"] +
          results["routes:4"]
      );
      assert(stopsFacet._count, results["stop:subway"]);
    });

    it("disables indexes if a facet tree is completely unchecked", function() {
      $(checkBoxes.cr).prop("checked", true);
      assert.equal(this.facetBar._items["routes"].shouldDisableQuery(), false);
      assert.equal(this.facetBar._items["stops"].shouldDisableQuery(), true);
    });

    describe("reset", function() {
      it("unchecks all checked boxes", function() {
        expect(this.facetBar._items["routes"]._item.isChecked()).to.be.false;
        $(checkboxHandlers.parent).trigger("click");
        expect(this.facetBar._items["routes"]._item.isChecked()).to.be.true;
        expect(this.facetBar._items["stops"]._item.isChecked()).to.be.false;
        this.facetBar.reset();
        for (const key in this.facetBar._items) {
          expect(this.facetBar._items[key]._item.isChecked()).to.be.false;
        }
      });
    });
  });

  describe("FacetBar.selectedFacetNames", function() {
    it("returns an empty list if no facets are selected", function() {
      expect(this.facetBar.selectedFacetNames()).to.have.members([]);
    });

    it("returns a list of items if any facets are selected", function() {
      this.facetBar._items["routes"]._item.check();
      const names = this.facetBar.selectedFacetNames();
      expect(names[0]).to.equal("lines-routes");
      expect(names[1]).to.equal("subway");
      expect(names[2]).to.equal("commuter-rail");
      expect(names[3]).to.equal("bus");
      expect(names[4]).to.equal("ferry");
    });
  });
});
