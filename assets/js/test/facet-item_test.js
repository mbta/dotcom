import jsdom from "mocha-jsdom";
import { expect } from "chai";
import { FacetItem } from "../facet-item";
import testConfig from "./../../ts/jest.config";

const { testURL } = testConfig;

describe("FacetItem", () => {
  jsdom({ url: testURL });

  function getFeatureIcon(feature) {
    return `<span id=${feature}></span>`;
  }

  describe("FacetItem with children", function() {
    const data = {
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
    };

    beforeEach(function() {
      document.body.innerHTML = `
        <div id="facet-item-with-kids-container"></div>
      `;
      this.item = new FacetItem(data, { addToMap: () => {} });
      this.item.render(
        document.getElementById("facet-item-with-kids-container")
      );
    });

    describe("selectedFacetNames", () => {
      it("returns an empty list when itself is not selected", function() {
        expect(this.item.selectedFacetNames([])).to.have.members([]);
      });

      it("returns a list with its name and all child names if itself is selected", function() {
        this.item.check();
        const names = this.item.selectedFacetNames([]);
        expect(names).to.have.a.lengthOf(5);
        expect(names[0]).to.equal("lines-routes");
        expect(names[1]).to.equal("subway");
        expect(names[2]).to.equal("commuter-rail");
        expect(names[3]).to.equal("bus");
        expect(names[4]).to.equal("ferry");
      });

      it("returns a list with only selected child items", function() {
        this.item.check();
        this.item.uncheckUI();
        this.item._children[0].uncheck();
        const names = this.item.selectedFacetNames([]);
        expect(names).to.have.a.lengthOf(3);
        expect(names[0]).to.equal("commuter-rail");
        expect(names[1]).to.equal("bus");
        expect(names[2]).to.equal("ferry");
      });
    });
  });

  describe("FacetItem without children", () => {
    const data = {
      id: "events",
      name: "Events",
      items: []
    };
    beforeEach(function() {
      document.body.innerHTML = `
        <div id="facet-item-no-kids-container"></div>
      `;
      this.item = new FacetItem(data, {});
      this.item.render(document.getElementById("facet-item-no-kids-container"));
    });

    describe("selectedFacetNames", function() {
      it("returns an empty list when itself is not selected", function() {
        expect(this.item.selectedFacetNames([])).to.have.members([]);
      });

      it("returns its own name when itself is selected", function() {
        this.item.check();
        expect(this.item.selectedFacetNames([])).to.have.members(["events"]);
      });
    });
  });
});
