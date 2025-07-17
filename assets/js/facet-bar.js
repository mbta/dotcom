import hogan from "hogan.js";
import { FacetGroup } from "./facet-group";

const facetGroupClasses = { FacetGroup };

export class FacetBar {
  constructor(container, search, facets, parent) {
    this._container = document.getElementById(container);
    this._search = search;
    this._parent = parent;
    this._items = {};
    this._facetPrefixes = [];
    if (this._container) {
      this._container.innerHTML = "";
      this._parseFacets(facets);
    }
  }

  updateCounts(facetResults) {
    Object.keys(this._items).forEach(queryId => {
      this._items[queryId].updateCounts(facetResults);
    });
  }

  _parseFacets(facets) {
    Object.keys(facets).forEach(queryId => {
      const facetData = facets[queryId].item;
      if (!facetData.prefix) {
        facetData.prefix = facets[queryId].facetName;
      }
      const groupClass = facetGroupClasses[facetData.cls || "FacetGroup"];
      this._items[queryId] = new groupClass(facetData, this);
      this._items[queryId].render(this._container, "c-facets__search-facet");
    });
  }

  reset() {
    const items = this._items;

    for (let item in items) {
      items[item].reset();
    }
    this._resetQueries();
  }

  _resetQueries() {
    this._search.updateActiveQueries([]);
    for (const item in this._items) {
      this._items[item].modifySearch(this._search, item);
    }
  }

  update() {
    this.updateState();
    this._search.search();
  }

  updateState() {
    this._resetQueries();
    this._parent.updateState();
  }

  selectedFacetNames() {
    return Object.keys(this._items).reduce(
      (acc, key) => this._selectedFacetsReducer(key, acc),
      []
    );
  }

  _selectedFacetsReducer(key, acc) {
    this._items[key].selectedFacetNames().forEach(name => acc.push(name));
    return acc;
  }

  loadState(facets) {
    facets.forEach(id => {
      Object.values(this._items).forEach(item => item.loadFacet(id));
    });
  }
}
