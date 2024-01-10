import jsdom from "mocha-jsdom";
import { expect } from "chai";
import { FacetGroup } from "../facet-group";
import testConfig from "./../../ts/jest.config";

const { testURL } = testConfig;

describe("FacetGroup", () => {
  jsdom({ url: testURL });

  function getFeatureIcon(feature) {
    return `<span id=${feature}></span>`;
  }

  function setup() {
    document.body.innerHTML = `
      <div id="facet-group-container"></div>
    `;
    this.group = new FacetGroup(items, {});
    this.group.render(document.getElementById("facet-group-container"));
  }

  const items = {
    id: "lines-routes",
    name: "Lines and Routes",
    items: [
      {
        id: "subway",
        name: "Subway",
        facets: ["0", "1"],
        prefix: "subway",
        icon: getFeatureIcon("station")
      },
      {
        id: "commuter-rail",
        name: "Commuter Rail",
        facets: ["2"],
        prefix: "commuter-rail",
        icon: getFeatureIcon("commuter_rail")
      },
      {
        id: "bus",
        name: "Bus",
        facets: ["3"],
        prefix: "bus",
        icon: getFeatureIcon("bus")
      },
      {
        id: "ferry",
        name: "Ferry",
        facets: ["4"],
        prefix: "ferry",
        icon: getFeatureIcon("ferry")
      }
    ]
  };

  describe("selectedFacetNames", function() {
    beforeEach(setup);
    it("returns an empty list if no facets are selected", function() {
      expect(this.group.selectedFacetNames()).to.have.members([]);
    });

    it("returns a list of names if any items are checked", function() {
      this.group._item.check();
      expect(this.group.selectedFacetNames()).to.have.a.lengthOf(5);
    });
  });

  describe("reset", function() {
    beforeEach(setup);
    it("resets counts", function() {
      expect(this.group._item.sumChildren()).to.equal(0);
      expect(
        document.getElementById("facet-item-counter-subway").innerHTML
      ).to.equal("");
      this.group.updateCounts({
        "subway:0": 1,
        "subway:1": 2
      });
      expect(this.group._item.sumChildren()).to.equal(3);
      expect(
        document.getElementById("facet-item-counter-subway").innerHTML
      ).to.equal("3");
      this.group.reset();
      expect(this.group._item.sumChildren()).to.equal(0);
      expect(
        document.getElementById("facet-item-counter-subway").innerHTML
      ).to.equal("");
    });
  });
});
